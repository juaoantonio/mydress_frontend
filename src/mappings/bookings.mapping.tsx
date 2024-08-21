import { BookingStatus } from "@/types/booking.enums";
import { ReactElement } from "react";

export const BookingStatusMapping: {
    [key in BookingStatus]: ReactElement | string;
} = {
    [BookingStatus.PAYMENT_PENDING]: (
        <span className={"rounded bg-orange-500 px-2 py-1 text-white"}>
            Pagamento pendente
        </span>
    ),
    [BookingStatus.CONFIRMED]: (
        <span className={"rounded bg-green-500 px-2 py-1 text-white"}>
            Pago
        </span>
    ),
    [BookingStatus.CANCELED]: (
        <span className={"rounded bg-red-500 px-2 py-1 text-white"}>
            Cancelada
        </span>
    ),
    [BookingStatus.IN_PROGRESS]: (
        <span className={"rounded bg-blue-500 px-2 py-1 text-white"}>
            Em andamento
        </span>
    ),
    [BookingStatus.OVERDUE]: (
        <span className={"rounded bg-red-500 px-2 py-1 text-white"}>
            Atrasada
        </span>
    ),
    [BookingStatus.CONCLUDED]: (
        <span className={"rounded bg-green-500 px-2 py-1 text-white"}>
            Concluída
        </span>
    ),
};
