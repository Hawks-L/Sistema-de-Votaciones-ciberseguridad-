import { Router } from "express";
import { listFacultadesBySede } from "../controllers/facultadController.js";

const router = Router();

router.get("/sede/:sedeId", listFacultadesBySede);

export default router;