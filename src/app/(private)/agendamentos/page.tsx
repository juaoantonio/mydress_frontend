import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageSection } from "@/components/page/page-section";
import { PageContent } from "@/components/page/page-content";
import { AppointmentProvider } from "@/app/(private)/agendamentos/components/appointment-provider";

export default function AppointmentsPage() {
    return (
        <PageContent
            pageTitle={"Visitas"}
            pageActionsElement={
                <div className={"flex items-center justify-between gap-2"}>
                    <Link href={"/agendamentos/agendar"}>
                        <Button size={"sm"} className={"gap-1"}>
                            <Plus size={18} />
                            Agendar visita
                        </Button>
                    </Link>
                </div>
            }
        >
            <PageSection title={"Próximas visitas"}>
                <AppointmentProvider />
            </PageSection>
        </PageContent>
    );
}
