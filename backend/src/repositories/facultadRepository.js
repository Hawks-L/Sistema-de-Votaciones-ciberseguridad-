import { supabase } from "../config/supabase.js";

export const findFacultadesBySedeId = async (sedeId) => {
  const { data, error } = await supabase
    .from("facultades")
    .select("*")
    .eq("sede_id", sedeId)
    .order("nombre", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};