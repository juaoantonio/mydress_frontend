import { axiosClient } from "@/lib/axios.client";
import { Service } from "@/services/interface";
import { DressType } from "@/types/products/dress.types";
import { CreateDressInputDTO } from "@/services/products/dress.dto";
import { IResourceList } from "@/types/list";

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

    async getAll(): Promise<IResourceList<DressType>> {
        const response =
            await axiosClient.get<IResourceList<DressType>>("/dresses");

        return response.data;
    }

    /*
     * This method is used to get all dresses that are available between two dates.
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
        const response = await axiosClient.get<DressType[]>(
            "/products/dresses/list_available_between_dates",
            {
                params: {
                    start_date: start_date ? start_date.toISOString() : "",
                    end_date: end_date ? end_date.toISOString() : "",
                },
            },
        );

        return response.data;
    }

    async deleteById({ id }: { id: string }) {
        const response = await axiosClient.delete<null>(
            `/products/dresses/${id}`,
        );

        return;
    }

    async updateById({ id, data }: { id: string; data: Partial<DressType> }) {
        const response = await axiosClient.put<DressType>(
            `/products/dresses/${id}`,
            data,
        );

        return response.data;
    }
}
