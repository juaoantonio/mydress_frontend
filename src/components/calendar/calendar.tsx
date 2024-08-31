import FullCalendar from "@fullcalendar/react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef } from "react";
import { BookingService } from "@/services/bookings/booking.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { EventClickArg } from "@fullcalendar/core";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export function Calendar({
    view,
}: {
    view: "dayGridMonth" | "dayGridWeek" | "dayGridDay";
}) {
    const calendarRef = useRef<FullCalendar>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const status = searchParams.get("status") ?? "";
    const customer_name = searchParams.get("customer_name") ?? "";
    const event_date = searchParams.get("event_date") ?? "";

    const service = new BookingService();
    const { data, isError } = useQuery({
        queryKey: ["bookings", status, customer_name, event_date],
        queryFn: () =>
            service.getAll({
                filters: {
                    status,
                    customer_name,
                    event_date,
                },
            }),
        placeholderData: keepPreviousData,
    });

    const handleEventClick = (arg: EventClickArg) => {
        router.push(`/reservas/${arg.event.id}`);
    };

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar reservas");
        }
    }, [isError]);

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().changeView(view);
        }
    }, [view]);

    const events = data?.map((booking) => ({
        title: booking.customer.name,
        start: booking.start_date,
        end: booking.end_date,
        id: booking.id,
    }));

    return (
        <FullCalendar
            ref={calendarRef}
            locale={ptBrLocale}
            headerToolbar={false}
            eventClick={handleEventClick}
            footerToolbar={{
                start: "prev,next",
                end: "title",
            }}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView={view}
            height={"87%"}
            events={events}
            customButtons={{}}
        />
    );
}
