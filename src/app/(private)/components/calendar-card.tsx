"use client";

import { useState } from "react";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/calendar/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

setDefaultOptions({
    locale: ptBR,
});

export default function CalendarCard() {
    const [calendarView, setCalendarView] = useState<
        "dayGridMonth" | "dayGridWeek" | "dayGridDay"
    >("dayGridMonth");

    return (
        <div className={"space-y-1.5"}>
            <Tabs defaultValue={"dayGridMonth"}>
                <TabsList className={"mb-4 grid w-full grid-cols-3"}>
                    <TabsTrigger
                        value={"dayGridMonth"}
                        onClick={() => setCalendarView("dayGridMonth")}
                    >
                        Mês
                    </TabsTrigger>
                    <TabsTrigger
                        value={"dayGridWeek"}
                        onClick={() => setCalendarView("dayGridWeek")}
                    >
                        Semana
                    </TabsTrigger>
                    <TabsTrigger
                        value={"dayGridDay"}
                        onClick={() => setCalendarView("dayGridDay")}
                    >
                        Dia
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <div className={"h-[800px]"}>
                <Calendar view={calendarView} />
            </div>
        </div>
    );
}
