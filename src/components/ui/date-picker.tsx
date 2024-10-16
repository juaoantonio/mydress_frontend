import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { Control, Controller } from "react-hook-form";
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export function DatePicker({
    control,
    name,
    label,
    placeholder,
}: {
    control: Control<any>;
    name: string;
    label: string;
    placeholder?: string;
}) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !field.value &&
                                                "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                            format(
                                                new Date(field.value),
                                                "PPP",
                                                {
                                                    locale: ptBR,
                                                },
                                            )
                                        ) : (
                                            <span>
                                                {placeholder ||
                                                    "Selecione uma data"}
                                            </span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={
                                            field.value
                                                ? new Date(field.value)
                                                : undefined
                                        }
                                        onSelect={(date) =>
                                            field.onChange(date?.toISOString())
                                        }
                                        locale={ptBR}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                    </FormItem>
                );
            }}
        />
    );
}
