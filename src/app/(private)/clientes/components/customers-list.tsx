"use client";

import { CustomerService } from "@/services/customers/customer.service";
import { CustomerCard } from "@/app/(private)/clientes/components/customer-card";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { toast } from "sonner";

export function CustomersList() {
    const customersService = new CustomerService();
    const {
        data: customers,
        isError,
        isPending,
    } = useQuery({
        queryKey: ["customers"],
        queryFn: () => customersService.getAll(),
    });

    if (isPending) {
        return (
            <div className={"flex h-[500px] items-center justify-center"}>
                <LoadingSpinner />
            </div>
        );
    }

    if (isError) {
        toast.error("Erro ao carregar clientes");
        return null;
    }

    return (
        <ul
            className={
                "grid auto-rows-fr items-stretch gap-2 md:grid-cols-2 lg:grid-cols-3"
            }
        >
            {customers.map((customer) => (
                <li key={customer.id}>
                    <CustomerCard customer={customer} />
                </li>
            ))}
        </ul>
    );
}
