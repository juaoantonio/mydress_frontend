import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BookingService } from "@/services/bookings/booking.service";
import { CreateAdjustmentsForm } from "@/app/(private)/reservas/cadastrar/ajustes/[id]/components/create-adjustments-form";

export async function CreateAdjustmentsCard({
    bookingId,
}: {
    bookingId: string;
}) {
    const bookingService = new BookingService();

    const booking = await bookingService.getById(bookingId);
    const dresses = booking.dresses.filter(
        (dress) => dress.available_for_adjustment,
    );

    console.log(booking);

    return (
        <Card className={"mx-auto h-fit max-w-[800px] flex-1"}>
            <CardHeader className={"px-3"}>
                <CardTitle>Cadastrar ajustes</CardTitle>
            </CardHeader>
            <CardContent className={"px-3"}>
                <CreateAdjustmentsForm
                    dresses={dresses}
                    bookingId={bookingId}
                    adjustments={booking.adjustments}
                />
            </CardContent>
        </Card>
    );
}
