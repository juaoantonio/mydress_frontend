import FullCalendar from "@fullcalendar/react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DetailCalendarEvent } from "@/components/calendar/detail-calendar-event";
import { useEffect, useRef, useState } from "react";
import { BookingType } from "@/types/booking.types";
import { BookingService } from "@/services/bookings/booking.service";
import { useQuery } from "@tanstack/react-query";
import { EventClickArg } from "@fullcalendar/core";
import { toast } from "sonner";

export function Calendar({ view }: { view: "dayGridMonth" | "dayGridWeek" }) {
    const calendarRef = useRef<FullCalendar>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState<BookingType | null>(
        null,
    );

    const bookingService = new BookingService();
    const { data, isError } = useQuery({
        queryKey: ["bookings"],
        queryFn: bookingService.getAll,
    });

    const handleEventClick = (arg: EventClickArg) => {
        setCurrentBooking(
            data?.find((booking) => booking.id === arg.event.id) || null,
        );
        setIsOpen(true);
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
        <>
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

            <DetailCalendarEvent
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                currentBooking={currentBooking}
            />
        </>
    );
}
