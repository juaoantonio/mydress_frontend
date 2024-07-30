import { SelectWithAdd } from "@/components/select-with-add";
import React from "react";
import { Control } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { customersService } from "@/services/customers/customers.service";

export function EventInput({ control }: { control: Control<any> }) {
  const {
    isPending,
    isError,
    data: customers,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: customersService.listAll,
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
