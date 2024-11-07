import { axiosClient } from "@/lib/axios.client";
import { BookingType } from "@/types/booking.types";
import { GetPaginatedBookingsInputDto } from "@/services/bookings/dtos/get-paginated-bookings.dto";
import { GetPaginatedOutputDto } from "@/services/types";
import { CreateBookingInputDto } from "./dtos/create-booking.dto";

export interface IBookingItems {
    dressIds: string[];
    clutchIds: string[];
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

    async initProcess(id: string) {
        await axiosClient.patch(`/bookings/${id}/init`);
    }

    async bookingItems(id: string, data: IBookingItems) {
        await axiosClient.patch(`/bookings/${id}/items`, data);
    }

    async adjustments(id: string, data: IAdjustments) {
        await axiosClient.patch(`/bookings/${id}/adjustments`, data);
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
