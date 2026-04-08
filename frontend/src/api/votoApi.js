import axiosClient from "./axiosClient";

export const createVoteRequest = async (payload) => {
  const response = await axiosClient.post("/votos", payload);
  return response.data;
};