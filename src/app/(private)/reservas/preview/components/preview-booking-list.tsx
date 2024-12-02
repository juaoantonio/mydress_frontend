"use client";

import { formatDate } from "@/app/(private)/agendamentos/utils";
import { useSearchParams } from "next/navigation";
import { BookingService } from "@/services/bookings/booking.service";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { PageSection } from "@/components/page/page-section";
import { PreviewBookingsTable } from "@/app/(private)/reservas/preview/components/preview-bookings-table";

export function PreviewBookingList() {
    const bookingService = new BookingService();
    const searchParams = useSearchParams();
    const date = `${searchParams.get("date")}T03:00:00Z`;

    const { data, isError, isPending } = useQuery({
        queryKey: ["booking", date],
        queryFn: () => {
            return bookingService.getPaginated({
                eventDate: date,
            });
        },
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
            <div className={"min-h-[500px]"}>
                <p>Erro ao carregar a reserva</p>
            </div>
        );
    }

    return (
        <PageSection title={`Reservas do dia ${formatDate(date)}`}>
            <div>
                {data.items ? (
                    <PreviewBookingsTable bookings={data.items} />
                ) : (
                    <p>
                        Nenhuma reserva encontrada para o dia {formatDate(date)}
                    </p>
                )}
            </div>
        </PageSection>
    );
}
