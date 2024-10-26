import { DressStatus, ClutchStatus } from "@/types/products/product.enums";
import { ReactElement } from "react";

export const DressStatusMapping: {
    [key in DressStatus]: ReactElement;
} = {
    [DressStatus.AVAILABLE]: (
        <span className={"rounded bg-green-500 px-2 py-1 text-white"}>
            Disponível
        </span>
    ),
    [DressStatus.OUT_OF_STOCK]: (
        <span className={"rounded bg-red-500 px-2 py-1 text-white"}>
            Indisponível
        </span>
    ),
    [DressStatus.PICKED_UP]: (
        <span className={"rounded bg-yellow-500 px-2 py-1 text-white"}>
            Retirado
        </span>
    ),
    [DressStatus.BOOKED]: (
        <span className={"rounded bg-blue-500 px-2 py-1 text-white"}>
            Reservado
        </span>
    ),
    [DressStatus.RETURNED]: (
        <span className={"rounded bg-purple-500 px-2 py-1 text-white"}>
            Devolvido
        </span>
    ),
    [DressStatus.DAMAGED]: (
        <span className={"rounded bg-red-500 px-2 py-1 text-white"}>
            Danificado
        </span>
    ),
    [DressStatus.IN_WASH]: (
        <span className={"rounded bg-blue-500 px-2 py-1 text-white"}>
            Em lavagem
        </span>
    ),
};

export const ClutchStatusMapping: {
    [key in ClutchStatus]: ReactElement;
} = {
    [DressStatus.AVAILABLE]: (
        <span className={"rounded bg-green-500 px-2 py-1 text-white"}>
            Disponível
        </span>
    ),
    [DressStatus.OUT_OF_STOCK]: (
        <span className={"rounded bg-red-500 px-2 py-1 text-white"}>
            Indisponível
        </span>
    ),
    [DressStatus.PICKED_UP]: (
        <span className={"rounded bg-yellow-500 px-2 py-1 text-white"}>
            Retirado
        </span>
    ),
    [DressStatus.BOOKED]: (
        <span className={"rounded bg-blue-500 px-2 py-1 text-white"}>
            Reservado
        </span>
    ),
    [DressStatus.RETURNED]: (
        <span className={"rounded bg-purple-500 px-2 py-1 text-white"}>
            Devolvido
        </span>
    ),
    [DressStatus.DAMAGED]: (
        <span className={"rounded bg-red-500 px-2 py-1 text-white"}>
            Danificado
        </span>
    ),
};
