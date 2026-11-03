import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

export const securityHeaders = helmet();

// Solo el frontend configurado puede llamar a la API desde un navegador.
export const corsPolicy = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false);
  },
  methods: ["GET", "POST"],
});

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiadas peticiones, intenta de nuevo más tarde" },
});

// Límite estricto para emitir votos: frena la automatización y la fuerza bruta de identificaciones.
export const voteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.VOTE_RATE_LIMIT) || 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiados intentos de voto, intenta de nuevo más tarde" },
});
