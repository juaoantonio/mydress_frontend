import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ListProductsSection } from "@/app/(private)/produtos/components";
import { DataTableFiltersProducts } from "./components/filters/data-table-filters.products";

export default function ListProductsPage() {
    return (
        <section className={"mt-2 flex flex-col gap-4"}>
            <div
                className={
                    "col-span-full mb-1 flex h-fit items-center justify-between"
                }
            >
                <h1 className={"self-auto text-xl font-semibold"}>Produtos</h1>
                <div className="flex items-center gap-2">
                    <DataTableFiltersProducts />
                    <Link href={"/produtos/cadastrar"}>
                        <Button size={"sm"} className={"gap-1"}>
                            <Plus size={18} />
                            Criar Novo Produto
                        </Button>
                    </Link>
                </div>
            </div>

            <ListProductsSection />
        </section>
    );
}
