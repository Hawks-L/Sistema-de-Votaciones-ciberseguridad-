import { Router } from "express";
import { listSedes } from "../controllers/sedeController.js";

const router = Router();

router.get("/", listSedes);

export default router;