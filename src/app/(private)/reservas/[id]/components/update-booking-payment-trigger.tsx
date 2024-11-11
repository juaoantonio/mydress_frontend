"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookingService } from "@/services/bookings/booking.service";
import { queryClient } from "@/providers/react-query.provider";
import { getPercentage } from "@/lib/utils";

function createUpdatePaymentSchema(total: number) {
    return z.object({
        amount_paid: z
            .union([
                z.string().transform((x) => x.replace(/[^0-9.-]+/g, "")),
                z.number(),
            ])
            .pipe(
                z.coerce
                    .number({
                        message: "O valor deve ser um número",
                    })
                    .min(0.0, {
                        message: "O valor deve ser positivo",
                    })
                    .max(total, {
                        message:
                            "O valor pago não pode ser maior que o valor total da reserva",
                    }),
            ),
    });
}

type UpdatePaymentType = z.infer<ReturnType<typeof createUpdatePaymentSchema>>;

export function UpdateBookingPaymentTrigger({
    bookingId,
    total,
    status,
    defaultValue,
}: {
    bookingId: string;
    status: string;
    total: number;
    defaultValue: number;
}) {
    const [open, setOpen] = React.useState(false);

    const service = new BookingService();
    const form = useForm<UpdatePaymentType>({
        resolver: zodResolver(createUpdatePaymentSchema(total)),
        defaultValues: {
            amount_paid: defaultValue,
        },
    });
    const mutation = useMutation({
        mutationKey: ["update-booking-payment"],
        mutationFn: async (data: UpdatePaymentType) =>
            await service.payment(bookingId, data.amount_paid),
        onMutate: () => {
            toast.loading("Salvando pagamento...");
        },
        onError: (error) => {
            console.error(error);
            toast.dismiss();
            toast.error("Erro ao salvar pagamento");
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });

            setOpen(false);
            toast.dismiss();
            toast.success("Pagamento salvo com sucesso");
        },
    });

    function handleUpdatePayment(data: UpdatePaymentType) {
        mutation.mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    disabled={status === "NOT_INITIATED"}
                    className={"w-full flex-1"}
                    type="button"
                >
                    Informar Pagamento
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className={"text-start"}>
                    <DialogTitle>Informar pagamento da reserva</DialogTitle>
                    <DialogDescription>
                        Digite um valor menor ou igual ao valor total da reserva
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(handleUpdatePayment)}
                    className={"space-y-4"}
                >
                    <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                        <Label htmlFor="amount_paid" className="text-right">
                            Valor pago
                        </Label>

                        <div className="col-span-3 flex items-center gap-2 text-xs">
                            R$
                            <Input
                                {...form.register("amount_paid")}
                                defaultValue={defaultValue}
                                id="amount_paid"
                            />
                        </div>

                        <p
                            className={
                                "col-span-full text-[0.8rem] font-medium text-destructive"
                            }
                        >
                            {form.formState.errors.amount_paid?.message}
                        </p>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
