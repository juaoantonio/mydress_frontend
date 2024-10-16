import { FilterProps } from "./filters.bookings.types";
import React from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { AutoComplete } from "@/components/auto-complete/auto-complete";
import { EventService } from "@/services/events/event.service";

export function FilterEventReception({ setFilters, value }: FilterProps) {
    const eventService = new EventService();
    const debouncedValue = useDebounce(value, 800);

    const { data, isPending, isError } = useQuery({
        queryKey: ["events", debouncedValue],
        queryFn: () => {
            return eventService.getAll({
                filters: { event_reception: debouncedValue },
            });
        },
    });

    function handleChange(value: string) {
        setFilters((prev) => ({
            ...prev,
            event_reception: value,
        }));
    }

    function handleClear() {
        setFilters((prev) => ({
            ...prev,
            event_reception: "",
        }));
    }

    return (
        <AutoComplete
            value={value}
            label={"Recepção"}
            placeholder={"Digite a recepção do evento"}
            isPending={isPending}
            isError={isError}
            data={data}
            onChangeProperty={"event_reception"}
            displayProperty={"event_reception"}
            errorMessage={"Erro ao encontrar eventos"}
            handleChange={handleChange}
            handleClear={handleClear}
        />
    );
}
