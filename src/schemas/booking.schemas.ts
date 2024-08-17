import { z } from "zod";

export const createBookingSchema = z
    .object({
        status: z
            .enum([
                "CONFIRMED",
                "CANCELED",
                "IN_PROGRESS",
                "OVERDUE",
                "CONCLUDED",
            ])
            .default("CONFIRMED"),

        range_date: z.object({
            start_date: z.date().nullable().optional(),
            end_date: z.date().nullable().optional(),
        }),
        dresses: z.array(z.string(), {
            required_error: "Você deve selecionar um vestido",
        }),

        purses: z.array(z.string(), {
            required_error: "Você deve selecionar uma bolsa",
        }),

        event: z.string().min(1, "Você deve selecionar um evento"),
        customer: z.string().min(1, "Você deve selecionar um cliente"),
        notes: z.string().optional(),
    })
    .refine((data) => data.dresses.length > 0 || data.purses.length > 0, {
        message: "É necessário selecionar pelo menos um item de cada categoria",
        path: ["dresses"],
    })
    .refine(
        (data) => {
            if (data.range_date.start_date && data.range_date.end_date)
                return data.range_date.start_date < data?.range_date.end_date;

            return false;
        },
        {
            message: "A data de início deve ser anterior à data de fim",
            path: ["range_date"],
        },
    )

    .refine(
        (data) => {
            if (data.range_date.start_date && data.range_date.end_date) {
                const now = new Date();
                const currentDate = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                );
                const startDate = new Date(data.range_date.start_date);
                const endDate = new Date(data.range_date.end_date);

                return startDate >= currentDate && endDate >= currentDate;
            }

            return false;
        },
        {
            message:
                "A data de início e fim devem ser posteriores à data atual",
            path: ["range_date"],
        },
    );
