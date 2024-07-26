import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DressFormCreate } from "@/app/(private)/produtos/components";

export default function ProductsPage() {
  return (
    <section className={"h-fit space-y-4"}>
      <Tabs defaultValue={"dress"}>
        <TabsList className={"grid w-full grid-cols-3"}>
          <TabsTrigger value={"dress"}>Vestido</TabsTrigger>
          <TabsTrigger value={"purse"}>Bolsa</TabsTrigger>
          <TabsTrigger value={"jewelry"}>Jóia</TabsTrigger>
        </TabsList>

        <TabsContent value={"dress"}>
          <DressFormCreate />
        </TabsContent>

        <TabsContent value={"purse"}>
          <Card className={"mx-auto max-w-[800px] flex-1"}>
            <CardHeader>
              <CardTitle>Cadastrar nova bolsa</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={"jewelry"}>
          <Card className={"mx-auto max-w-[800px] flex-1"}>
            <CardHeader>
              <CardTitle>Cadastrar nova jóia</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
