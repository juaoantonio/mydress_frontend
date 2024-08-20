"use client";

import { z } from "zod";
import { createEventSchema } from "@/schemas/event.schemas";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { EventService } from "@/services/events/event.service";
import { useMutation } from "@tanstack/react-query";
import { CreateEventInputDTO } from "@/services/events/event.dto";
import { toast } from "sonner";
import { cn, handleCreationFormError } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";

setDefaultOptions({ locale: ptBR });

type CreateEventFormType = z.infer<typeof createEventSchema>;

function handleDressCreationError(
    error: unknown,
    form: UseFormReturn<CreateEventFormType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao criar evento",
        (message) => message,
    );
}

export function CreateEventForm() {
    const router = useRouter();
    const service = new EventService();
    const form = useForm<CreateEventFormType>({
        resolver: zodResolver(createEventSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: CreateEventInputDTO) => service.create(data),
        onMutate: () => toast.loading("Salvando evento..."),
        onError: (error) => {
            console.error(error);
            toast.dismiss();
            toast.error("Erro ao criar evento");
            handleDressCreationError(error, form);
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Evento criado com sucesso");
            router.back();
        },
    });

    async function handleEventCreation(data: CreateEventFormType) {
        mutation.mutate({
            event_address: data.event_address,
            event_datetime: data.event_datetime.toISOString(),
            event_reception: data.event_reception,
        });
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleEventCreation)}
                className={"space-y-4"}
            >
                <div className={"grid gap-4 lg:grid-cols-2 lg:gap-4"}>
                    <FormField
                        control={form.control}
                        name={"event_reception"}
                        render={({ ...field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"event_reception"}>
                                    Recepção do evento
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id={"event_reception"}
                                        type={"text"}
                                        placeholder={"Recepção do evento"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"event_address"}
                        render={({ ...field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"event_address"}>
                                    Endereço do evento
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id={"event_address"}
                                        type={"text"}
                                        placeholder={"Endereço do evento"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {
                                        form.formState.errors.event_address
                                            ?.message
                                    }
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"event_datetime"}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Data do evento</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>
                                                        Escolha uma data
                                                    </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            locale={ptBR}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className={"flex gap-2"}>
                    <Button
                        className={"flex-1"}
                        type={"button"}
                        variant={"outline"}
                        onClick={() => router.back()}
                    >
                        Cancelar
                    </Button>
                    <Button
                        className={"flex-1"}
                        type={"submit"}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting
                            ? "Salvando..."
                            : "Salvar reserva"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
