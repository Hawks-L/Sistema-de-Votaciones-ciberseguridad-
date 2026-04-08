import { Router } from "express";
import { listProgramasByFacultad } from "../controllers/programaController.js";

const router = Router();

router.get("/facultad/:facultadId", listProgramasByFacultad);

export default router;
