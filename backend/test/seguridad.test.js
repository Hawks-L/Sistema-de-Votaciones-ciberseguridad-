import { test } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

// Valores ficticios: estas pruebas no llegan a la base de datos.
process.env.SUPABASE_URL ??= "http://localhost:54321";
process.env.SUPABASE_SERVICE_ROLE_KEY ??= "clave-de-prueba";
process.env.VOTE_RATE_LIMIT = "6";

const { default: app } = await import("../src/app.js");

const votoValido = {
  votante_identificacion: "1001234567",
  sede_id: 1,
  facultad_id: 1,
  programa_id: 1,
  candidato_id: 1,
};

test("envía cabeceras de seguridad y oculta X-Powered-By", async () => {
  const res = await request(app).get("/");
  assert.equal(res.status, 200);
  assert.equal(res.headers["x-content-type-options"], "nosniff");
  assert.ok(res.headers["content-security-policy"]);
  assert.equal(res.headers["x-powered-by"], undefined);
});

test("CORS solo autoriza al frontend configurado", async () => {
  const permitido = await request(app).get("/").set("Origin", "http://localhost:5173");
  assert.equal(permitido.headers["access-control-allow-origin"], "http://localhost:5173");

  const externo = await request(app).get("/").set("Origin", "https://sitio-malicioso.com");
  assert.equal(externo.headers["access-control-allow-origin"], undefined);
});

test("rechaza ids que no son números enteros positivos", async () => {
  for (const id of ["abc", "-1", "0", "1 OR 1=1"]) {
    const res = await request(app).get(`/api/candidatos/programa/${encodeURIComponent(id)}`);
    assert.equal(res.status, 400, `id "${id}" debió ser rechazado`);
  }
});

test("rechaza votos con datos inválidos o campos extra", async () => {
  const casos = [
    {},
    { ...votoValido, votante_identificacion: "abc123" },
    { ...votoValido, votante_identificacion: "123" },
    { ...votoValido, candidato_id: "uno" },
    { ...votoValido, es_admin: true },
  ];

  for (const body of casos) {
    const res = await request(app).post("/api/votos").send(body);
    assert.equal(res.status, 400, `debió rechazar ${JSON.stringify(body)}`);
    assert.equal(res.body.message, "Datos inválidos");
  }
});

test("responde 400 con JSON mal formado sin filtrar detalles internos", async () => {
  const res = await request(app)
    .post("/api/votos")
    .set("Content-Type", "application/json")
    .send('{"votante_identificacion": ');
  assert.equal(res.status, 400);
  assert.doesNotMatch(JSON.stringify(res.body), /SyntaxError|at /);
});

test("limita los intentos de voto por IP", async () => {
  // El límite de prueba es 6 intentos; las pruebas anteriores ya consumieron parte.
  const estados = [];
  for (let i = 0; i < 7; i++) {
    const res = await request(app).post("/api/votos").send({});
    estados.push(res.status);
  }
  assert.ok(estados.includes(429), `nunca se aplicó el límite: ${estados}`);
});

test("rutas desconocidas devuelven 404", async () => {
  const res = await request(app).get("/api/no-existe");
  assert.equal(res.status, 404);
});
