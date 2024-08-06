import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
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
import { UseFormReturn } from "react-hook-form";

export function CalendarInput({ form }: { form: UseFormReturn<any> }) {
    return (
        <FormField
            control={form.control}
            name={"range_date"}
            render={({ field }) => (
                <FormItem className={"col-span-full space-y-1"}>
                    <FormLabel>Período da reserva</FormLabel>
                    <div className={"flex gap-2"}>
                        <FormControl>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "flex w-full justify-start text-left font-normal",
                                            !field.value &&
                                                "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value.start_date ? (
                                            field.value.end_date ? (
                                                <>
                                                    {format(
                                                        field.value.start_date,
                                                        "LLL dd, y",
                                                    )}{" "}
                                                    -{" "}
                                                    {format(
                                                        field.value.end_date,
                                                        "LLL dd, y",
                                                    )}
                                                </>
                                            ) : (
                                                format(
                                                    field.value.start_date,
                                                    "LLL dd, y",
                                                )
                                            )
                                        ) : (
                                            <span>
                                                Escolha um intervalo de data
                                            </span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        locale={ptBR}
                                        selected={{
                                            from: field.value.start_date,
                                            to: field.value.end_date,
                                        }}
                                        onSelect={(range) => {
                                            form.clearErrors("range_date");
                                            form.setValue("range_date", {
                                                start_date: range
                                                    ? range.from
                                                    : null,
                                                end_date: range
                                                    ? range.to
                                                    : null,
                                            });
                                        }}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormControl>

                        <Button
                            variant={"destructive"}
                            className={"h-full w-9 flex-1 p-2"}
                            onClick={() =>
                                form.setValue("range_date", {
                                    start_date: null,
                                    end_date: null,
                                })
                            }
                        >
                            <X size={20} />
                        </Button>
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
