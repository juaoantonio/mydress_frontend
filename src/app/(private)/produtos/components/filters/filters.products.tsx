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
import { ProductFilters } from "./filters.products.types";
import { FilterAvailableProducts } from "./filter-available.products";
import { FilterProductsByDate } from "./filter-by-date.products";
import useProductFilterParams from "../../hooks/filter-params";

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

    function handleApplyFilters() {
        const queryString = createQueryString(filters);
        router.push(`${pathname}?${queryString}`);
        handleClose();
    }

    const invalidFilter =
        (filters.available && !filters.start_date) || !filters.end_date;

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

                <>
                    <FilterProductsByDate
                        value={filters.start_date}
                        setFilters={setFilters}
                        title="Data inicial"
                        param="start_date"
                    />

                    <FilterProductsByDate
                        value={filters.end_date}
                        setFilters={setFilters}
                        title="Data final"
                        param="end_date"
                    />
                </>
            </div>

            <DrawerFooter>
                <Button disabled={!!invalidFilter} onClick={handleApplyFilters}>
                    Aplicar Filtros
                </Button>
                <DrawerClose asChild>
                    <Button variant="outline">Cancelar</Button>
                </DrawerClose>
            </DrawerFooter>
        </div>
    );
}
