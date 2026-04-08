import axiosClient from "./axiosClient";

export const getProgramasByFacultadRequest = async (facultadId) => {
  const response = await axiosClient.get(`/programas/facultad/${facultadId}`);
  return response.data;
};
