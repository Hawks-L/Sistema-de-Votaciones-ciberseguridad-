import { supabase } from "../config/supabase.js";
import { AppError } from "../utils/AppError.js";

// Código de PostgreSQL para violación de una restricción UNIQUE.
const UNIQUE_VIOLATION = "23505";

export const findVoteByIdentificacion = async (identificacion) => {
  const { data, error } = await supabase
    .from("votaciones")
    .select("id")
    .eq("votante_identificacion", identificacion)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};

export const saveVote = async (payload) => {
  const { data, error } = await supabase
    .from("votaciones")
    .insert([payload])
    .select()
    .single();

  if (error?.code === UNIQUE_VIOLATION) {
    throw new AppError("Este votante ya registró un voto", 409);
  }
  if (error) throw new Error(error.message);
  return data;
};
