import { Router } from "express";
import { listCandidatosByPrograma } from "../controllers/candidatoController.js";
import { validate } from "../middlewares/validate.js";
import { programaParams } from "../schemas/paramsSchema.js";

const router = Router();

router.get("/programa/:programaId", validate({ params: programaParams }), listCandidatosByPrograma);

export default router;
