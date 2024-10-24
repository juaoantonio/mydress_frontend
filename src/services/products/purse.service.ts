import { GetPaginatedOutputDto } from "./../types";
import { Service } from "@/services/interface";
import { PurseType } from "@/types/products/purse.types";
import { axiosClient } from "@/lib/axios.client";
import { CreatePurseInputDTO } from "@/services/products/purse.dto";
import { IBaseListProductQueryParamsInputDTO } from "./base.dto";

interface IGetAllClutchesInputDTO {
    filters: IBaseListProductQueryParamsInputDTO;
}

export class PurseService implements Service<PurseType> {
    async create({ data }: { data: CreatePurseInputDTO }): Promise<PurseType> {
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("rentPrice", data.rentPrice.toString());
        formData.append("color", data.color);
        formData.append("model", data.model);

        const response = await axiosClient.post<PurseType>(
            "/clutches",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        return response.data;
    }

    async getById({ id }: { id: string }): Promise<PurseType> {
        const response = await axiosClient.get<PurseType>(`/clutches/${id}`);

        return response.data;
    }

    async getAll(
        params: IGetAllClutchesInputDTO,
    ): Promise<GetPaginatedOutputDto<PurseType>> {
        const response = await axiosClient.get<
            GetPaginatedOutputDto<PurseType>
        >("/clutches", {
            params: params.filters,
        });

        return response.data;
    }

    /*
     * This method is used to get all purses that are available between two dates.
     * @param {Date} start_date - The start date of the date range.
     * @param {Date} end_date - The end date of the date range.
     */
    async getAllAvailableBetweenDates({
        start_date,
        end_date,
    }: {
        start_date?: Date | null;
        end_date?: Date | null;
    }) {
        const response = await axiosClient.get<PurseType[]>(
            "/products/clutches/list_available_between_dates",
            {
                params: {
                    start_date: start_date ? start_date.toISOString() : "",
                    end_date: end_date ? end_date.toISOString() : "",
                },
            },
        );

        return response.data;
    }

    async deleteById({ id }: { id: string }): Promise<void> {
        await axiosClient.delete<null>(`/clutches/${id}`);
    }

    async updateById({
        id,
        data,
    }: {
        id: string;
        data: Partial<PurseType>;
    }): Promise<PurseType> {
        const response = await axiosClient.put<PurseType>(
            `/products/clutches/${id}`,
            data,
        );

        return response.data;
    }
}
