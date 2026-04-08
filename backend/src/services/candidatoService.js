import { findCandidatosByProgramaId } from "../repositories/candidatoRepository.js";

export const getCandidatosPorPrograma = async (programaId) => {
  if (!programaId) {
    throw new Error("El id del programa es obligatorio");
  }

  return await findCandidatosByProgramaId(programaId);
};
