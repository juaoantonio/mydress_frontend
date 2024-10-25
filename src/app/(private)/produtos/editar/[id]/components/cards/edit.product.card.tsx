import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { DressFormEdit } from "../form/dress-form.edit";
import { IBaseProductEditionInputProps } from "../../interfaces/base.interface";

interface Props extends IBaseProductEditionInputProps {
    title: string;
}

export function EditProductCard({ id, title }: Props) {
    return (
        <Card className={"mx-auto max-w-[800px] flex-1"}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <DressFormEdit id={id} />
            </CardContent>
        </Card>
    );
}
