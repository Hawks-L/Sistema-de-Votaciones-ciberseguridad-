import { getCandidatosPorPrograma } from "../services/candidatoService.js";

export const listCandidatosByPrograma = async (req, res) => {
  try {
    const { programaId } = req.params;
    const candidatos = await getCandidatosPorPrograma(programaId);
    return res.status(200).json(candidatos);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
