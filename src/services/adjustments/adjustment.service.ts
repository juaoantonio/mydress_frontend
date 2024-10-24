import { IGetAllServiceInputProps, Service } from "@/services/interface";
import { AdjustmentType } from "@/types/adjustment.types";
import { axiosClient } from "@/lib/axios.client";
import {
    CreateAdjustmentDto,
    CreateManyAdjustmentsDto,
} from "@/services/adjustments/adjustment.dto";

export class AdjustmentService implements Service<AdjustmentType> {
    async create({
        data,
    }: {
        data: CreateAdjustmentDto;
    }): Promise<AdjustmentType> {
        const response = await axiosClient.post<AdjustmentType>(
            "/adjustments",
            data,
        );

        return response.data;
    }

    async createMany({
        data,
    }: {
        data: CreateManyAdjustmentsDto;
    }): Promise<AdjustmentType[]> {
        const response = await axiosClient.post<AdjustmentType[]>(
            "/adjustments/",
            data,
        );

        return response.data;
    }

    async getById({ id }: { id: string }): Promise<AdjustmentType> {
        throw new Error("Method not implemented.");
    }

    async getAll(options: IGetAllServiceInputProps): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getAllByBookingId({
        bookingId,
    }: {
        bookingId: string;
    }): Promise<AdjustmentType[]> {
        const response = await axiosClient.get<AdjustmentType[]>(
            `/adjustments/?${bookingId}`,
        );

        return response.data;
    }

    async deleteById({ id }: { id: string }) {
        throw new Error("Method not implemented.");
    }

    async updateById({
        id,
        data,
    }: {
        id: string;
        data: Partial<AdjustmentType>;
    }): Promise<AdjustmentType> {
        throw new Error("Method not implemented.");
    }
}
