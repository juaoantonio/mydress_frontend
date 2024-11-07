import { UseFormReturn } from "react-hook-form";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClutchService } from "@/services/products/clutch.service";
import { cn, numberToCurrency } from "@/lib/utils";
import { useQueryParams } from "@/hooks/use-query-params";
import { SelectMultipleInputWithPagination } from "@/components/select-multiple-input/select-multiple-input-with-pagination";
import ShowSelectedProducts from "./show-products";
import { BookingItemsType } from "@/schemas/booking.schemas";
import useUniqueSelectedProducts from "@/hooks/use-unique-selected-products";

interface Props {
    form: UseFormReturn<BookingItemsType>;
    available?: boolean;
    start_date?: string | null;
    end_date?: string | null;
    disabled?: boolean;
}

export function ClutchesInput({
    form,
    start_date,
    end_date,
    disabled = false,
    available,
}: Props) {
    const clutchService = new ClutchService();

    const [search, setSearch] = useState("");

    const { page, limit } = useQueryParams({
        page: 1,
        limit: 10,
    });

    const [currentPageStartRange, setCurrentPageStartRange] = useState(page);

    const { isPending, isError, data } = useQuery({
        enabled: !!start_date && !!end_date,
        queryKey: [
            "clutches",
            start_date,
            end_date,
            available,
            search,
            page,
            limit,
        ],
        queryFn: () =>
            clutchService.getAll({
                filters: {
                    startDate: start_date,
                    search,
                    limit,
                    endDate: end_date,
                    available,
                    page,
                },
            }),
    });

    const clutchIds = form.watch("clutchIds");

    const items = useUniqueSelectedProducts(
        {
            items: data?.items,
        },
        clutchIds,
    );

    return (
        <div
            className={cn(
                disabled && "pointer-events-none cursor-not-allowed opacity-70",
            )}
        >
            <ShowSelectedProducts items={items} title="Bolsas selecionadas" />

            <SelectMultipleInputWithPagination
                label={"Selecionar bolsas"}
                data={data}
                triggerText={"Adicionar bolsas"}
                form={form}
                fieldName={"clutchIds"}
                reloadPageOnClose
                pageHandler={setCurrentPageStartRange}
                page={currentPageStartRange}
                searchName="Pesquisar Bolsa"
                searchHandler={setSearch}
                loading={isPending}
                error={isError}
                errorMessage={"Erro ao buscar bolsas"}
                options={
                    data &&
                    data.items.map(({ id, imagePath, name, rentPrice }) => ({
                        id,
                        img: imagePath,
                        description: `${name} - ${numberToCurrency(rentPrice)}`,
                    }))
                }
            />
        </div>
    );
}
