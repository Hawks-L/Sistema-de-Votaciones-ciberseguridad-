import { findVoteByIdentificacion, saveVote } from "../repositories/votoRepository.js";
import { findCandidatoById } from "../repositories/candidatoRepository.js";

export const registerVote = async (payload) => {
  const {
    votante_identificacion,
    sede_id,
    facultad_id,
    programa_id,
    candidato_id,
  } = payload;

  if (!votante_identificacion || !sede_id || !facultad_id || !programa_id || !candidato_id) {
    throw new Error("Todos los campos del voto son obligatorios");
  }

  const existingVote = await findVoteByIdentificacion(votante_identificacion);

  if (existingVote) {
    throw new Error("Este votante ya registró un voto");
  }

  const candidato = await findCandidatoById(candidato_id);

  if (!candidato) {
    throw new Error("El candidato no existe");
  }

  if (Number(candidato.facultad_id) !== Number(facultad_id)) {
    throw new Error("El candidato no pertenece a la facultad seleccionada");
  }

  if (Number(candidato.programa_id) !== Number(programa_id)) {
    throw new Error("El candidato no pertenece al programa seleccionado");
  }

  return await saveVote({
    votante_identificacion,
    sede_id,
    facultad_id,
    programa_id,
    candidato_id,
  });
};
