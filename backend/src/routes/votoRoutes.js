import { Router } from "express";
import { createVote } from "../controllers/votoController.js";
import { validate } from "../middlewares/validate.js";
import { voteLimiter } from "../middlewares/security.js";
import { votoSchema } from "../schemas/votoSchema.js";

const router = Router();

router.post("/", voteLimiter, validate({ body: votoSchema }), createVote);

export default router;
