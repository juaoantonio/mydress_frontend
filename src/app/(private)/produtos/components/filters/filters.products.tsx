import { usePathname, useRouter } from "next/navigation";
import { useCreateQueryString } from "@/hooks/use-create-query-string";
import React, { useState } from "react";
import {
    DrawerClose,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ProductAvailability, ProductFilters } from "./filters.products.types";
import { FilterAvailableProducts } from "./filter-available.products";
import { FilterProductsByDate } from "./filter-by-date.products";
import useProductFilterParams from "../../hooks/filter-params";
import { Switch } from "@/components/ui/switch";

export function Filters({ handleClose }: { handleClose: () => void }) {
    const router = useRouter();
    const pathname = usePathname();
    const createQueryString = useCreateQueryString();

    const { available, endDate, startDate } = useProductFilterParams();

    const [filters, setFilters] = useState<ProductFilters>({
        available,
        start_date: startDate,
        end_date: endDate,
    });
    const [useDateRange, setUseDateRange] = useState(false);

    function handleApplyFilters() {
        const queryString = createQueryString({
            ...filters,
            end_date: useDateRange ? filters.end_date : filters.start_date,
        });
        router.push(`${pathname}?${queryString}`);
        handleClose();
    }

    function clearQueryParams() {
        setFilters({
            available: ProductAvailability.Undefined,
            end_date: "",
            start_date: "",
        });
        setUseDateRange(false);
        const cleanUrl = pathname;
        router.replace(cleanUrl, undefined);
    }

    const invalidFilter =
        ["true", "false"].includes(filters.available) &&
        (!filters.start_date || (useDateRange && !filters.end_date));

    return (
        <div>
            <DrawerHeader>
                <DrawerTitle className={"text-left"}>Filtros</DrawerTitle>
            </DrawerHeader>

            <div className={"space-y-5 p-4 pb-6"}>
                <FilterAvailableProducts
                    value={filters.available}
                    setFilters={setFilters}
                />

                <div className="flex items-center space-x-2">
                    <label htmlFor="useDateRange">Intervalo de datas</label>
                    <Switch
                        id="useDateRange"
                        checked={useDateRange}
                        onCheckedChange={setUseDateRange}
                    />
                </div>

                <FilterProductsByDate
                    value={filters.start_date}
                    setFilters={setFilters}
                    title="Data inicial"
                    param="start_date"
                />

                {useDateRange && (
                    <FilterProductsByDate
                        value={filters.end_date}
                        setFilters={setFilters}
                        title="Data final"
                        param="end_date"
                    />
                )}
            </div>

            <DrawerFooter>
                <Button disabled={!!invalidFilter} onClick={handleApplyFilters}>
                    Aplicar Filtros
                </Button>
                <Button onClick={clearQueryParams} variant="outline">
                    Limpar Filtros
                </Button>
                <DrawerClose asChild>
                    <Button variant="outline">Cancelar</Button>
                </DrawerClose>
            </DrawerFooter>
        </div>
    );
}
