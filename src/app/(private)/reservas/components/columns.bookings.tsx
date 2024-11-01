import { ColumnDef } from "@tanstack/table-core";
import {
    BookingClutchItemType,
    BookingDressItemType,
    BookingType,
} from "@/types/booking.types";
import { BookingStatus } from "@/types/booking.enums";
import { BookingStatusMapping } from "@/mappings/bookings.mapping";
import { numberToCurrency } from "@/lib/utils";

export const columnsBookings: ColumnDef<BookingType>[] = [
    {
        accessorKey: "customerName",
        header: () => <div className="text-nowrap">Cliente</div>,
        cell: ({ row }) => {
            const customer = row.getValue("customerName") as string;
            return <div className="text-nowrap">{customer}</div>;
        },
    },
    {
        accessorKey: "eventDate",
        header: () => <div className="text-nowrap">Data do evento</div>,
        cell: ({ row }) => {
            const event = row.getValue("eventDate") as string;
            if (event) {
                return new Date(event).toLocaleDateString();
            }
        },
    },
    {
        accessorKey: "dresses",
        header: "Vestidos",
        cell: ({ row }) => {
            const dresses = row.getValue("dresses") as BookingDressItemType[];
            return dresses.length;
        },
    },
    {
        accessorKey: "clutches",
        header: "Bolsas",
        cell: ({ row }) => {
            const clutches = row.getValue(
                "clutches",
            ) as BookingClutchItemType[];
            return clutches.length;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as BookingStatus;
            return <div className={"py-2"}>{BookingStatusMapping[status]}</div>;
        },
        size: 400,
    },
    {
        accessorKey: "totalBookingPrice",
        header: "Valor Total",
        cell: ({ row }) => {
            const paymentAmount = row.getValue("totalBookingPrice") as number;
            return numberToCurrency(paymentAmount);
        },
    },
    {
        accessorKey: "amountPaid",
        header: () => <div className="text-nowrap">Valor Pago</div>,

        cell: ({ row }) => {
            const amountPaid = row.getValue("amountPaid") as number;
            return numberToCurrency(amountPaid);
        },
    },
];
