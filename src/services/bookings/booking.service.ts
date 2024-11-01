import { axiosClient } from "@/lib/axios.client";
import { BookingType } from "@/types/booking.types";
import { GetPaginatedBookingsInputDto } from "@/services/bookings/dtos/get-paginated-bookings.dto";
import { GetPaginatedOutputDto } from "@/services/types";

export class BookingService {
    async getById(id: string) {
        const response = await axiosClient.get<BookingType>(`/bookings/${id}`);
        return response.data;
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
