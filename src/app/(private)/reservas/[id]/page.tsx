import React from "react";
import { DetailBookingCard } from "@/app/(private)/reservas/[id]/components/detail-booking-card";

export default function BookingDetail({
    params: { id },
}: {
    params: {
        id: string;
    };
}) {
    return (
        <section className={"flex flex-col justify-center lg:items-center"}>
            <h1 className={"mb-5 mt-1 text-xl font-bold text-foreground"}>
                Detalhes da reserva
            </h1>
            <DetailBookingCard bookingId={id} />
        </section>
    );
}
