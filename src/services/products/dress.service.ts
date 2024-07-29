import { axiosClient } from "@/lib/axios.client";

async function getDresses() {
  const response = await axiosClient.get("/dresses");

  if (response.status === 500) throw new Error("Erro interno no servidor");

  return response.data;
}
