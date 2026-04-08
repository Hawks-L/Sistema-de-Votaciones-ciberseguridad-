import axiosClient from "./axiosClient";

export const getSedesRequest = async () => {
  const response = await axiosClient.get("/sedes");
  return response.data;
};