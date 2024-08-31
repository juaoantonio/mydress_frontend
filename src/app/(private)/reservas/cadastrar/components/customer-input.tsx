import React from "react";
import { Control } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { CustomerService } from "@/services/customers/customer.service";
import { SelectWithAdd } from "@/components/select-with-add/select-with-add";

export function CustomerInput({ control }: { control: Control<any> }) {
    const customerService = new CustomerService();
    const {
        isPending,
        isError,
        data: customers,
    } = useQuery({
        queryKey: ["customers"],
        queryFn: () => customerService.getAll(),
    });

    return (
        <SelectWithAdd
            control={control}
            name={"customer"}
            label={"Selecionar Cliente"}
            placeholder={"Selecione um cliente"}
            options={
                customers &&
                customers.map((customer) => ({
                    value: customer.id,
                    label: customer.name,
                }))
            }
            addActionLink={"/clientes/cadastrar"}
            addActionMessage={"Criar cliente"}
            loading={isPending}
            error={isError}
        />
    );
}
