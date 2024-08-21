import { BookingStatus } from "@/types/booking.enums";
import { ProductType } from "@/types/products/product.types";
import { EventType } from "@/types/events/event.types";
import { CustomerType } from "@/types/customer.types";
import { DressType } from "@/types/products/dress.types";
import { AdjustmentType } from "@/types/adjustment.types";

export type BookingType = {
    id: string;
    customer: CustomerType;
    event: EventType;
    status: BookingStatus;
    start_date: string;
    end_date: string;
    dresses: DressType[];
    purses: ProductType[];
    jewels: ProductType[];
    adjustments: AdjustmentType[];
    payment_amount: number;
    amount_paid: number;
    is_paid: boolean;
    notes?: string;
};

export type SelectMultipleInputOption = {
    id: string;
    img: string;
    description: string;
};
