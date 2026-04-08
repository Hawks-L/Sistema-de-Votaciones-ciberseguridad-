import { supabase } from "../config/supabase.js";

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

  if (error) throw new Error(error.message);
  return data;
};