import { supabase } from "../config/supabase.js";

export const findAllSedes = async () => {
  const { data, error } = await supabase
    .from("sedes")
    .select("*")
    .order("nombre", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};