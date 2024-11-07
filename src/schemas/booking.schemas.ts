import { z } from "zod";

export const bookingItemsSchema = z
    .object({
        range_date: z.object({
            start_date: z.date().nullable().optional(),
            end_date: z.date().nullable().optional(),
        }),
        dressIds: z
            .string({
                required_error: "Selecione o(s) vestido(s)",
            })
            .array(),
        clutchIds: z
            .string({
                required_error: "Selecione a(s) bolsa(s)",
            })
            .array(),
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
    );

export const createBookingSchema = z
    .object({
        customer: z.string().min(1, "Informe o nome do cliente"),

        eventDate: z.date({
            message: "Data do evento é obrigatória",
        }),

        expectedPickUpDate: z.date({
            message: "A data de retirada é obrigatória",
        }),
        expectedReturnDate: z.date({
            message: "A data de devolução é obrigatória",
        }),
    })

    .refine((data) => data.expectedPickUpDate >= data.eventDate, {
        message:
            "A data de retirada deve ser igual ou posterior à data do evento",
        path: ["expectedPickUpDate"],
    })
    .refine((data) => data.expectedReturnDate >= data.expectedPickUpDate, {
        message:
            "A data de devolução deve ser igual ou posterior à data de retirada",
        path: ["expectedReturnDate"],
    });

export type BookingFormType = z.infer<typeof createBookingSchema>;

export type BookingItemsType = z.infer<typeof bookingItemsSchema>;
