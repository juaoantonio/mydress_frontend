"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListDressSection } from "@/app/(private)/produtos/components/list-dress-section";
import { ListPurseSection } from "@/app/(private)/produtos/components/list-purse-section";

export function ListProductsSection() {
    return (
        <section className={"h-fit space-y-4"}>
            <Tabs defaultValue={"dress"}>
                <TabsList className={"grid w-full grid-cols-2"}>
                    <TabsTrigger value={"dress"}>Vestidos</TabsTrigger>
                    <TabsTrigger value={"purse"}>Bolsas</TabsTrigger>
                </TabsList>

                <TabsContent value={"dress"}>
                    <ListDressSection />
                </TabsContent>

                <TabsContent value={"purse"}>
                    <ListPurseSection />
                </TabsContent>
            </Tabs>
        </section>
    );
}
