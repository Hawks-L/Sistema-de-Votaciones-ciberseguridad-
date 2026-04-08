import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sedeRoutes from "./routes/sedeRoutes.js";
import facultadRoutes from "./routes/facultadRoutes.js";
import programaRoutes from "./routes/programaRoutes.js";
import candidatoRoutes from "./routes/candidatoRoutes.js";
import votoRoutes from "./routes/votoRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend del sistema de votación activo" });
});

app.use("/api/sedes", sedeRoutes);
app.use("/api/facultades", facultadRoutes);
app.use("/api/programas", programaRoutes);
app.use("/api/candidatos", candidatoRoutes);
app.use("/api/votos", votoRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
