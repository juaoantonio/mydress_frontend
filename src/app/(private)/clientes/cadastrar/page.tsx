import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCustomerForm } from "./components/form";

export default function CreateCustomerPage() {
  return (
    <section className={"flex items-center justify-center h-full"}>
      <Card className={"max-w-[800px] mx-auto flex-1"}>
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
