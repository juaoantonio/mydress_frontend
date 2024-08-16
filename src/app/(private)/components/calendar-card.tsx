"use client";

import { useState } from "react";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/calendar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

setDefaultOptions({
    locale: ptBR,
});

export default function CalendarCard() {
    const [calendarView, setCalendarView] = useState<
        "dayGridMonth" | "dayGridWeek" | "dayGridDay"
    >("dayGridMonth");

    return (
        <>
            <Card className={"col-span-full h-[75vh]"}>
                <CardHeader
                    className={
                        "flex flex-row items-center justify-between space-y-0"
                    }
                >
                    <CardTitle>Calendário de Reservas</CardTitle>

                    <Tabs defaultValue={"dayGridMonth"}>
                        <TabsList>
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
                </CardHeader>
                <CardContent className={"h-full text-xs"}>
                    <Calendar view={calendarView} />
                </CardContent>
            </Card>
        </>
    );
}
