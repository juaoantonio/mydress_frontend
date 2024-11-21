import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleAdjustmentReturnForm } from "@/app/(private)/agendamentos/components/schedule-adjustment-return.form";

export default function CreateBookingPage({
    params: { bookingId },
}: {
    params: {
        bookingId: string;
    };
}) {
    return (
        <section className={"flex h-[130vh] justify-center lg:items-center"}>
            <Card className={"mx-auto h-fit max-w-[800px] flex-1"}>
                <CardHeader>
                    <CardTitle>
                        Agendar visita para retorno de ajustes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ScheduleAdjustmentReturnForm bookingId={bookingId} />
                </CardContent>
            </Card>
        </section>
    );
}
