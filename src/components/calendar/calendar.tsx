import FullCalendar from "@fullcalendar/react";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useRef } from "react";

export function Calendar({
    view,
}: {
    view: "dayGridMonth" | "dayGridWeek" | "dayGridDay";
}) {
    const calendarRef = useRef<FullCalendar>(null);

    return (
        <FullCalendar
            ref={calendarRef}
            locale={ptBrLocale}
            headerToolbar={false}
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
