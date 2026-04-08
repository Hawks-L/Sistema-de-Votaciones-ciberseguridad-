import { getSedes } from "../services/sedeService.js";

export const listSedes = async (req, res) => {
  try {
    const sedes = await getSedes();
    return res.status(200).json(sedes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};