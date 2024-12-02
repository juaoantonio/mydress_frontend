"use client";

import { BookingType } from "@/types/booking.types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ImageListItem, List, ListItem } from "@/components/list/list";
import React from "react";
import { getPercentage } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function PreviewBookingsTable({
    bookings,
}: {
    bookings: BookingType[];
}) {
    const router = useRouter();
    function handleClick(id: string) {
        router.push(`/reservas/${id}`);
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Vestido(s)</TableHead>
                    <TableHead>Ajustes</TableHead>
                    <TableHead>Bolsa(s)</TableHead>
                    <TableHead>Valor Pago</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookings.map((booking) => (
                    <TableRow
                        key={booking.id}
                        onClick={() => handleClick(booking.id)}
                    >
                        <TableCell className={"text-nowrap"}>
                            {booking.customerName}
                        </TableCell>
                        <TableCell className={"pr-40"}>
                            {booking.dresses.map((dress) => (
                                <ImageListItem
                                    key={dress.id}
                                    img={dress.imagePath}
                                    imgAlt={`${dress.model}, ${dress.color}, ${dress.fabric}`}
                                    label={`${dress.model}, ${dress.color}, ${dress.fabric}`}
                                />
                            ))}
                        </TableCell>
                        <TableCell>
                            <List>
                                {booking.dresses.map((dress) =>
                                    dress.adjustments.map((adjustment) => (
                                        <ListItem
                                            key={adjustment.label}
                                            label={adjustment.label}
                                            value={adjustment.description}
                                            textLeft={true}
                                        />
                                    )),
                                )}
                            </List>
                        </TableCell>
                        <TableCell>
                            {booking.clutches.map((clutch) => (
                                <ImageListItem
                                    key={clutch.id}
                                    img={clutch.imagePath}
                                    imgAlt={`${clutch.model}, ${clutch.color}`}
                                    label={`${clutch.model}, ${clutch.color}`}
                                />
                            ))}
                        </TableCell>

                        <TableCell>
                            {getPercentage(
                                booking.amountPaid,
                                booking.totalBookingPrice,
                            )}{" "}
                            %
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
