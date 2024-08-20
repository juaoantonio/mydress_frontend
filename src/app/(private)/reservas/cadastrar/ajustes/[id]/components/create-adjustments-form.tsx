"use client";
import { DressType } from "@/types/products/dress.types";

import { ImageListItem } from "@/components/list";
import { numberToCurrency } from "@/lib/utils";
import React, { Fragment } from "react";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AdjustmentService } from "@/services/adjustments/adjustment.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { AdjustmentType } from "@/types/adjustment.types";

const createAdjustmentsSchema = z.object({
    adjustments: z.array(
        z.object({
            label: z.string(),
            description: z.string(),
            dress: z.string(),
            booking: z.string(),
        }),
    ),
});
type CreateAdjustmentsFormType = z.infer<typeof createAdjustmentsSchema>;

export function CreateAdjustmentsForm({
    dresses,
    bookingId,
    adjustments,
}: {
    dresses: DressType[];
    bookingId: string;
    adjustments: AdjustmentType[];
}) {
    const router = useRouter();
    const form = useForm<CreateAdjustmentsFormType>({
        resolver: zodResolver(createAdjustmentsSchema),
        defaultValues: {
            adjustments,
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
            dress: dressId,
            booking: bookingId,
        });
    }
    const adjustmentService = new AdjustmentService();
    const mutation = useMutation({
        mutationFn: (data: CreateAdjustmentsFormType) => {
            return adjustmentService.createMany({
                booking: bookingId,
                adjustments: data.adjustments,
            });
        },
        onMutate: () => toast.loading("Salvando ajustes"),
        onError: (error) => {
            console.error(error);
            toast.error("Erro ao salvar ajustes");
        },
        onSuccess: () => {
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
                            <ImageListItem
                                label={dress.description}
                                values={[
                                    {
                                        label: "Preço de aluguel",
                                        value: numberToCurrency(dress.price),
                                    },
                                    {
                                        label: "Disponível para ajuste",
                                        value: dress.available_for_adjustment
                                            ? "Sim"
                                            : "Não",
                                    },
                                    {
                                        label: "Cor",
                                        value: dress.color,
                                    },
                                    {
                                        label: "Modelo",
                                        value: dress.model,
                                    },
                                ]}
                                img={dress.img}
                                imgAlt={dress.description}
                            />
                            <label
                                className={
                                    "flex items-center justify-between font-semibold"
                                }
                            >
                                Ajustes{" "}
                                <Button
                                    className={"aspect-square h-9 p-1"}
                                    onClick={() => addNewAdjustment(dress.id)}
                                >
                                    <Plus size={24} />
                                </Button>
                            </label>

                            {fields.map((field, index) => {
                                if (field.dress !== dress.id) return;

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