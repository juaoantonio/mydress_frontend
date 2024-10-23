import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { format, isBefore, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import React from "react";
import { FilterProps } from "./filters.products.types";

interface Props extends FilterProps {
    title: string;
    param: "start_date" | "end_date";
}

export function FilterProductsByDate({
    value,
    setFilters,
    title,
    param,
}: Props) {
    const today = startOfDay(new Date());

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
                        {value ? format(value, "PPP") : <span>{title}</span>}
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
                                [param]: date
                                    ? date.toISOString().split("T")[0]
                                    : "",
                            }))
                        }
                        disabled={(date) => isBefore(startOfDay(date), today)}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <Button
                variant={"destructive"}
                className={"aspect-square p-1"}
                onClick={() => setFilters((prev) => ({ ...prev, [param]: "" }))}
            >
                <X size={18} />
            </Button>
        </div>
    );
}
