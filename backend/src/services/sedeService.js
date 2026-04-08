import { findAllSedes } from "../repositories/sedeRepository.js";

export const getSedes = async () => {
  return await findAllSedes();
};