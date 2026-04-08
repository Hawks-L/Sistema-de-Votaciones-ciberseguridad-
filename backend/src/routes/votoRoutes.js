import { Router } from "express";
import { createVote } from "../controllers/votoController.js";

const router = Router();

router.post("/", createVote);

export default router;