import { UseFormReturn } from "react-hook-form";
import { dresses } from "@/app/(private)/reservas/cadastrar/components/mocks";
import { SelectMultipleInput } from "@/components/select-multiple-input";
import React from "react";
import { DressService } from "@/services/products/dress.service";
import { useQuery } from "@tanstack/react-query";

export function DressesInput({ form }: { form: UseFormReturn<any> }) {
  const dressService = new DressService();
  const {
    isPending,
    isError,
    error,
    data: dresses,
  } = useQuery({
    queryKey: ["dresses"],
    queryFn: dressService.getAll,
  });

  return (
    <SelectMultipleInput
      label={"Selecionar vestidos"}
      triggerText={"Adicionar vestidos"}
      form={form}
      fieldName={"dresses"}
      loading={isPending}
      error={isError}
      errorMessage={"Erro ao buscar vestidos"}
      options={
        dresses &&
        dresses.map(({ id, description, img }) => ({
          id,
          description,
          img,
        }))
      }
    />
  );
}
