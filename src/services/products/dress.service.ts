import { axiosClient } from "@/lib/axios.client";
import { Service } from "@/services/interface";
import { CreateDressInputDTO, DressType } from "@/types/products/dress.types";

export class DressService implements Service<DressType> {
  async create(data: CreateDressInputDTO): Promise<DressType> {
    const response = await axiosClient.post<DressType>(
      "/products/dresses",
      data,
    );

    if (response.status === 500) throw new Error("Internal server error");

    return response.data;
  }

  async getById(id: string) {
    const response = await axiosClient.get<DressType>(
      `/products/dresses/${id}`,
    );

    if (response.status === 500) throw new Error("Internal server error");

    return response.data;
  }

  async getAll() {
    const response = await axiosClient.get<DressType[]>("/products/dresses");

    if (response.status === 500) throw new Error("Internal server error");

    return response.data;
  }

  async deleteById(id: string) {
    const response = await axiosClient.delete<null>(`/products/dresses/${id}`);

    if (response.status === 500) throw new Error("Internal server error");

    return;
  }

  async updateById(id: string, data: Partial<DressType>) {
    const response = await axiosClient.put<DressType>(
      `/products/dresses/${id}`,
      data,
    );

    if (response.status === 500) throw new Error("Internal server error");

    return response.data;
  }
}
