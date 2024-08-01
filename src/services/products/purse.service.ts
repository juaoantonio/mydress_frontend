import { Service } from "@/services/interface";
import { CreatePurseInputDTO, PurseType } from "@/types/products/purse.types";
import { axiosClient } from "@/lib/axios.client";

export class PurseService implements Service<PurseType> {
    async create(data: CreatePurseInputDTO): Promise<PurseType> {
        const response = await axiosClient.post<PurseType>(
            "/products/purses",
            data,
        );

        return response.data;
    }

    async getById(id: string): Promise<PurseType> {
        const response = await axiosClient.get<PurseType>(
            `/products/purses/${id}`,
        );

        return response.data;
    }

    async getAll(): Promise<PurseType[]> {
        const response = await axiosClient.get<PurseType[]>("/products/purses");

        return response.data;
    }

    async deleteById(id: string): Promise<void> {
        await axiosClient.delete<null>(`/products/purses/${id}`);
    }

    async updateById(id: string, data: Partial<PurseType>): Promise<PurseType> {
        const response = await axiosClient.put<PurseType>(
            `/products/purses/${id}`,
            data,
        );

        return response.data;
    }
}
