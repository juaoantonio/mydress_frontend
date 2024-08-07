import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CalendarCard from "@/app/(private)/components/calendar-card";

export default function DashboardHome() {
    return (
        <section className={"mt-2 flex flex-col gap-4"}>
            <div
                className={
                    "col-span-full mb-1 flex h-fit items-center justify-between"
                }
            >
                <h1 className={"self-auto text-xl font-semibold"}>
                    Página Principal
                </h1>
                <Link href={"/reservas/cadastrar"}>
                    <Button size={"sm"} className={"gap-1"}>
                        <Plus size={18} />
                        Criar Nova Reserva
                    </Button>
                </Link>
            </div>
            <CalendarCard />
        </section>
    );
}
