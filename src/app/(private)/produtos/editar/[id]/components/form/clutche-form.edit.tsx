"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { editClutcheSchema } from "@/schemas/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getImageData, handleCreationFormError } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { ImagePlaceholder } from "@/components/image-placeholder/image-placeholder";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PurseService } from "@/services/products/purse.service";
import { UpdateClutcheInputDto } from "@/services/products/purse.dto";
import { IBaseProductEditionInputProps } from "../../interfaces/base.interface";

type PurseFormType = Partial<z.infer<typeof editClutcheSchema>>;

function handleClutcheError(
    error: unknown,
    form: UseFormReturn<PurseFormType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao editar bolsa",
        (message) => "A imagem deve ser do tipo jpeg, jpg, png ou webp",
    );
}

export function ClutcheFormEdit({ id }: IBaseProductEditionInputProps) {
    const [preview, setPreview] = useState<string | undefined>();

    const { data } = useQuery({
        queryKey: ["clutches", id],
        queryFn: () =>
            service.getById({
                id,
            }),
    });

    const router = useRouter();

    const service = new PurseService();

    const form = useForm<PurseFormType>({
        resolver: zodResolver(editClutcheSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: UpdateClutcheInputDto) =>
            service.updateById({ data, id }),
        onError: (error) => {
            handleClutcheError(error, form);
        },
        onSuccess: () => {
            toast.success("Bolsa editada com sucesso!");
            router.back();
        },
    });

    async function handleClutcheEdit(data: PurseFormType) {
        mutation.mutate(data);
    }

    useEffect(() => {
        if (data) {
            form.setValue("color", data.color);
            form.setValue("image", data.imagePath);
            form.setValue("model", data.model);
            form.setValue("rentPrice", data.rentPrice);
        }
    }, [data]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleClutcheEdit)}
                className={"space-y-4"}
            >
                <div className={"grid gap-3 lg:grid-cols-2 lg:gap-4"}>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange, value, ...rest } }) => {
                            return (
                                <FormItem>
                                    <FormLabel htmlFor={"dress-file"}>
                                        {preview ? (
                                            <div className={"relative"}>
                                                <Image
                                                    className={
                                                        "aspect-square w-full rounded-md object-cover object-center"
                                                    }
                                                    src={preview}
                                                    alt={"Imagem da Bolsa"}
                                                    width={200}
                                                    height={200}
                                                />
                                                <Button
                                                    variant={"destructive"}
                                                    className={
                                                        "absolute right-3 top-3 aspect-square w-9 flex-1 p-2"
                                                    }
                                                    onClick={() => {
                                                        form.setValue(
                                                            "image",
                                                            null,
                                                        );
                                                        setPreview(undefined);
                                                        form.clearErrors();
                                                    }}
                                                >
                                                    <X size={20} />
                                                </Button>
                                            </div>
                                        ) : (
                                            <ImagePlaceholder
                                                description={
                                                    "Clique para adicionar uma imagem"
                                                }
                                            />
                                        )}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className={
                                                "pointer-events-none hidden"
                                            }
                                            id={"dress-file"}
                                            type="file"
                                            {...rest}
                                            onChange={(event) => {
                                                const imageData =
                                                    getImageData(event);
                                                if (!imageData) return;
                                                setPreview(
                                                    imageData.displayUrl,
                                                );
                                                onChange(imageData.files[0]);
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Tente enviar imagens que sejam de mesma
                                        altura e largura
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />

                    <FormField
                        control={form.control}
                        name={"rentPrice"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"rentPrice"}>
                                    Preço de Aluguel
                                </FormLabel>
                                <FormControl>
                                    <div
                                        className={
                                            "flex items-center gap-1.5 text-sm font-medium"
                                        }
                                    >
                                        R$
                                        <Input
                                            type={"number"}
                                            id={"rentPrice"}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.rentPrice?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"color"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"color"}>
                                    Cor da Bolsa
                                </FormLabel>
                                <FormControl>
                                    <Input id={"color"} {...field} />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.color?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"model"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"model"}>
                                    Modelo da bolsa
                                </FormLabel>
                                <FormControl>
                                    <Input id={"model"} {...field} />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.model?.message}
                                </FormMessage>
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
                    <Button className={"flex-1"} type={"submit"}>
                        Salvar
                    </Button>
                </div>
            </form>
        </Form>
    );
}
