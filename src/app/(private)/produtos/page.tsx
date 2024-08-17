import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CreateDressCard,
    CreatePurseCard,
} from "@/app/(private)/produtos/components";

export default function ProductsPage() {
    return (
        <section className={"h-fit space-y-4"}>
            <Tabs defaultValue={"dress"}>
                <TabsList className={"grid w-full grid-cols-2"}>
                    <TabsTrigger value={"dress"}>Vestido</TabsTrigger>
                    <TabsTrigger value={"purse"}>Bolsa</TabsTrigger>
                </TabsList>

                <TabsContent value={"dress"}>
                    <CreateDressCard />
                </TabsContent>

                <TabsContent value={"purse"}>
                    <CreatePurseCard />
                </TabsContent>
            </Tabs>
        </section>
    );
}
