import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateEventForm } from "./components/create-event-form";

export default function CreateEventPage() {
    return (
        <section className={"flex h-fit justify-center lg:items-center"}>
            <Card className={"mx-auto max-w-[800px] flex-1"}>
                <CardHeader>
                    <CardTitle>Cadastrar novo evento</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateEventForm />
                </CardContent>
            </Card>
        </section>
    );
}
