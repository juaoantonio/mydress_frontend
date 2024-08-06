"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useQuery } from "@tanstack/react-query";
import { BookingService } from "@/services/bookings/booking.service";
import { toast } from "sonner";
import { useEffect } from "react";

export default function Calendar() {
    const bookingService = new BookingService();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["bookings"],
        queryFn: bookingService.getAll,
    });

    const handleDateClick = (arg: DateClickArg) => {};

    useEffect(() => {
        if (isError) {
            toast.error("Erro ao carregar reservas");
        }
    }, [isError]);

    const events = data?.map((booking) => ({
        title: booking.customer.name,
        start: booking.start_date,
        end: booking.end_date,
    }));

    return (
        <FullCalendar
            locale={ptBrLocale}
            headerToolbar={false}
            footerToolbar={{
                start: "prev,next",
                end: "title",
            }}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView={"dayGridWeek"}
            height={"90%"}
            events={events}
            editable={true}
            dateClick={handleDateClick}
            customButtons={{}}
        />
    );
}
