import React from "react";
import { FilterProps } from "@/app/(private)/reservas/components/filters/filters.bookings.types";
import { useQuery } from "@tanstack/react-query";
import { CustomerService } from "@/services/customers/customer.service";
import { useDebounce } from "@/hooks/use-debounce";
import { AutoComplete } from "@/components/auto-complete/auto-complete";

export function FilterCustomerNameBookings({ value, setFilters }: FilterProps) {
    const customerService = new CustomerService();
    const debouncedValue = useDebounce(value, 800);

    const { data, isPending, isError } = useQuery({
        queryKey: ["customers", debouncedValue],
        queryFn: () => {
            return customerService.getAll({
                filters: { name: debouncedValue },
            });
        },
    });

    function handleChange(value: string) {
        setFilters((prev) => ({
            ...prev,
            customer_name: value,
        }));
    }

    function handleClear() {
        setFilters((prev) => ({
            ...prev,
            customer_name: "",
        }));
    }

    return (
        <AutoComplete
            value={value}
            label={"Cliente"}
            placeholder={"Digite o nome do cliente"}
            isPending={isPending}
            isError={isError}
            data={data}
            onChangeProperty={"name"}
            displayProperty={"name"}
            errorMessage={"Erro ao encontrar clientes"}
            handleChange={handleChange}
            handleClear={handleClear}
        />
    );
}
