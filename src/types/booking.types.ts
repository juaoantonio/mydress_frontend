import { BookingStatus } from "@/types/booking.enums";
import { AdjustmentType } from "@/types/adjustment.types";

export type BookingType = {
    id: string;
    expectedPickupDate: string;
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
    adjustments: AdjustmentType[];
    isCourtesy: boolean;
}

export class BookingClutchItemType {
    id: string;
    productId: string;
    rentPrice: number;
    isCourtesy: boolean;
}

export type SelectMultipleInputOption = {
    id: string;
    img: string;
    description?: string;
};
