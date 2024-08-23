import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import React, { useState } from "react";
import { BookingsFilters } from "@/app/(private)/reservas/components/filters/filters.bookings.types";
import {
    DrawerClose,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { FilterStatusBookings } from "@/app/(private)/reservas/components/filters/filter-status.bookings";
import { FilterCustomerNameBookings } from "@/app/(private)/reservas/components/filters/filter-customer-name.bookings";
import { FilterEventDateBookings } from "@/app/(private)/reservas/components/filters/filter-event-date.bookings";
import { Button } from "@/components/ui/button";

export function Filters({ handleClose }: { handleClose: () => void }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const createQueryString = useCreateQueryString();

    const status = searchParams.get("status") ?? "";

    const event_date = searchParams.get("event_date")
        ? searchParams.get("event_date") + "T00:00:00"
        : "";
    const customer_name = searchParams.get("customer_name") ?? "";

    const [filters, setFilters] = useState<BookingsFilters>({
        status,
        event_date,
        customer_name,
    });

    function handleApplyFilters() {
        const queryString = createQueryString(filters);
        router.push(`${pathname}?${queryString}`);
        handleClose();
    }

    return (
        <div>
            <DrawerHeader>
                <DrawerTitle className={"text-left"}>Filtros</DrawerTitle>
            </DrawerHeader>

            <div className={"space-y-3 p-4 pb-0"}>
                <FilterStatusBookings
                    value={filters.status}
                    setFilter={setFilters}
                />

                <FilterCustomerNameBookings
                    value={filters.customer_name}
                    setFilters={setFilters}
                />

                <FilterEventDateBookings
                    value={filters.event_date}
                    setFilters={setFilters}
                />
            </div>

            <DrawerFooter>
                <Button onClick={handleApplyFilters}>Aplicar Filtros</Button>
                <DrawerClose asChild>
                    <Button variant="outline">Cancelar</Button>
                </DrawerClose>
            </DrawerFooter>
        </div>
    );
}
