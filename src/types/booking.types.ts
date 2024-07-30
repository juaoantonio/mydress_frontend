import { BookingStatus } from "@/types/booking.enums";

export type BookingType = {
  id: string;
  customer: string;
  event: string;
  status: BookingStatus;
  start_date: string;
  end_date: string;
  products: string[];
  notes?: string;
};

export type SelectMultipleInputOption = {
  id: string;
  image: string;
  description: string;
};