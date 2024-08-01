import { BookingType } from "@/types/booking.types";
import { BookingStatus } from "@/types/booking.enums";

export type CreateBookingInputDto = Omit<
    BookingType,
    "id" | "created_at" | "updated_at" | "status"
> & {
    status?: BookingStatus;
};
