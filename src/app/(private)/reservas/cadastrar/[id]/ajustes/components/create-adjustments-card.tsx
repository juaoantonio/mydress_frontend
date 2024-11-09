"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "@/services/bookings/booking.service";
import { CreateAdjustmentsForm } from "@/app/(private)/reservas/cadastrar/[id]/ajustes/components/create-adjustments-form";

export function CreateAdjustmentsCard({ bookingId }: { bookingId: string }) {
    const bookingService = new BookingService();

    const { data: booking } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => bookingService.getById(bookingId),
    });

    const dresses = booking?.dresses || [];

    const dressesDetails = booking?.dressesDetails || [];

    return (
        <Card className={"mx-auto h-fit max-w-[800px] flex-1"}>
            <CardHeader className={"px-3"}>
                <CardTitle>Cadastrar ajustes</CardTitle>
            </CardHeader>
            <CardContent className={"px-3"}>
                <CreateAdjustmentsForm
                    dresses={dresses}
                    dressesDetails={dressesDetails}
                    bookingId={bookingId}
                />
            </CardContent>
        </Card>
    );
}
