import { supabase } from "../config/supabase.js";

export const findProgramasByFacultadId = async (facultadId) => {
  const { data, error } = await supabase
    .from("programas")
    .select("*")
    .eq("facultad_id", facultadId)
    .order("nombre", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};
