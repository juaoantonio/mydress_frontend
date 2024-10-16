import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleInitialVisitForm } from "@/app/(private)/agendamentos/components/schedule-initial-visit.form";

export default function CreateBookingPage() {
    return (
        <section className={"flex h-[130vh] justify-center lg:items-center"}>
            <Card className={"mx-auto h-fit max-w-[800px] flex-1"}>
                <CardHeader>
                    <CardTitle>Agendar visita</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScheduleInitialVisitForm />
                </CardContent>
            </Card>
        </section>
    );
}
