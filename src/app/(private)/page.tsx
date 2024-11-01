import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CalendarCard from "@/app/(private)/components/calendar-card";
import { DataTableBookings } from "@/app/(private)/reservas/components/data-table.bookings";
import { PageContent } from "@/components/page/page-content";
import { PageSection } from "@/components/page/page-section";
import { Separator } from "@/components/ui/separator";

export default function DashboardHome() {
    return (
        <PageContent
            pageTitle={"Reservas"}
            pageActionsElement={
                <div className={"flex items-center justify-between gap-2"}>
                    <Link href={"/reservas/cadastrar"}>
                        <Button size={"sm"} className={"gap-1"}>
                            <Plus size={18} />
                            Nova reserva
                        </Button>
                    </Link>
                </div>
            }
        >
            <PageSection title={"Tabela de reservas"}>
                <DataTableBookings />
            </PageSection>

            <Separator />

            <PageSection title={"Calendário de reservas"}>
                <CalendarCard />
            </PageSection>
        </PageContent>
    );
}
