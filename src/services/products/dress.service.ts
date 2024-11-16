import { GetPaginatedOutputDto } from "./../types";
import { axiosClient } from "@/lib/axios.client";
import { DressType } from "@/types/products/dress.types";
import {
    CreateDressInputDTO,
    UpdateDressInputDto,
} from "@/services/products/dress.dto";
import { IBaseListProductQueryParamsInputDTO } from "./base.dto";
import { Service } from "../interface";

interface IGetAllDressesInputDTO {
    filters: IBaseListProductQueryParamsInputDTO;
}

export class DressService implements Service<DressType> {
    async create({ data }: { data: CreateDressInputDTO }): Promise<DressType> {
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("rentPrice", data.rentPrice.toString());
        formData.append("color", data.color);
        formData.append("model", data.model);
        formData.append("fabric", data.fabric);

        const response = await axiosClient.post<DressType>(
            "/dresses",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        return response.data;
    }

    async getById({ id }: { id: string }) {
        const response = await axiosClient.get<DressType>(`/dresses/${id}`);

        return response.data;
    }

    async getAll(
        params: IGetAllDressesInputDTO,
    ): Promise<GetPaginatedOutputDto<DressType>> {
        const response = await axiosClient.get<
            GetPaginatedOutputDto<DressType>
        >("/dresses", {
            params: params.filters,
        });

        return response.data;
    }

    async deleteById({ id }: { id: string }) {
        await axiosClient.delete<null>(`/dresses/${id}`);
    }

    async updateById({ id, data }: { id: string; data: UpdateDressInputDto }) {
        const formData = new FormData();
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("rentPrice", data.rentPrice.toString());
        formData.append("color", data.color);
        formData.append("model", data.model);
        formData.append("fabric", data.fabric);
        const response = await axiosClient.patch<DressType>(
            `/dresses/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        return response.data;
    }
}
