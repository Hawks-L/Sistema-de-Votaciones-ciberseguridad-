import { supabase } from "../config/supabase.js";

export const findCandidatosByProgramaId = async (programaId) => {
  const { data, error } = await supabase
    .from("candidatos")
    .select("*")
    .eq("programa_id", programaId)
    .order("nombre", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

export const findCandidatoById = async (candidatoId) => {
  const { data, error } = await supabase
    .from("candidatos")
    .select("*")
    .eq("id", candidatoId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
};
