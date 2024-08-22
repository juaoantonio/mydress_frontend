"use client";

import { DataTable } from "@/components/data-table/data-table-root";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BookingService } from "@/services/bookings/booking.service";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { toast } from "sonner";
import { BookingType } from "@/types/booking.types";
import { useTable } from "@/hooks/useTable";
import { bookingColumns } from "@/app/(private)/reservas/components/booking-columns";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useSearchParams } from "next/navigation";

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
        return <LoadingSpinner />;
    }

    if (isError) {
        toast.error("Erro ao carregar reservas");
        return null;
    }

    return <Table data={data} />;
}

function Table({ data }: { data: BookingType[] }) {
    const table = useTable({
        data,
        columns: bookingColumns,
    });

    return (
        <div className={"space-y-4"}>
            <DataTable
                table={table}
                noResultsMessage={"Nenhuma reserva encontrada"}
            />
            <DataTablePagination table={table} />
        </div>
    );
}
