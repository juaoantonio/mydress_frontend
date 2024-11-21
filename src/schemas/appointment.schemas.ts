import { z } from "zod";
import { isBefore, isPast } from "date-fns";

export const scheduleInitialVisitSchema = z
    .object({
        appointmentDate: z
            .string({
                required_error: "A data do agendamento é obrigatória.",
            })
            .datetime("A data do agendamento é inválida.")
            .refine((date) => !isPast(new Date(date)), {
                message: "A data do agendamento não pode ser no passado.",
            }),
        eventDate: z
            .string({
                required_error: "A data do evento é obrigatória.",
            })
            .datetime("A data do evento é inválida.")
            .refine((date) => !isPast(new Date(date)), {
                message: "A data do evento não pode ser no passado.",
            }),
        customerName: z.string().min(1, "O nome da cliente é obrigatório."),
    })
    .refine(
        (data) =>
            isBefore(new Date(data.appointmentDate), new Date(data.eventDate)),
        {
            message:
                "A data do agendamento não pode ser depois da data do evento.",
            path: ["appointmentDate"],
        },
    );

export const scheduleAdjustmentReturnVisitSchema = z.object({
    appointmentDate: z
        .string({
            required_error: "A data do agendamento é obrigatória.",
        })
        .datetime("A data do agendamento é inválida."),

    bookingId: z
        .string({
            required_error: "O id da reserva é obrigatório.",
        })
        .uuid("O id da reserva é inválido."),
});
