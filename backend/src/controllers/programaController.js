import { getProgramasPorFacultad } from "../services/programaService.js";

export const listProgramasByFacultad = async (req, res) => {
  try {
    const { facultadId } = req.params;
    const programas = await getProgramasPorFacultad(facultadId);
    return res.status(200).json(programas);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
