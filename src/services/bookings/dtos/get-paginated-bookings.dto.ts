import { SortDirection } from "@/services/types";
import { BookingStatus } from "@/types/booking.enums";

export class GetPaginatedBookingsInputDto {
    page?: number;
    limit?: number;
    sortDir?: SortDirection;
    customerName?: string;
    eventDate?: string;
    expectedPickUpDate?: string;
    expectedReturnDate?: string;
    status?: BookingStatus;
}
