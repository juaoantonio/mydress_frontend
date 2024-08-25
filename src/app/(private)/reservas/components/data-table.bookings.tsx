"use client";

import { DataTable } from "@/components/data-table/data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BookingService } from "@/services/bookings/booking.service";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { toast } from "sonner";
import { BookingType } from "@/types/booking.types";
import { useTable } from "@/hooks/useTable";
import { columnsBookings } from "@/app/(private)/reservas/components/columns.bookings";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Row } from "@tanstack/react-table";

export function DataTableBookings() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status") ?? "";
    const customer_name = searchParams.get("customer_name") ?? "";
    const event_date = searchParams.get("event_date") ?? "";

    const service = new BookingService();
    const { data, isError, isPending } = useQuery({
        queryKey: ["bookings", status, customer_name, event_date],
        queryFn: () =>
            service.getAll({
                status,
                customer_name,
                event_date,
            }),
        placeholderData: keepPreviousData,
    });

    if (isPending) {
        return (
            <div className={"flex items-center justify-center"}>
                <LoadingSpinner />;
            </div>
        );
    }

    if (isError) {
        toast.error("Erro ao carregar reservas");
    }

    return <Table data={isError ? [] : data} />;
}

function Table({ data }: { data: BookingType[] }) {
    const router = useRouter();
    const table = useTable({
        data,
        columns: columnsBookings,
        getRowId: (row) => row.id,
    });

    function onRowClick(row: Row<BookingType>) {
        router.push(`/reservas/${row.id}`);
    }

    return (
        <div className={"space-y-4"}>
            <DataTable
                table={table}
                onRowClick={onRowClick}
                noResultsMessage={"Nenhuma reserva encontrada"}
            />
            <DataTablePagination table={table} />
        </div>
    );
}
