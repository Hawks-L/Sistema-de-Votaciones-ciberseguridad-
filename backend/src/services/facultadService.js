import { findFacultadesBySedeId } from "../repositories/facultadRepository.js";

export const getFacultadesPorSede = async (sedeId) => {
  if (!sedeId) {
    throw new Error("El id de la sede es obligatorio");
  }

  return await findFacultadesBySedeId(sedeId);
};