"use client";

import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createBookingSchema } from "@/schemas/booking.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import React from "react";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { CustomerInput } from "@/app/(private)/reservas/cadastrar/components/customer-input";
import { DressesInput } from "@/app/(private)/reservas/cadastrar/components/dresses-input";
import { ClutchesInput } from "@/app/(private)/reservas/cadastrar/components/clutches-input";
import { EventInput } from "@/app/(private)/reservas/cadastrar/components/event-input";
import { CalendarInput } from "@/app/(private)/reservas/cadastrar/components/calendar-input";
import { Button } from "@/components/ui/button";
import { handleCreationFormError } from "@/lib/utils";
import { BookingService } from "@/services/bookings/booking.service";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { toast } from "sonner";

setDefaultOptions({ locale: ptBR });

type BookingFormType = z.infer<typeof createBookingSchema>;

function handleBookingCreationError(
    error: unknown,
    form: UseFormReturn<BookingFormType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao criar a reserva",
        (message) => message,
    );
}

export function CreateBookingForm() {
    const router = useRouter();
    const form = useForm<BookingFormType>({
        resolver: zodResolver(createBookingSchema),
        defaultValues: {
            status: "CONFIRMED",
            event: "",
            customer: "",
            range_date: {
                start_date: null,
                end_date: null,
            },
            notes: "",
            dresses: [],
            clutches: [],
        },
    });

    const service = new BookingService();
    const mutation = useMutation({
        mutationFn: (data: BookingFormType) => {
            return service.create({
                data: {
                    event: data.event,
                    customer: data.customer,
                    start_date: data.range_date.start_date!.toISOString(),
                    end_date: data.range_date.end_date!.toISOString(),
                    dresses: data.dresses,
                    clutches: data.clutches,
                    jewels: [],
                    notes: data.notes,
                },
            });
        },
        onMutate: () => toast.loading("Criando reserva"),
        onError: (error) => {
            toast.dismiss();
            toast.error(error.message);

            handleBookingCreationError(error, form);
        },
        onSuccess: (data) => {
            toast.dismiss();
            toast.success("Reserva criada com sucesso!");

            router.replace(`/reservas/cadastrar/ajustes/${data.id}`);
        },
    });

    async function handleBookingCreation(data: BookingFormType) {
        const session = await getSession();

        if (!session) {
            toast.error(
                "Você precisa estar logado para criar uma nova reserva!",
            );
            return;
        }

        mutation.mutate(data);
    }

    const start_date = form.watch("range_date.start_date");
    const end_date = form.watch("range_date.end_date");

    const areDressAndClutchInputsDisabled = !start_date || !end_date;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleBookingCreation)}
                className={"space-y-4"}
            >
                <div className={"grid gap-3 lg:grid-cols-2 lg:gap-4"}>
                    <CustomerInput control={form.control} />

                    <EventInput control={form.control} />

                    <CalendarInput form={form} />

                    <DressesInput
                        form={form}
                        start_date={start_date}
                        end_date={end_date}
                        disabled={areDressAndClutchInputsDisabled}
                    />

                    <ClutchesInput
                        form={form}
                        start_date={start_date}
                        end_date={end_date}
                        disabled={areDressAndClutchInputsDisabled}
                    />

                    <FormField
                        control={form.control}
                        name={"notes"}
                        render={({ field }) => (
                            <FormItem className={"space-y-1"}>
                                <FormLabel>Observações</FormLabel>
                                <FormControl>
                                    <Textarea rows={6} {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormMessage>{form.formState.errors.root?.message}</FormMessage>
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
