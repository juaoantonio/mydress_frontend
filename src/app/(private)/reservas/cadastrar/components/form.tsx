"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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

setDefaultOptions({ locale: ptBR });

export function CreateBookingForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof createBookingSchema>>({
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

    async function onSubmit(data: z.infer<typeof createBookingSchema>) {
        try {
            // await createBooking(data);
            router.back();
        } catch (error) {
            console.error(error);
        }
    }

    return (
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
    );
}
