import { BookingStatus } from "@/types/booking.enums";
import { ReactElement } from "react";

export const BookingStatusMapping: {
    [key in BookingStatus]: ReactElement | string;
} = {
    [BookingStatus.NOT_INITIATED]: (
        <span
            className={"text-nowrap rounded bg-gray-500 px-2 py-1 text-white"}
        >
            Não iniciada
        </span>
    ),

    [BookingStatus.PAYMENT_PENDING]: (
        <span
            className={"text-nowrap rounded bg-orange-500 px-2 py-1 text-white"}
        >
            Pagamento pendente
        </span>
    ),
    [BookingStatus.READY]: (
        <span
            className={"text-nowrap rounded bg-green-500 px-2 py-1 text-white"}
        >
            Paga
        </span>
    ),
    [BookingStatus.CANCELED]: (
        <span className={"text-nowrap rounded bg-red-500 px-2 py-1 text-white"}>
            Cancelada
        </span>
    ),
    [BookingStatus.IN_PROGRESS]: (
        <span
            className={"text-nowrap rounded bg-blue-500 px-2 py-1 text-white"}
        >
            Em andamento
        </span>
    ),

    [BookingStatus.COMPLETED]: (
        <span
            className={"text-nowrap rounded bg-green-500 px-2 py-1 text-white"}
        >
            Concluída
        </span>
    ),
};
