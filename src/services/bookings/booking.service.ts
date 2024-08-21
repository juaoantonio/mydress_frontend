import { Service } from "@/services/interface";
import { BookingType } from "@/types/booking.types";
import { CreateBookingInputDto } from "@/services/bookings/booking.dto";
import { axiosClient } from "@/lib/axios.client";

export class BookingService implements Service<BookingType> {
    async create(data: CreateBookingInputDto): Promise<BookingType> {
        const response = await axiosClient.post<BookingType>("/bookings", data);

        return response.data;
    }

    async getAll(): Promise<BookingType[]> {
        const response = await axiosClient.get<BookingType[]>("/bookings");

        return response.data;
    }

    async getById(id: string): Promise<BookingType> {
        const response = await axiosClient.get<BookingType>(`/bookings/${id}`);

        return response.data;
    }

    async deleteById(id: string): Promise<void> {
        await axiosClient.delete<null>(`/bookings/${id}`);
    }

    async updateById(
        id: string,
        data: Partial<CreateBookingInputDto>,
    ): Promise<BookingType> {
        const response = await axiosClient.put<BookingType>(
            `/bookings/${id}`,
            data,
        );

        return response.data;
    }

    async updatePaymentById({
        id,
        amount_paid,
    }: {
        id: string;
        amount_paid: number;
    }): Promise<BookingType> {
        const response = await axiosClient.patch<BookingType>(
            `/bookings/${id}/update_amount_paid`,
            { amount_paid },
        );

        return response.data;
    }

    async cancelBookingById(id: string): Promise<BookingType> {
        const response = await axiosClient.patch<BookingType>(
            `/bookings/${id}/cancel`,
        );

        return response.data;
    }
}
