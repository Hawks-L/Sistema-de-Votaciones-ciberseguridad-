import { getFacultadesPorSede } from "../services/facultadService.js";

export const listFacultadesBySede = async (req, res) => {
  const facultades = await getFacultadesPorSede(req.validated.params.sedeId);
  return res.status(200).json(facultades);
};
