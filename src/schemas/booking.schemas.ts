import { z } from "zod";

export const createBookingSchema = z
  .object({
    status: z
      .enum(["CONFIRMED", "CANCELED", "IN_PROGRESS", "OVERDUE", "CONCLUDED"])
      .default("CONFIRMED"),

    range_date: z.object({
      start_date: z.date().nullable().optional(),
      end_date: z.date().nullable().optional(),
    }),
    dresses: z.array(z.string()),

    purses: z.array(z.string()),

    event: z.string(),
    customer: z.string(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.range_date.start_date && data.range_date.end_date)
        return data.range_date.start_date < data?.range_date.end_date;

      return false;
    },
    {
      message: "A data de início deve ser anterior à data de fim",
    },
  )
  .refine((data) => data.dresses && data.purses, {
    message: "É necessário selecionar pelo menos um item de cada categoria",
  });
