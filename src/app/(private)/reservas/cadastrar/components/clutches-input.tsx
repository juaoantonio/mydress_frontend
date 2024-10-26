import { UseFormReturn } from "react-hook-form";
import { SelectMultipleInput } from "@/components/select-multiple-input/select-multiple-input";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ClutchService } from "@/services/products/clutch.service";
import { cn } from "@/lib/utils";

export function ClutchesInput({
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
    const clutchService = new ClutchService();
    const {
        isPending,
        isError,
        data: clutches,
    } = useQuery({
        enabled: !!start_date && !!end_date,
        queryKey: ["clutches", start_date, end_date],
        queryFn: () =>
            clutchService.getAllAvailableBetweenDates({ start_date, end_date }),
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
                fieldName={"clutches"}
                loading={isPending}
                error={isError}
                errorMessage={"Erro ao buscar bolsas"}
                options={
                    clutches &&
                    clutches.map(({ id, imagePath }) => ({
                        id,
                        img: imagePath,
                    }))
                }
            />
        </div>
    );
}
