import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateDressCard, CreateClutchCard } from "./components";

export default function CreateProductsPage() {
    return (
        <section className={"h-fit space-y-4"}>
            <Tabs defaultValue={"dress"}>
                <TabsList className={"grid w-full grid-cols-2"}>
                    <TabsTrigger value={"dress"}>Vestido</TabsTrigger>
                    <TabsTrigger value={"clutch"}>Bolsa</TabsTrigger>
                </TabsList>

                <TabsContent value={"dress"}>
                    <CreateDressCard />
                </TabsContent>

                <TabsContent value={"clutch"}>
                    <CreateClutchCard />
                </TabsContent>
            </Tabs>
        </section>
    );
}
