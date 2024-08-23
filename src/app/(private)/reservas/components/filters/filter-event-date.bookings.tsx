import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import React from "react";
import { FilterProps } from "@/app/(private)/reservas/components/filters/filters.bookings.types";

export function FilterEventDateBookings({ value, setFilters }: FilterProps) {
    return (
        <div className={"flex items-center gap-2"}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !value && "text-muted-foreground",
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? (
                            format(value, "PPP")
                        ) : (
                            <span>Escolha a data do evento</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0"
                    onOpenAutoFocus={(e) => e.stopPropagation()}
                >
                    <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={value ? new Date(value) : undefined}
                        onSelect={(date) =>
                            setFilters((prev) => ({
                                ...prev,
                                event_date: date
                                    ? date.toISOString().split("T")[0]
                                    : "",
                            }))
                        }
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <Button
                variant={"destructive"}
                className={"aspect-square p-1"}
                onClick={() =>
                    setFilters((prev) => ({ ...prev, event_date: "" }))
                }
            >
                <X size={18} />
            </Button>
        </div>
    );
}
