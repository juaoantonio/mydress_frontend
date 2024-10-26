"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListDressSection } from "@/app/(private)/produtos/components/list-dress-section";
import { ListClutchSection } from "@/app/(private)/produtos/components/list-clutch-section";

export function ListProductsSection() {
    return (
        <section className={"h-fit space-y-4"}>
            <Tabs defaultValue={"dress"}>
                <TabsList className={"mb-4 grid w-full grid-cols-2"}>
                    <TabsTrigger value={"dress"}>Vestidos</TabsTrigger>
                    <TabsTrigger value={"clutch"}>Bolsas</TabsTrigger>
                </TabsList>

                <TabsContent value={"dress"}>
                    <ListDressSection />
                </TabsContent>

                <TabsContent value={"clutch"}>
                    <ListClutchSection />
                </TabsContent>
            </Tabs>
        </section>
    );
}
