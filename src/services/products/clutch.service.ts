import { GetPaginatedOutputDto } from "../types";
import { Service } from "@/services/interface";
import { ClutchType } from "@/types/products/clutch.types";
import { axiosClient } from "@/lib/axios.client";
import {
    CreateClutchInputDTO,
    UpdateClutchInputDto,
} from "@/services/products/clutch.dto";
import { IBaseListProductQueryParamsInputDTO } from "./base.dto";

interface IGetAllClutchesInputDTO {
    filters: IBaseListProductQueryParamsInputDTO;
}

export class ClutchService implements Service<ClutchType> {
    async create({
        data,
    }: {
        data: CreateClutchInputDTO;
    }): Promise<ClutchType> {
        const formData = new FormData();
        formData.append("image", data.image);
        formData.append("rentPrice", data.rentPrice.toString());
        formData.append("color", data.color);
        formData.append("model", data.model);

        const response = await axiosClient.post<ClutchType>(
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

    async getById({ id }: { id: string }): Promise<ClutchType> {
        const response = await axiosClient.get<ClutchType>(`/clutches/${id}`);

        return response.data;
    }

    async getAll(
        params: IGetAllClutchesInputDTO,
    ): Promise<GetPaginatedOutputDto<ClutchType>> {
        const response = await axiosClient.get<
            GetPaginatedOutputDto<ClutchType>
        >("/clutches", {
            params: params.filters,
        });

        if (params.filters.search) {
            response.data.items = response.data.items.filter((clutch) =>
                clutch.name
                    .toLowerCase()
                    .includes(params.filters.search.toLowerCase()),
            );
        }

        return response.data;
    }

    /*
     * This method is used to get all clutches that are available between two dates.
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
        const response = await axiosClient.get<ClutchType[]>(
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
        data: UpdateClutchInputDto;
    }): Promise<ClutchType> {
        const formData = new FormData();
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("rentPrice", data.rentPrice.toString());
        formData.append("color", data.color);
        formData.append("model", data.model);
        const response = await axiosClient.patch<ClutchType>(
            `clutches/${id}`,
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
