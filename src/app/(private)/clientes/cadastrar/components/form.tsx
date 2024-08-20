"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createCustomerSchema } from "@/schemas/customer.schemas";
import { toast } from "sonner";
import { CustomerService } from "@/services/customers/customer.service";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { InputType } from "@/types/input.types";
import { useMutation } from "@tanstack/react-query";
import { handleCreationFormError } from "@/lib/utils";

const inputs: InputType<typeof createCustomerSchema>[] = [
    {
        field: "name",
        label: "Nome",
        inputComponentRender: (props) => <Input {...props} />,
    },
    {
        field: "email",
        label: "Email",
        placeholder: "fulano@gmail.com",
        inputComponentRender: (props) => <Input {...props} />,
    },
    {
        field: "cpf",
        label: "CPF",
        placeholder: "00011122289",
        inputComponentRender: (props) => <Input {...props} />,
    },
    {
        field: "rg",
        label: "RG",
        placeholder: "7001112",
        inputComponentRender: (props) => <Input {...props} />,
    },
    {
        field: "address",
        label: "Endereço",
        inputComponentRender: (props) => <Input {...props} />,
    },

    {
        field: "phone",
        label: "Telefone",
        placeholder: "91999221212 ",
        inputComponentRender: (props) => <Input {...props} />,
    },
];

type CustomerFormSchemaType = z.infer<typeof createCustomerSchema>;

function handleCustomerCreationError(
    error: unknown,
    form: UseFormReturn<CustomerFormSchemaType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao cadastrar cliente",
        (message) => message.replace("customer", "Cliente"),
    );
}

export function CreateCustomerForm() {
    const router = useRouter();
    const form = useForm<CustomerFormSchemaType>({
        resolver: zodResolver(createCustomerSchema),
        defaultValues: {
            name: "",
            email: "",
            cpf: "",
            rg: "",
            address: "",
            phone: "",
            notes: "",
        },
    });

    const service = new CustomerService();
    const mutation = useMutation({
        mutationFn: (data: CustomerFormSchemaType) => service.create(data),
        onMutate: () => toast.loading("Salvando cliente"),
        onError: (error) => {
            toast.dismiss();
            toast.error(error.message);
            console.error(error);

            handleCustomerCreationError(error, form);
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Cliente cadastrado com sucesso!");
            router.back();
        },
    });

    async function onSubmit(data: CustomerFormSchemaType) {
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
                onSubmit={form.handleSubmit(onSubmit)}
                className={"space-y-4"}
            >
                <div className={"grid gap-3 lg:grid-cols-2 lg:gap-4"}>
                    {inputs.map((input) => (
                        <FormField
                            key={input.field}
                            control={form.control}
                            name={input.field}
                            render={({ field }) => (
                                <FormItem className={"space-y-1"}>
                                    <FormLabel>{input.label}</FormLabel>
                                    <FormControl>
                                        {input.inputComponentRender({
                                            placeholder: input.placeholder,
                                            ...field,
                                        })}
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <FormField
                        control={form.control}
                        name={"notes"}
                        render={({ field }) => (
                            <FormItem className={"col-span-full"}>
                                <FormLabel>Observações</FormLabel>
                                <FormControl>
                                    <Textarea rows={6} {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className={"flex justify-between gap-2"}>
                    <Button
                        type={"button"}
                        variant={"outline"}
                        className={"flex-1"}
                    >
                        <Link href={"/clientes"}>Cancelar</Link>
                    </Button>
                    <Button
                        type={"submit"}
                        disabled={form.formState.isSubmitting}
                        className={"flex-1"}
                    >
                        {form.formState.isSubmitting
                            ? "Carregando..."
                            : "Cadastrar"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
