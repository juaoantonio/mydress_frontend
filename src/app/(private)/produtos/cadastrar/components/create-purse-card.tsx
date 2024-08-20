import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { PurseFormCreate } from "@/app/(private)/produtos/cadastrar/components/purse-form.create";

export function CreatePurseCard() {
    return (
        <Card className={"mx-auto max-w-[800px] flex-1"}>
            <CardHeader>
                <CardTitle>Cadastrar nova Bolsa</CardTitle>
            </CardHeader>
            <CardContent>
                <PurseFormCreate />
            </CardContent>
        </Card>
    );
}
