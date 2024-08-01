import { axiosClient } from "@/lib/axios.client";
import { Service } from "@/services/interface";
import { DressType } from "@/types/products/dress.types";
import { CreateDressInputDTO } from "@/services/products/dress.dto";

export class DressService implements Service<DressType> {
  async create(data: CreateDressInputDTO): Promise<DressType> {
    const response = await axiosClient.post<DressType>(
      "/products/dresses",
      data,
    );

    return response.data;
  }

  async getById(id: string) {
    const response = await axiosClient.get<DressType>(
      `/products/dresses/${id}`,
    );

    return response.data;
  }

  async getAll() {
    const response = await axiosClient.get<DressType[]>("/products/dresses");

    return response.data;
  }

  async deleteById(id: string) {
    const response = await axiosClient.delete<null>(`/products/dresses/${id}`);

    return;
  }

  async updateById(id: string, data: Partial<DressType>) {
    const response = await axiosClient.put<DressType>(
      `/products/dresses/${id}`,
      data,
    );

    return response.data;
  }
}
