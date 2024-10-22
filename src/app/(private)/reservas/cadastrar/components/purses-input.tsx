import { UseFormReturn } from "react-hook-form";
import { SelectMultipleInput } from "@/components/select-multiple-input/select-multiple-input";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PurseService } from "@/services/products/purse.service";
import { cn } from "@/lib/utils";

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
        enabled: !!start_date && !!end_date,
        queryKey: ["purses", start_date, end_date],
        queryFn: () =>
            purseService.getAllAvailableBetweenDates({ start_date, end_date }),
    });

    return (
        <div
            className={cn(
                disabled && "pointer-events-none cursor-not-allowed opacity-70",
            )}
        >
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
                    purses.map(({ id, imagePath }) => ({
                        id,
                        img: imagePath,
                    }))
                }
            />
        </div>
    );
}
