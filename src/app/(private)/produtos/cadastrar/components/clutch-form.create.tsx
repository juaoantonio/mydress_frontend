"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createClutchSchema } from "@/schemas/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import React, { useState } from "react";
import { ImagePlaceholder } from "@/components/image-placeholder/image-placeholder";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClutchService } from "@/services/products/clutch.service";
import { CreateClutchInputDTO } from "@/services/products/clutch.dto";
import { getSession } from "next-auth/react";

type ClutchFormType = z.infer<typeof createClutchSchema>;

function handleClutchCreationError(
    error: unknown,
    form: UseFormReturn<ClutchFormType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao criar o bolsa",
        (message) => "A imagem deve ser do tipo jpeg, jpg, png ou webp",
    );
}

export function ClutchFormCreate() {
    const [preview, setPreview] = useState<string | undefined>();

    const form = useForm<ClutchFormType>({
        resolver: zodResolver(createClutchSchema),
        defaultValues: {
            image: null,
            rentPrice: 100.5,
            color: "",
            model: "",
        },
    });
    const router = useRouter();

    const service = new ClutchService();
    const mutation = useMutation({
        mutationFn: (data: CreateClutchInputDTO) => service.create({ data }),
        onError: (error) => {
            console.error(error);
            handleClutchCreationError(error, form);
        },
        onSuccess: () => {
            toast.success("Bolsa criada com sucesso!");
            router.back();
        },
    });

    async function handleClutchCreation(data: ClutchFormType) {
        const session = await getSession();

        if (!session) {
            toast.error(
                "Você precisa estar logado para criar uma nova reserva!",
            );
            return;
        }

        mutation.mutate(data as CreateClutchInputDTO);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleClutchCreation)}
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
