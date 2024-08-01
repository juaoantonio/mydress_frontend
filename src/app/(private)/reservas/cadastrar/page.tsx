import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateBookingForm } from "@/app/(private)/reservas/cadastrar/components/form";

export default function CreateBookingPage() {
    return (
        <section className={"flex h-[130vh] justify-center lg:items-center"}>
            <Card className={"mx-auto h-fit max-w-[800px] flex-1"}>
                <CardHeader>
                    <CardTitle>Criar reserva</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateBookingForm />
                </CardContent>
            </Card>
        </section>
    );
}
