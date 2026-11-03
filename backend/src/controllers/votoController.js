import { registerVote } from "../services/votoService.js";

export const createVote = async (req, res) => {
  const voto = await registerVote(req.validated.body);
  return res.status(201).json({
    message: "Voto registrado correctamente",
    data: voto,
  });
};
