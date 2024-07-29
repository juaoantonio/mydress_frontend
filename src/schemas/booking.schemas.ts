import { z } from "zod";

export const createBookingSchema = z
  .object({
    status: z
      .enum(["CONFIRMED", "CANCELED", "IN_PROGRESS", "OVERDUE", "CONCLUDED"])
      .default("CONFIRMED"),

    range_date: z.object({
      start_date: z.date(),
      end_date: z.date(),
    }),

    dresses: z.array(z.string()),

    purses: z.array(z.string()),

    jewelry: z.array(z.string()),

    event: z.string(),
    customer: z.string(),
    notes: z.string().optional(),
  })
  .refine((data) => data.range_date.start_date < data.range_date.end_date, {
    message: "A data de início deve ser anterior à data de fim",
  })
  .refine((data) => data.dresses && data.purses && data.jewelry, {
    message: "É necessário selecionar pelo menos um item de cada categoria",
  });
