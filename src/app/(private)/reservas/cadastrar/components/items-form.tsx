import {
    bookingItemsSchema,
    BookingItemsType,
} from "@/schemas/booking.schemas";
import {
    BookingService,
    IBookingItems,
} from "@/services/bookings/booking.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { DressesInput } from "./dresses-input";
import { ClutchesInput } from "./clutches-input";

interface Props {
    bookingId: string;
    service: BookingService;
}

export default function ItemsForm({ bookingId, service }: Props) {
    const router = useRouter();

    const searchParams = useSearchParams();

    const bookingItemsForm = useForm<BookingItemsType>({
        resolver: zodResolver(bookingItemsSchema),
        defaultValues: {
            dresses: [],
            clutches: [],
        },
    });

    const bookingItemsMutation = useMutation({
        mutationFn: async (data: BookingItemsType) => {
            return service.bookingItems(bookingId, data as IBookingItems);
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

    const clutches = bookingItemsForm.watch("clutches") ?? [];

    const dresses = bookingItemsForm.watch("dresses") ?? [];

    const invalidBookingInsertion =
        dresses.length <= 0 || (dresses.length > 0 && clutches.length < 0);

    const start_date = searchParams.get("expectedDate");

    const end_date = searchParams.get("returnDate");

    const areDressAndClutchInputsDisabled = !start_date || !end_date;

    if (areDressAndClutchInputsDisabled) {
        router.back();
        return;
    }

    return (
        <FormProvider {...bookingItemsForm}>
            <form
                onSubmit={bookingItemsForm.handleSubmit(handleBookItems)}
                className={"space-y-4"}
            >
                <div className={"space-y-4"}>
                    <DressesInput
                        form={bookingItemsForm}
                        available
                        start_date={start_date}
                        end_date={end_date}
                    />

                    <ClutchesInput
                        form={bookingItemsForm}
                        available
                        start_date={start_date}
                        end_date={end_date}
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
