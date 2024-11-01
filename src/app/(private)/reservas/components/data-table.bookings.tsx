"use client";

import { DataTable } from "@/components/data-table/data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BookingService } from "@/services/bookings/booking.service";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { toast } from "sonner";
import { BookingType } from "@/types/booking.types";
import { useTable } from "@/hooks/use-table";
import { columnsBookings } from "@/app/(private)/reservas/components/columns.bookings";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import { useQueryParams } from "@/hooks/use-query-params";

export function DataTableBookings() {
    const service = new BookingService();

    const params = useQueryParams({
        page: 1,
        limit: 10,
        eventDate: null,
        customerName: null,
        expectedPickUpDate: null,
        expectedReturnDate: null,
        status: null,
    });

    const { data, isError, isPending } = useQuery({
        queryKey: ["bookings", params],
        queryFn: () => service.getPaginated(params),
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

    return <Table data={isError ? [] : data.items} perPage={data.perPage} />;
}

function Table({ data, perPage }: { data: BookingType[]; perPage: number }) {
    const router = useRouter();
    const table = useTable({
        data,
        columns: columnsBookings,
        perPage: perPage,
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
