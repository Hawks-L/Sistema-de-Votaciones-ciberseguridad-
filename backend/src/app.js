import express from "express";
import dotenv from "dotenv";

import sedeRoutes from "./routes/sedeRoutes.js";
import facultadRoutes from "./routes/facultadRoutes.js";
import programaRoutes from "./routes/programaRoutes.js";
import candidatoRoutes from "./routes/candidatoRoutes.js";
import votoRoutes from "./routes/votoRoutes.js";
import { corsPolicy, generalLimiter, securityHeaders } from "./middlewares/security.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

if (process.env.TRUST_PROXY) {
  app.set("trust proxy", Number(process.env.TRUST_PROXY));
}

app.use(securityHeaders);
app.use(corsPolicy);
app.use(express.json({ limit: "10kb" }));
app.use("/api", generalLimiter);

app.get("/", (req, res) => {
  res.json({ message: "Backend del sistema de votación activo" });
});

app.use("/api/sedes", sedeRoutes);
app.use("/api/facultades", facultadRoutes);
app.use("/api/programas", programaRoutes);
app.use("/api/candidatos", candidatoRoutes);
app.use("/api/votos", votoRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
