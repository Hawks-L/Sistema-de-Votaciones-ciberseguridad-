import { registerVote } from "../services/votoService.js";

export const createVote = async (req, res) => {
  try {
    const voto = await registerVote(req.body);
    return res.status(201).json({
      message: "Voto registrado correctamente",
      data: voto,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};