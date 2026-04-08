import axiosClient from "./axiosClient";

export const getCandidatosByProgramaRequest = async (programaId) => {
  const response = await axiosClient.get(`/candidatos/programa/${programaId}`);
  return response.data;
};
