"use client";

import {
    bookingItemsSchema,
    BookingItemsType,
} from "@/schemas/booking.schemas";
import { BookingService } from "@/services/bookings/booking.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DressesInput } from "./dresses-input";
import { CalendarInput } from "./calendar-input";
import { ClutchesInput } from "./clutches-input";

interface Props {
    bookingId: string;
    service: BookingService;
}

export default function ItemsForm({ bookingId, service }: Props) {
    const router = useRouter();

    const bookingItemsForm = useForm<BookingItemsType>({
        resolver: zodResolver(bookingItemsSchema),
        defaultValues: {
            clutchIds: [],
            dressIds: [],
            range_date: {
                start_date: null,
                end_date: null,
            },
        },
    });

    const bookingItemsMutation = useMutation({
        mutationFn: async (data: BookingItemsType) => {
            return service.bookingItems(bookingId, {
                clutchIds: data.clutchIds,
                dressIds: data.dressIds,
            });
        },
        onMutate: () => toast.loading("Adicionando Items a Reserva"),
        onError: (error) => {
            toast.dismiss();
            toast.error(String(error));
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Itens adicionados à reserva com sucesso");
            router.replace(`/reservas/cadastrar/${bookingId}/ajustes`);
        },
    });

    async function handleBookItems(data: BookingItemsType) {
        const session = await getSession();
        if (!session) {
            toast.error(
                "Você precisa estar logado para adicionar itens a uma reserva",
            );
            return;
        }
        bookingItemsMutation.mutate(data);
    }

    const start_date = bookingItemsForm
        .watch("range_date.start_date")
        ?.toISOString();
    const end_date = bookingItemsForm
        .watch("range_date.end_date")
        ?.toISOString();
    const areDressAndClutchInputsDisabled = !start_date || !end_date;

    const invalidBookingInsertion =
        !bookingItemsForm.watch("clutchIds").length &&
        !bookingItemsForm.watch("dressIds").length;

    return (
        <FormProvider {...bookingItemsForm}>
            <form
                onSubmit={bookingItemsForm.handleSubmit(handleBookItems)}
                className={"space-y-4"}
            >
                <div className={"space-y-4"}>
                    <CalendarInput form={bookingItemsForm} />

                    <DressesInput
                        form={bookingItemsForm}
                        available
                        start_date={start_date}
                        end_date={end_date}
                        disabled={areDressAndClutchInputsDisabled}
                    />

                    <ClutchesInput
                        form={bookingItemsForm}
                        available
                        start_date={start_date}
                        end_date={end_date}
                        disabled={areDressAndClutchInputsDisabled}
                    />

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
                            disabled={
                                bookingItemsForm.formState.isSubmitting ||
                                areDressAndClutchInputsDisabled ||
                                invalidBookingInsertion
                            }
                        >
                            Adicionar Itens
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
