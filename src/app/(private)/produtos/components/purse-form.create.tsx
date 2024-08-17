"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createPurseSchema } from "@/schemas/products.schema";
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
import { ImagePlaceholder } from "@/components/image-placeholder";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PurseService } from "@/services/products/purse.service";
import { CreatePurseInputDTO } from "@/services/products/purse.dto";
import { getSession } from "next-auth/react";

type PurseFormType = z.infer<typeof createPurseSchema>;

function handlePurseCreationError(
    error: unknown,
    form: UseFormReturn<PurseFormType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao criar o bolsa",
        (message) => "A imagem deve ser do tipo jpeg, jpg, png ou webp",
    );
}

export function PurseFormCreate() {
    const [preview, setPreview] = useState<string | undefined>();

    const form = useForm<PurseFormType>({
        resolver: zodResolver(createPurseSchema),
        defaultValues: {
            img: null,
            price: 100.5,
            description: "",
            purchasable: false,
            rentable: true,
            color: "",
            model: "",
            status: "AVAILABLE",
        },
    });
    const router = useRouter();

    const service = new PurseService();
    const mutation = useMutation({
        mutationFn: (data: CreatePurseInputDTO) => service.create(data),
        onError: (error) => {
            console.error(error);
            handlePurseCreationError(error, form);
        },
        onSuccess: () => {
            toast.success("Bolsa criada com sucesso!");
            router.back();
        },
    });

    async function handlePurseCreation(data: PurseFormType) {
        const session = await getSession();

        if (!session) {
            toast.error(
                "Você precisa estar logado para criar uma nova reserva!",
            );
            return;
        }

        mutation.mutate(data as CreatePurseInputDTO);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handlePurseCreation)}
                className={"space-y-4"}
            >
                <div className={"grid gap-3 lg:grid-cols-2 lg:gap-4"}>
                    <FormField
                        control={form.control}
                        name="img"
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
                                                            "img",
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
                        name={"price"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"price"}>
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
                                            id={"price"}
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.price?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"description"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor={"description"}>
                                    Descrição da Bolsa
                                </FormLabel>
                                <FormControl>
                                    <Input id={"description"} {...field} />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.description?.message}
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

                    <FormField
                        control={form.control}
                        name={"status"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select {...field}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione um status" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Status
                                                </SelectLabel>
                                                <SelectItem value="AVAILABLE">
                                                    Disponível
                                                </SelectItem>
                                                <SelectItem value="OUT_OF_STOCK">
                                                    Sem estoque
                                                </SelectItem>
                                                <SelectItem value="DAMAGED">
                                                    Danificado
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.status?.message}
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
