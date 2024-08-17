import { Service } from "@/services/interface";
import { AdjustmentType } from "@/types/adjustment.types";
import { axiosClient } from "@/lib/axios.client";
import {
    CreateAdjustmentDto,
    CreateManyAdjustmentsDto,
} from "@/services/adjustments/adjustment.dto";

export class AdjustmentService implements Service<AdjustmentType> {
    async create(data: CreateAdjustmentDto): Promise<AdjustmentType> {
        const response = await axiosClient.post<AdjustmentType>(
            "/adjustments",
            data,
        );

        return response.data;
    }

    async createMany(
        data: CreateManyAdjustmentsDto,
    ): Promise<AdjustmentType[]> {
        const response = await axiosClient.post<AdjustmentType[]>(
            "/adjustments/",
            data,
        );

        return response.data;
    }

    async getById(id: string): Promise<AdjustmentType> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<AdjustmentType[]> {
        throw new Error("Method not implemented.");
    }

    async getAllByBookingId(bookingId: string): Promise<AdjustmentType[]> {
        const response = await axiosClient.get<AdjustmentType[]>(
            `/adjustments/?${bookingId}`,
        );

        return response.data;
    }

    async deleteById(id: string) {
        throw new Error("Method not implemented.");
    }

    async updateById(
        id: string,
        data: Partial<AdjustmentType>,
    ): Promise<AdjustmentType> {
        throw new Error("Method not implemented.");
    }
}
