import { Router } from "express";
import { listFacultadesBySede } from "../controllers/facultadController.js";
import { validate } from "../middlewares/validate.js";
import { sedeParams } from "../schemas/paramsSchema.js";

const router = Router();

router.get("/sede/:sedeId", validate({ params: sedeParams }), listFacultadesBySede);

export default router;
