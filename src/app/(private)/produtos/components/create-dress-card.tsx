import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { DressFormCreate } from "@/app/(private)/produtos/components/dress-form.create";

export function CreateDressCard() {
    return (
        <Card className={"mx-auto max-w-[800px] flex-1"}>
            <CardHeader>
                <CardTitle>Cadastrar novo vestido</CardTitle>
            </CardHeader>
            <CardContent>
                <DressFormCreate />
            </CardContent>
        </Card>
    );
}
