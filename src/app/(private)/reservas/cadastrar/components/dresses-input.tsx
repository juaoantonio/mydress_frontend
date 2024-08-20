import { UseFormReturn } from "react-hook-form";
import { dresses } from "@/app/(private)/reservas/cadastrar/components/mocks";
import { SelectMultipleInput } from "@/components/select-multiple-input";
import React from "react";
import { DressService } from "@/services/products/dress.service";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export function DressesInput({
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
    const dressService = new DressService();
    const {
        isPending,
        isError,
        error,
        data: dresses,
    } = useQuery({
        enabled: !!start_date && !!end_date,
        queryKey: ["dresses", start_date, end_date],
        queryFn: () =>
            dressService.getAllAvailableBetweenDates({ start_date, end_date }),
    });

    return (
        <div
            className={cn(
                disabled && "pointer-events-none cursor-not-allowed opacity-70",
            )}
        >
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
        </div>
    );
}
