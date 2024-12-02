"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "@/services/bookings/booking.service";
import { CreateAdjustmentsForm } from "@/app/(private)/reservas/cadastrar/[id]/ajustes/components/create-adjustments-form";
import Loading from "@/app/loading";

export function CreateAdjustmentsCard({ bookingId }: { bookingId: string }) {
    const bookingService = new BookingService();

    const {
        data: booking,
        isError,
        isPending,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => bookingService.getById(bookingId),
    });

    if (isPending) {
        return (
            <div className={"min-h-[500px]"}>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <p>Erro ao carregar a reserva</p>
            </div>
        );
    }

    const dresses = booking?.dresses || [];

    return (
        <Card className={"mx-auto h-fit max-w-[800px] flex-1"}>
            <CardHeader className={"px-3"}>
                <CardTitle>Cadastrar ajustes</CardTitle>
            </CardHeader>
            <CardContent className={"px-3"}>
                <CreateAdjustmentsForm
                    dresses={dresses}
                    bookingId={bookingId}
                />
            </CardContent>
        </Card>
    );
}
