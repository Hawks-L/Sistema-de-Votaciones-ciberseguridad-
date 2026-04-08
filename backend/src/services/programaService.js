import { findProgramasByFacultadId } from "../repositories/programaRepository.js";

export const getProgramasPorFacultad = async (facultadId) => {
  if (!facultadId) {
    throw new Error("El id de la facultad es obligatorio");
  }

  return await findProgramasByFacultadId(facultadId);
};
