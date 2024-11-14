import { z } from "zod";

export const bookingItemsSchema = z.object({
    dresses: z
        .object({
            dressId: z.string().uuid(),
        })
        .array()
        .min(1, "Selecione ao menos um vestido"),

    clutches: z
        .object({
            clutchId: z.string().uuid(),
            isCourtesy: z.boolean(),
        })
        .array(),
});

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

    .refine((data) => data.expectedPickUpDate <= data.eventDate, {
        message: "A data de retirada deve antes ou igual à data do evento",
        path: ["expectedPickUpDate"],
    })
    .refine((data) => data.expectedReturnDate >= data.expectedPickUpDate, {
        message:
            "A data de devolução deve ser igual ou posterior à data de retirada",
        path: ["expectedReturnDate"],
    });

export type BookingFormType = z.infer<typeof createBookingSchema>;

export type BookingItemsType = z.infer<typeof bookingItemsSchema>;
