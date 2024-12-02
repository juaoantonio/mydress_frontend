import { axiosClient } from "@/lib/axios.client";
import { BookingType } from "@/types/booking.types";
import { GetPaginatedBookingsInputDto } from "@/services/bookings/dtos/get-paginated-bookings.dto";
import { GetPaginatedOutputDto } from "@/services/types";
import { CreateBookingInputDto } from "./dtos/create-booking.dto";

export interface IBookingItems {
    dresses: Array<{
        dressId: string;
    }>;
    clutches: Array<{
        clutchId: string;
        isCourtesy: boolean;
    }>;
}

export interface IAdjustments {
    adjustments: Array<{
        label: string;
        description: string;
        dressId: string;
    }>;
}
export class BookingService {
    async getById(id: string) {
        const response = await axiosClient.get<BookingType>(`/bookings/${id}`);
        return response.data;
    }

    async create(dto: CreateBookingInputDto) {
        const response = await axiosClient.post<{
            bookingId: string;
        }>(`/bookings`, dto);
        return response.data;
    }

    async processInit(id: string) {
        return axiosClient.patch(`/bookings/${id}/init`);
    }

    async informItemsDelivery(id: string) {
        return axiosClient.patch(`/bookings/${id}/start`);
    }

    async complete(id: string) {
        return axiosClient.patch(`/bookings/${id}/complete`);
    }

    async bookingItems(id: string, data: IBookingItems) {
        return axiosClient.patch(`/bookings/${id}/items`, data);
    }

    async payment(id: string, value: number) {
        return axiosClient.patch(`/bookings/${id}/payment`, {
            amount: value,
        });
    }

    async adjustments(id: string, data: IAdjustments) {
        await axiosClient.patch(`/bookings/${id}/adjustments`, data);
    }

    async cancel(id: string) {
        await axiosClient.delete(`/bookings/${id}`);
    }

    async getPaginated(
        params: GetPaginatedBookingsInputDto,
    ): Promise<GetPaginatedOutputDto<BookingType>> {
        const response = await axiosClient.get<
            GetPaginatedOutputDto<BookingType>
        >("/bookings", {
            params,
        });

        return response.data;
    }
}
