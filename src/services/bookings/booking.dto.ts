import { BookingStatus } from "@/types/booking.enums";

export type CreateBookingInputDto = {
    customer: string;
    event: string;
    status?: BookingStatus;
    start_date: string;
    end_date: string;
    dresses: string[];
    purses: string[];
    jewels: string[];
    notes?: string;
};
