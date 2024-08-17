import { Service } from "@/services/interface";
import { PurseType } from "@/types/products/purse.types";
import { axiosClient } from "@/lib/axios.client";
import { CreatePurseInputDTO } from "@/services/products/purse.dto";

export class PurseService implements Service<PurseType> {
    async create(data: CreatePurseInputDTO): Promise<PurseType> {
        const formData = new FormData();
        formData.append("img", data.img);
        formData.append("price", data.price.toString());
        formData.append("description", data.description);
        formData.append("rentable", data.rentable.toString());
        formData.append("purchasable", data.purchasable.toString());
        formData.append("color", data.color);
        formData.append("model", data.model);
        formData.append("status", data.status);

        const response = await axiosClient.post<PurseType>(
            "/products/purses",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
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
