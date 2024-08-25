import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomersList } from "@/app/(private)/clientes/components/customers-list";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function CustomersPage() {
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

            <CustomersList />
        </section>
    );
}
