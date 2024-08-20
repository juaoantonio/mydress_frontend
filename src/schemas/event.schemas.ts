import { z } from "zod";

export const createEventSchema = z.object({
    event_reception: z
        .string()
        .min(1, {
            message: "Recepção do evento é obrigatória",
        })
        .default("Recepção não informada"),

    event_address: z
        .string()
        .min(1, {
            message: "Endereço do evento é obrigatório",
        })
        .default("Endereço não informado"),

    event_datetime: z.date({
        message: "Data do evento é obrigatória",
    }),
});
