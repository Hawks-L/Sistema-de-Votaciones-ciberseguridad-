import { findVoteByIdentificacion, saveVote } from "../repositories/votoRepository.js";
import { findCandidatoById } from "../repositories/candidatoRepository.js";
import { AppError } from "../utils/AppError.js";

// El payload llega validado y con los ids ya convertidos a número (ver schemas/votoSchema.js).
export const registerVote = async (payload) => {
  const {
    votante_identificacion,
    sede_id,
    facultad_id,
    programa_id,
    candidato_id,
  } = payload;

  // Verificación temprana para dar un mensaje claro; la garantía real contra el doble voto
  // es la restricción UNIQUE de la base de datos (db/migrations/001_voto_unico.sql).
  const existingVote = await findVoteByIdentificacion(votante_identificacion);

  if (existingVote) {
    throw new AppError("Este votante ya registró un voto", 409);
  }

  const candidato = await findCandidatoById(candidato_id);

  if (!candidato) {
    throw new AppError("El candidato no existe", 404);
  }

  if (Number(candidato.facultad_id) !== facultad_id) {
    throw new AppError("El candidato no pertenece a la facultad seleccionada");
  }

  if (Number(candidato.programa_id) !== programa_id) {
    throw new AppError("El candidato no pertenece al programa seleccionado");
  }

  return await saveVote({
    votante_identificacion,
    sede_id,
    facultad_id,
    programa_id,
    candidato_id,
  });
};
