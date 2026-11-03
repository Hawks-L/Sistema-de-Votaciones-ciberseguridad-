import { getSedes } from "../services/sedeService.js";

export const listSedes = async (req, res) => {
  const sedes = await getSedes();
  return res.status(200).json(sedes);
};
