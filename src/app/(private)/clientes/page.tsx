import { CustomerService } from "@/services/customers/customer.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomerCard } from "@/app/(private)/clientes/components";
import { cache } from "react";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
    const customersService = new CustomerService();
    const customers = await cache(
        async () => await customersService.getAll(),
    )();

    return (
        <section>
            <div className={"mb-4 mt-2 flex items-center justify-between"}>
                <h1 className={"text-xl font-semibold"}>Clientes</h1>
                <Link href={"/clientes/cadastrar"}>
                    <Button size={"sm"} className={"gap-1"}>
                        <Plus size={18} />
                        Adicionar Cliente
                    </Button>
                </Link>
            </div>
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
        </section>
    );
}
