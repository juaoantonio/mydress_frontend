import { customersService } from "@/services/customers/customers.service";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CustomerCard } from "@/app/(private)/clientes/components/customer-card";

export default async function CustomersPage() {
  const session = await auth();
  if (!session) return null;

  const customers = await customersService.listAll(session.user.access);

  return (
    <section>
      <div className={"mb-4 flex items-center justify-between"}>
        <h1 className={"text-xl font-semibold"}>Clientes Cadastrados</h1>
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
