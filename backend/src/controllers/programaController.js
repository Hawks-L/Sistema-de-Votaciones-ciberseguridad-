import { getProgramasPorFacultad } from "../services/programaService.js";

export const listProgramasByFacultad = async (req, res) => {
  const programas = await getProgramasPorFacultad(req.validated.params.facultadId);
  return res.status(200).json(programas);
};
