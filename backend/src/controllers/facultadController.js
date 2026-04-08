import { getFacultadesPorSede } from "../services/facultadService.js";

export const listFacultadesBySede = async (req, res) => {
  try {
    const { sedeId } = req.params;
    const facultades = await getFacultadesPorSede(sedeId);
    return res.status(200).json(facultades);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};