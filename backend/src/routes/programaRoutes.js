import { Router } from "express";
import { listProgramasByFacultad } from "../controllers/programaController.js";
import { validate } from "../middlewares/validate.js";
import { facultadParams } from "../schemas/paramsSchema.js";

const router = Router();

router.get("/facultad/:facultadId", validate({ params: facultadParams }), listProgramasByFacultad);

export default router;
