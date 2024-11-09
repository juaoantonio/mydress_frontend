"use client";

import React, { Fragment } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { BookingDressItemType } from "@/types/booking.types";
import {
    BookingService,
    IAdjustments,
} from "@/services/bookings/booking.service";

const createAdjustmentsSchema = z.object({
    adjustments: z.array(
        z.object({
            label: z.string(),
            description: z.string(),
            dressId: z.string(),
        }),
    ),
});
export type CreateAdjustmentsFormType = z.infer<typeof createAdjustmentsSchema>;

export function CreateAdjustmentsForm({
    dresses,
    bookingId,
}: {
    dresses: BookingDressItemType[];
    bookingId: string;
}) {
    const router = useRouter();
    const form = useForm<CreateAdjustmentsFormType>({
        resolver: zodResolver(createAdjustmentsSchema),
        defaultValues: {
            adjustments: dresses.flatMap((dress) =>
                dress.adjustments.map((adjustment) => ({
                    ...adjustment,
                    dressId: dress.productId,
                })),
            ),
        },
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "adjustments",
    });

    function addNewAdjustment(dressId: string) {
        append({
            label: "",
            description: "",
            dressId: dressId,
        });
    }
    const bookingService = new BookingService();
    const mutation = useMutation({
        mutationFn: (data: CreateAdjustmentsFormType) => {
            return bookingService.adjustments(bookingId, data as IAdjustments);
        },
        onMutate: () => toast.loading("Salvando ajustes"),
        onError: (error) => {
            console.error(error);
            toast.dismiss();
            toast.error("Erro ao salvar ajustes");
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Ajustes salvos com sucesso");
            router.back();
        },
    });

    async function handleAdjustmentCreation(data: CreateAdjustmentsFormType) {
        const session = await getSession();

        if (!session) {
            toast.error("Você precisa estar logado para cadastrar um cliente!");
            return;
        }

        mutation.mutate(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleAdjustmentCreation)}
                className={"space-y-4"}
            >
                {dresses.map((dress, index) => (
                    <Fragment key={dress.id}>
                        {index !== 0 && <Separator className={"my-4"} />}
                        <div className={"space-y-5 rounded border p-3"}>
                            <label
                                className={
                                    "flex items-center justify-between font-semibold"
                                }
                            >
                                Ajustes{" "}
                                <Button
                                    className={"aspect-square h-9 p-1"}
                                    onClick={() =>
                                        addNewAdjustment(dress.productId)
                                    }
                                    type={"button"}
                                >
                                    <Plus size={24} />
                                </Button>
                            </label>

                            {fields.map((field, index) => {
                                if (field.dressId !== dress.productId) return;

                                return (
                                    <div
                                        key={field.id}
                                        className={"flex gap-2"}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Rótulo"
                                            className={"flex-1"}
                                            {...form.register(
                                                `adjustments.${index}.label`,
                                            )}
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Descrição"
                                            className={"flex-1"}
                                            {...form.register(
                                                `adjustments.${index}.description`,
                                            )}
                                        />
                                        <Button
                                            className={
                                                "aspect-square h-9 bg-red-500 p-1 text-sm"
                                            }
                                            onClick={() => {
                                                remove(index);
                                            }}
                                        >
                                            <Minus size={24} />
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </Fragment>
                ))}

                <div className={"flex gap-2"}>
                    <Button
                        className={"flex-1"}
                        type={"submit"}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
