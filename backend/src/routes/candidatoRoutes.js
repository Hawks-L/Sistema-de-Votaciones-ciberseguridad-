import { Router } from "express";
import { listCandidatosByPrograma } from "../controllers/candidatoController.js";

const router = Router();

router.get("/programa/:programaId", listCandidatosByPrograma);

export default router;
