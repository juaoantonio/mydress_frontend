import FullCalendar from "@fullcalendar/react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export function Calendar({
    view,
}: {
    view: "dayGridMonth" | "dayGridWeek" | "dayGridDay";
}) {
    const calendarRef = useRef<FullCalendar>(null);
    const router = useRouter();
    const handleDateClick = (arg: DateClickArg) => {
        router.push(`/reservas/preview?date=${arg.dateStr}`);
    };

    return (
        <FullCalendar
            ref={calendarRef}
            locale={ptBrLocale}
            headerToolbar={false}
            dateClick={handleDateClick}
            footerToolbar={{
                start: "prev,next",
                end: "title",
            }}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView={view}
            height={"87%"}
            customButtons={{}}
        />
    );
}
