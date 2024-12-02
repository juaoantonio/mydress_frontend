import { BookingStatus } from "@/types/booking.enums";
import { AdjustmentType } from "@/types/adjustment.types";

export type BookingType = {
    id: string;
    expectedPickUpDate: string;
    expectedReturnDate: string;
    pickUpDate: string;
    returnDate: string;
    amountPaid: number;
    totalBookingPrice: number;
    customerName: string;
    eventName: string;
    status: BookingStatus;
    dresses: BookingDressItemType[];
    clutches: BookingClutchItemType[];
};

export class BookingDressItemType {
    id: string;
    productId: string;
    rentPrice: number;
    imagePath: string;
    color: string;
    model: string;
    fabric: string;
    adjustments: AdjustmentType[];
    isCourtesy: boolean;
}

export class BookingClutchItemType {
    id: string;
    productId: string;
    rentPrice: number;
    imagePath: string;
    color: string;
    model: string;
    isCourtesy: boolean;
}

export type SelectMultipleInputOption = {
    id: string;
    img: string;
    description?: string;
};
