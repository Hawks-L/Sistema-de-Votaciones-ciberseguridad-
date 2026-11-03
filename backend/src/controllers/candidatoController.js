import { getCandidatosPorPrograma } from "../services/candidatoService.js";

export const listCandidatosByPrograma = async (req, res) => {
  const candidatos = await getCandidatosPorPrograma(req.validated.params.programaId);
  return res.status(200).json(candidatos);
};
