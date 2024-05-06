"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

export default function Calendar() {
  const handleDateClick = (arg: any) => {};

  return (
    <FullCalendar
      locale={ptBrLocale}
      headerToolbar={false}
      footerToolbar={{
        start: "prev,next",
        end: "title",
      }}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      height={"90%"}
      events={[
        {
          title: "Amanda Silva",
          start: "2024-05-16",
          end: "2024-05-18",
        },
        {
          title: "Samira Reis",
          start: "2024-05-03",
          end: "2024-05-06",
        },
      ]}
      editable={true}
      dateClick={handleDateClick}
      customButtons={{}}
    />
  );
}
