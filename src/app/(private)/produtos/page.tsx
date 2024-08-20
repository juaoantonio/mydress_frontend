import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ListProductsSection } from "@/app/(private)/produtos/components";

export default async function ListProductsPage() {
    return (
        <section className={"mt-2 flex flex-col gap-4"}>
            <div
                className={
                    "col-span-full mb-1 flex h-fit items-center justify-between"
                }
            >
                <h1 className={"self-auto text-xl font-semibold"}>Produtos</h1>
                <Link href={"/produtos/cadastrar"}>
                    <Button size={"sm"} className={"gap-1"}>
                        <Plus size={18} />
                        Criar Novo Produto
                    </Button>
                </Link>
            </div>

            <ListProductsSection />
        </section>
    );
}
