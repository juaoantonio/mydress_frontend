import { axiosClient } from "@/lib/axios.client";
import { Service } from "@/services/interface";
import { CommonOutputDto } from "@/services/types";
import { CreateDressInputDTO, DressType } from "@/types/products/dress.types";

export class DressService implements Service<DressType> {
  async create(data: CreateDressInputDTO): Promise<CommonOutputDto<DressType>> {
    const response = await axiosClient.post<DressType>("/dresses", data);

    if (response.status === 500) {
      return {
        data: null,
        errors: { code: 500, content: "Internal server error" },
      };
    }

    return { data: response.data, errors: null };
  }

  async getById(id: string) {
    const response = await axiosClient.get<DressType>(`/dresses/${id}`);

    if (response.status === 500) {
      return {
        data: null,
        errors: { code: 500, content: "Internal server error" },
      };
    }

    return { data: response.data, errors: null };
  }

  async getAll() {
    const response = await axiosClient.get<DressType[]>("/dresses");

    if (response.status === 500) {
      return {
        data: null,
        errors: { code: 500, content: "Internal server error" },
      };
    }

    return { data: response.data, errors: null };
  }

  async deleteById(id: string) {
    const response = await axiosClient.delete<null>(`/dresses/${id}`);

    if (response.status === 500) {
      return {
        data: null,
        errors: { code: 500, content: "Internal server error" },
      };
    }

    return { data: null, errors: null };
  }

  async updateById(id: string, data: Partial<DressType>) {
    const response = await axiosClient.put<DressType>(`/dresses/${id}`, data);

    if (response.status === 500) {
      return {
        data: null,
        errors: { code: 500, content: "Internal server error" },
      };
    }

    return { data: response.data, errors: null };
  }
}
