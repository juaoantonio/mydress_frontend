import { z } from "zod";

export const createBookingSchema = z.object({
  status: z
    .enum(["CONFIRMED", "CANCELED", "IN_PROGRESS", "OVERDUE", "CONCLUDED"])
    .default("CONFIRMED"),
  start_date: z.string(),
  end_date: z.string(),
  products: z.array(z.string()),
  event: z.string(),
  customer: z.string(),
  notes: z.string().optional(),
});
