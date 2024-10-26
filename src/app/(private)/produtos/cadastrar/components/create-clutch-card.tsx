import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { ClutchFormCreate } from "@/app/(private)/produtos/cadastrar/components/clutch-form.create";

export function CreateClutchCard() {
    return (
        <Card className={"mx-auto max-w-[800px] flex-1"}>
            <CardHeader>
                <CardTitle>Cadastrar nova Bolsa</CardTitle>
            </CardHeader>
            <CardContent>
                <ClutchFormCreate />
            </CardContent>
        </Card>
    );
}
