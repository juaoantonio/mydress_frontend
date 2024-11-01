import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface TableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    perPage?: number;
    getRowId?: (row: TData) => string;
}

export function useTable<TData, TValue>({
    columns,
    data,
    perPage,
    getRowId,
}: TableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        rowCount: perPage,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getRowId,
        manualFiltering: true,
        state: {
            sorting,
            columnFilters,
        },
        enableColumnResizing: true,
    });

    return table;
}
