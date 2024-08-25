"use client";

import { flexRender, Row, Table } from "@tanstack/react-table";

import {
    Table as TableComponent,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";

interface DataTableProps<TData> {
    table: Table<TData>;
    noResultsMessage?: string;
    onRowClick?: (row: Row<TData>) => void;
}

export function DataTable<TData>({
    table,
    noResultsMessage,
    onRowClick,
}: DataTableProps<TData>) {
    const columnsLength = table.getAllColumns().length;

    return (
        <div className="rounded-md border">
            <TableComponent>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                onClick={() => onRowClick?.(row)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columnsLength}
                                className="h-24 text-center"
                            >
                                {noResultsMessage ||
                                    "Nenhum resultado encontrado"}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </TableComponent>
        </div>
    );
}
