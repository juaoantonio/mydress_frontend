import { AdjustmentType } from "@/types/adjustment.types";

export class AddBookingAdjustmentsInputDto {
    bookingId: string;
    adjustments: AdjustmentType &
        {
            dressId: string;
        }[];
}
