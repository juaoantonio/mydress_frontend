import { Service } from "@/services/interface";
import { PurseType } from "@/types/products/purse.types";
import { axiosClient } from "@/lib/axios.client";
import { CreatePurseInputDTO } from "@/services/products/purse.dto";

export class PurseService implements Service<PurseType> {
    async create({ data }: { data: CreatePurseInputDTO }): Promise<PurseType> {
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

    async getById({ id }: { id: string }): Promise<PurseType> {
        const response = await axiosClient.get<PurseType>(
            `/products/purses/${id}`,
        );

        return response.data;
    }

    async getAll(): Promise<PurseType[]> {
        const response = await axiosClient.get<PurseType[]>("/products/purses");

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
            "/products/purses/list_available_between_dates",
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
        await axiosClient.delete<null>(`/products/purses/${id}`);
    }

    async updateById({
        id,
        data,
    }: {
        id: string;
        data: Partial<PurseType>;
    }): Promise<PurseType> {
        const response = await axiosClient.put<PurseType>(
            `/products/purses/${id}`,
            data,
        );

        return response.data;
    }
}
