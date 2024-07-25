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

export enum BookingStatus {
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  IN_PROGRESS = "IN_PROGRESS",
  OVERDUE = "OVERDUE",
  CONCLUDED = "CONCLUDED",
}
