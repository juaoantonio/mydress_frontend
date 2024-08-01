import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCustomerForm } from "./components/form";

export default function CreateCustomerPage() {
    return (
        <section className={"flex h-fit justify-center lg:items-center"}>
            <Card className={"mx-auto max-w-[800px] flex-1"}>
                <CardHeader>
                    <CardTitle>Cadastrar novo cliente</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateCustomerForm />
                </CardContent>
            </Card>
        </section>
    );
}
