import Calendar from "@/components/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardHome() {
    return (
        <section className={"flex flex-col gap-4"}>
            <div
                className={
                    "col-span-full mb-1 flex h-fit items-center justify-between px-2"
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

            <Card className={"col-span-full h-[75vh]"}>
                <CardHeader>
                    <CardTitle>Calendário de Reservas</CardTitle>
                </CardHeader>
                <CardContent className={"h-full text-xs"}>
                    <Calendar />
                </CardContent>
            </Card>
        </section>
    );
}
