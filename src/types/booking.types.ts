import { BookingStatus } from "@/types/booking.enums";
import { ProductType } from "@/types/products/product.types";
import { EventType } from "@/types/events/event.types";
import { CustomerType } from "@/types/customer.types";

export type BookingType = {
    id: string;
    customer: CustomerType;
    event: EventType;
    status: BookingStatus;
    start_date: string;
    end_date: string;
    products: ProductType[];
    notes?: string;
};

export type SelectMultipleInputOption = {
    id: string;
    img: string;
    description: string;
};
