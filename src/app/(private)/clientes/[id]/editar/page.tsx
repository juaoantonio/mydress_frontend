import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateCustomerForm } from "@/app/(private)/clientes/[id]/editar/components/update-customer-form";
import { CustomerService } from "@/services/customers/customer.service";

export default async function CreateCustomerPage({
    params: { id },
}: {
    params: {
        id: string;
    };
}) {
    const service = new CustomerService();
    const customer = await service.getById(id);

    return (
        <section className={"flex h-fit justify-center lg:items-center"}>
            <Card className={"mx-auto max-w-[800px] flex-1"}>
                <CardHeader>
                    <CardTitle>Atualizar cliente</CardTitle>
                </CardHeader>
                <CardContent>
                    <UpdateCustomerForm
                        customerId={id}
                        previousData={customer}
                    />
                </CardContent>
            </Card>
        </section>
    );
}
