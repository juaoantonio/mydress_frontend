import { UseFormReturn } from "react-hook-form";
import { SelectMultipleInput } from "@/components/select-multiple-input";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PurseService } from "@/services/products/purse.service";

export function PursesInput({
    form,
    start_date,
    end_date,
    disabled = false,
}: {
    form: UseFormReturn<any>;
    start_date?: Date | null;
    end_date?: Date | null;
    disabled?: boolean;
}) {
    const purseService = new PurseService();
    const {
        isPending,
        isError,
        data: purses,
    } = useQuery({
        queryKey: ["purses"],
        queryFn: purseService.getAll,
    });

    return (
        <SelectMultipleInput
            label={"Selecionar bolsas"}
            triggerText={"Adicionar bolsas"}
            form={form}
            fieldName={"purses"}
            loading={isPending}
            error={isError}
            errorMessage={"Erro ao buscar bolsas"}
            options={
                purses &&
                purses.map(({ id, description, img }) => ({
                    id,
                    description,
                    img,
                }))
            }
        />
    );
}
