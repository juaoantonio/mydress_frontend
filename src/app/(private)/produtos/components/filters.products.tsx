import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "@/hooks/use-create-query-string";
import React, { useState } from "react";
import {
    DrawerClose,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ProductFilters } from "./filters/filters.products.types";
import { FilterByDateProducts } from "./filters/filter-by-date.products";
import { FilterAvailableProducts } from "./filters/filter-available.products";

export function Filters({ handleClose }: { handleClose: () => void }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const createQueryString = useCreateQueryString();

    const available = searchParams.get("available") ?? "";

    const start_date = searchParams.get("start_date")
        ? searchParams.get("start_date") + "T00:00:00"
        : "";

    const end_date = searchParams.get("end_date")
        ? searchParams.get("end_date") + "T00:00:00"
        : "";

    const [filters, setFilters] = useState<ProductFilters>({
        available,
        start_date,
        end_date,
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

                {filters.available && (
                    <>
                        <FilterByDateProducts
                            value={filters.start_date}
                            setFilters={setFilters}
                            title="Data inicial"
                            param="start_date"
                        />

                        <FilterByDateProducts
                            value={filters.end_date}
                            setFilters={setFilters}
                            title="Data final"
                            param="end_date"
                        />
                    </>
                )}
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
