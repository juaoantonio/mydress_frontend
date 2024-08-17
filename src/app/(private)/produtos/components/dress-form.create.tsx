"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { createDressSchema } from "@/schemas/products.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DressService } from "@/services/products/dress.service";
import { useMutation } from "@tanstack/react-query";
import { CreateDressInputDTO } from "@/services/products/dress.dto";
import { handleCreationFormError } from "@/lib/utils";
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
import React, { ChangeEvent, useState } from "react";
import { ImagePlaceholder } from "@/components/image-placeholder";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type DressFormType = z.infer<typeof createDressSchema>;

function handleDressCreationError(
    error: unknown,
    form: UseFormReturn<DressFormType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao criar o vestido",
        (message) => "A imagem deve ser do tipo jpeg, jpg, png ou webp",
    );
}

function getImageData(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const dataTransfer = new DataTransfer();

    Array.from(event.target.files).forEach((image) =>
        dataTransfer.items.add(image),
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
}

export function DressFormCreate() {
    const [preview, setPreview] = useState<string | undefined>();

    const form = useForm<DressFormType>({
        resolver: zodResolver(createDressSchema),
        defaultValues: {
            img: null,
            price: 1,
            description: "",
            purchesable: false,
            rentable: true,
            fabric: "",
            color: "",
            availableForAdjustment: false,
            status: "AVAILABLE",
        },
    });
    const router = useRouter();

    const service = new DressService();
    const mutation = useMutation({
        mutationFn: (data: CreateDressInputDTO) => service.create(data),
        onError: (error) => {
            handleDressCreationError(error, form);
        },
        onSuccess: () => {
            toast.success("Vestido criado com sucesso!");
            router.back();
        },
    });

    function handleDressCreation(data: DressFormType) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleDressCreation)}
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
                                            <ImagePlaceholder />
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
