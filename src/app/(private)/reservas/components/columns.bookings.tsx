import { ColumnDef } from "@tanstack/table-core";
import { BookingType } from "@/types/booking.types";
import { EventType } from "@/types/events/event.types";
import { DressType } from "@/types/products/dress.types";
import { PurseType } from "@/types/products/purse.types";
import { BookingStatus } from "@/types/booking.enums";
import { BookingStatusMapping } from "@/mappings/bookings.mapping";
import { numberToCurrency } from "@/lib/utils";
import { CustomerType } from "@/types/customer.types";

export const columnsBookings: ColumnDef<BookingType>[] = [
    {
        accessorKey: "customer",
        header: () => <div className="text-nowrap">Cliente</div>,
        cell: ({ row }) => {
            const customer = row.getValue("customer") as CustomerType;
            return <div className="text-nowrap">{customer.name}</div>;
        },
    },
    {
        accessorKey: "event",
        header: () => <div className="text-nowrap">Data do evento</div>,
        cell: ({ row }) => {
            const event = row.getValue("event") as EventType;
            if (event) {
                return new Date(event.event_datetime).toLocaleDateString();
            }
        },
    },
    {
        accessorKey: "dresses",
        header: "Vestidos",
        cell: ({ row }) => {
            const dresses = row.getValue("dresses") as DressType[];
            return dresses.length;
        },
    },
    {
        accessorKey: "purses",
        header: "Bolsas",
        cell: ({ row }) => {
            const purses = row.getValue("purses") as PurseType[];
            return purses.length;
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
        accessorKey: "payment_amount",
        header: "Valor",
        cell: ({ row }) => {
            const paymentAmount = row.getValue("payment_amount") as number;
            return numberToCurrency(paymentAmount);
        },
    },
    {
        accessorKey: "amount_paid",
        header: () => <div className="text-nowrap">Valor Pago</div>,

        cell: ({ row }) => {
            const amountPaid = row.getValue("amount_paid") as number;
            return numberToCurrency(amountPaid);
        },
    },
];
