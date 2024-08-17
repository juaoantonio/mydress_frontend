import FullCalendar from "@fullcalendar/react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef } from "react";
import { BookingService } from "@/services/bookings/booking.service";
import { useQuery } from "@tanstack/react-query";
import { EventClickArg } from "@fullcalendar/core";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Calendar({
    view,
}: {
    view: "dayGridMonth" | "dayGridWeek" | "dayGridDay";
}) {
    const calendarRef = useRef<FullCalendar>(null);
    const router = useRouter();

    const bookingService = new BookingService();
    const { data, isError } = useQuery({
        queryKey: ["bookings"],
        queryFn: bookingService.getAll,
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
