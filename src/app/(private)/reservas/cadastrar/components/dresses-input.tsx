import { UseFormReturn } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { DressService } from "@/services/products/dress.service";
import { useQuery } from "@tanstack/react-query";
import { cn, numberToCurrency } from "@/lib/utils";
import { useQueryParams } from "@/hooks/use-query-params";
import { SelectMultipleProducts } from "@/components/select-multiple-input/select-multiple-products";
import ShowSelectedProducts from "./show-products";
import { BookingItemsType } from "@/schemas/booking.schemas";
import useUniqueSelectedProducts from "@/hooks/use-unique-selected-products";
import { BookingType } from "@/types/booking.types";

interface Props {
    available?: boolean;
    form: UseFormReturn<BookingItemsType>;
    start_date?: string | null;
    end_date?: string | null;
    disabled?: boolean;
    booking: BookingType;
}

export function DressesInput({
    form,
    start_date,
    end_date,
    available,
    booking,
    disabled = false,
}: Props) {
    const dressService = new DressService();
    const [search, setSearch] = useState("");

    const { page, limit } = useQueryParams({ page: 1, limit: 10 });
    const [currentPage, setCurrentPage] = useState(page);

    const { isPending, isError, data } = useQuery({
        enabled: !!start_date && !!end_date,
        queryKey: [
            "dresses",
            start_date,
            end_date,
            available,
            booking,
            search,
            page,
            limit,
        ],
        staleTime: 0,
        queryFn: () =>
            dressService.getAll({
                filters: {
                    startDate: start_date,
                    endDate: end_date,
                    available,
                    page,
                    limit,
                    name: search,
                    bookingId: booking.id,
                },
            }),
    });
    const dresses = form.watch("dresses");

    const items = useUniqueSelectedProducts(
        {
            items: data?.items,
        },
        dresses.map((dress) => dress.dressId),
    );

    useEffect(() => {
        form.setValue(
            "dresses",
            booking.dresses.map((dress) => ({ dressId: dress.productId })),
        );
    }, [form, booking]);

    return (
        <div
            className={cn(
                "space-y-2",
                disabled && "pointer-events-none cursor-not-allowed opacity-70",
            )}
        >
            <ShowSelectedProducts items={items} title="Vestidos selecionados" />

            <SelectMultipleProducts
                data={data}
                searchName="Pesquisar Vestido"
                searchHandler={setSearch}
                reloadPageOnClose
                triggerText="Adicionar vestidos"
                pageHandler={setCurrentPage}
                page={currentPage}
                form={form}
                fieldName="dresses"
                loading={isPending}
                error={isError}
                errorMessage="Erro ao buscar vestidos"
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
