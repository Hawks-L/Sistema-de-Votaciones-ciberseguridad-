import axiosClient from "./axiosClient";

export const getFacultadesBySedeRequest = async (sedeId) => {
  const response = await axiosClient.get(`/facultades/sede/${sedeId}`);
  return response.data;
};