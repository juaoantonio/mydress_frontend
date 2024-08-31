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
import { updateCustomerSchema } from "@/schemas/customer.schemas";
import { toast } from "sonner";
import { CustomerService } from "@/services/customers/customer.service";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { InputType } from "@/types/input.types";
import { useMutation } from "@tanstack/react-query";
import { handleCreationFormError } from "@/lib/utils";
import { CustomerType } from "@/types/customer.types";
import { queryClient } from "@/providers/react-query.provider";

const inputs: InputType<typeof updateCustomerSchema>[] = [
    {
        field: "name",
        label: "Nome",
        inputComponentRender: (props) => <Input {...props} />,
    },
    {
        field: "email",
        label: "Email",
        inputComponentRender: (props) => <Input {...props} />,
    },
    {
        field: "cpf",
        label: "CPF",
        inputComponentRender: (props) => <Input {...props} />,
    },
    {
        field: "rg",
        label: "RG",
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
        inputComponentRender: (props) => <Input {...props} />,
    },
];

type UpdateCustomerFormSchemaType = z.infer<typeof updateCustomerSchema>;

function handleCustomerUpdateError(
    error: unknown,
    form: UseFormReturn<UpdateCustomerFormSchemaType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao cadastrar cliente",
        (message) => message.replace("customer", "Cliente"),
    );
}

export function UpdateCustomerForm({
    customerId,
    previousData,
}: {
    customerId: string;
    previousData: CustomerType;
}) {
    const router = useRouter();
    const form = useForm<UpdateCustomerFormSchemaType>({
        resolver: zodResolver(updateCustomerSchema),
        defaultValues: previousData,
    });

    const service = new CustomerService();
    const mutation = useMutation({
        mutationFn: (data: UpdateCustomerFormSchemaType) =>
            service.updateById({ id: customerId, data }),

        onMutate: () => toast.loading("Atualizando cliente"),
        onError: (error) => {
            toast.dismiss();
            toast.error(error.message);
            console.error(error);

            handleCustomerUpdateError(error, form);
        },
        onSuccess: async () => {
            toast.dismiss();
            toast.success("Cliente atualizado com sucesso!");
            await queryClient.invalidateQueries({
                queryKey: ["customers", "customer", customerId],
            });
            router.back();
        },
    });

    async function onSubmit(data: UpdateCustomerFormSchemaType) {
        const session = await getSession();

        if (!session) {
            toast.error("Você precisa estar logado para atualizar um cliente!");
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
                        onClick={() => router.back()}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type={"submit"}
                        disabled={form.formState.isSubmitting}
                        className={"flex-1"}
                    >
                        {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
