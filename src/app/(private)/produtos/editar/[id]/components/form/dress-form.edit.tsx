"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { editDressSchema } from "@/schemas/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DressService } from "@/services/products/dress.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UpdateDressInputDto } from "@/services/products/dress.dto";
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
import { IBaseProductEditionInputProps } from "../../interfaces/base.interface";

type DressFormType = Partial<z.infer<typeof editDressSchema>>;

function handleDressEditError(
    error: unknown,
    form: UseFormReturn<DressFormType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao editar vestido",
        () => "A imagem deve ser do tipo jpeg, jpg, png ou webp",
    );
}

export function DressFormEdit({ id }: IBaseProductEditionInputProps) {
    const [preview, setPreview] = useState<string | undefined>();

    const service = new DressService();

    const router = useRouter();

    const { data } = useQuery({
        queryKey: ["dresses", id],
        queryFn: () =>
            service.getById({
                id,
            }),
    });

    const form = useForm<DressFormType>({
        resolver: zodResolver(editDressSchema),
    });

    const mutation = useMutation({
        mutationFn: (data: UpdateDressInputDto) =>
            service.updateById({ data, id }),
        onMutate: async () => toast.loading("Editando vestido..."),
        onError: (error) => {
            toast.dismiss();
            toast.error("Erro ao editar vestido");
            handleDressEditError(error, form);
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Vestido editado com sucesso!");
            router.back();
        },
    });

    async function handleDressEdit(data: DressFormType) {
        mutation.mutate(data);
    }

    useEffect(() => {
        if (data) {
            form.setValue("color", data.color);
            form.setValue("model", data.model);
            form.setValue("rentPrice", data.rentPrice);
            form.setValue("fabric", data.fabric);
        }
    }, [data]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleDressEdit)}
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
                                                    alt={"Imagem do vestido"}
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
                                            placeholder={"0,00"}
                                            id={"rentPrice"}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"model"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"model"}>
                                    Modelo do Vestido
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

                    <FormField
                        control={form.control}
                        name={"fabric"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"fabric"}>
                                    Tecido do Vestido
                                </FormLabel>
                                <FormControl>
                                    <Input id={"fabric"} {...field} />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.fabric?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"color"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"color"}>Cor</FormLabel>
                                <FormControl>
                                    <Input id={"color"} {...field} />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.color?.message}
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
