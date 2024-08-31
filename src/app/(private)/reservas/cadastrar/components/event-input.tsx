import React from "react";
import { Control } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { SelectWithAdd } from "@/components/select-with-add/select-with-add";
import { EventService } from "@/services/events/event.service";
import { format, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";

setDefaultOptions({ locale: ptBR });

export function EventInput({ control }: { control: Control<any> }) {
    const eventService = new EventService();
    const {
        isPending,
        isError,
        data: events,
    } = useQuery({
        queryKey: ["events"],
        queryFn: () => eventService.getAll(),
    });

    return (
        <SelectWithAdd
            control={control}
            name={"event"}
            label={"Selecionar evento"}
            placeholder={"Selecione um evento"}
            options={
                events &&
                events.map((event) => ({
                    value: event.id,
                    label: `${event.event_reception} - ${format(event.event_datetime, "dd/MM/yyyy")}`,
                }))
            }
            addActionLink={"/eventos/cadastrar"}
            addActionMessage={"Criar novo evento"}
            loading={isPending}
            error={isError}
        />
    );
}
