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
import { PursesInput } from "@/app/(private)/reservas/cadastrar/components/purses-input";
import { EventInput } from "@/app/(private)/reservas/cadastrar/components/event-input";
import { CalendarInput } from "@/app/(private)/reservas/cadastrar/components/calendar-input";
import { Button } from "@/components/ui/button";
import { handleCreationFormError } from "@/lib/utils";
import { BookingService } from "@/services/bookings/booking.service";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { DevTool } from "@hookform/devtools";

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
        (message) =>
            "Data do evento deve ser entre a data de início e fim da reserva",
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
            purses: [],
        },
    });

    const service = new BookingService();
    const mutation = useMutation({
        mutationFn: (data: BookingFormType) => {
            return service.create({
                event: data.event,
                customer: data.customer,
                start_date: data.range_date.start_date!.toISOString(),
                end_date: data.range_date.end_date!.toISOString(),
                products: [...data.dresses, ...data.purses],
                notes: data.notes,
            });
        },
        onError: (error) => {
            handleBookingCreationError(error, form);
        },
        onSuccess: () => {
            toast.success("Reserva criada com sucesso!");

            router.back();
        },
    });

    async function onSubmit(data: BookingFormType) {
        const session = await getSession();

        if (!session) {
            toast.error("Você precisa estar logado para cadastrar um cliente!");
            return;
        }

        mutation.mutate(data);
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={"space-y-4"}
                >
                    <div className={"grid gap-3 lg:grid-cols-2 lg:gap-4"}>
                        <CustomerInput control={form.control} />

                        <EventInput control={form.control} />

                        <CalendarInput form={form} />

                        <DressesInput form={form} />

                        <PursesInput form={form} />

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
                    <FormMessage>
                        {form.formState.errors.root?.message}
                    </FormMessage>
                    <div className={"flex gap-2"}>
                        <Button
                            className={"flex-1"}
                            type={"button"}
                            variant={"outline"}
                            onClick={() => router.back()}
                        >
                            Cancelar
                        </Button>
                        <Button className={"flex-1"} type={"submit"}>
                            Salvar
                        </Button>
                    </div>
                </form>
            </Form>
            <DevTool control={form.control} />
        </>
    );
}
