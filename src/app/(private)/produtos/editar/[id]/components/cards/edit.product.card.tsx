import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
interface Props {
    title: string;
    render: JSX.Element;
}

export function EditProductCard({ title, render }: Props) {
    return (
        <Card className={"mx-auto max-w-[800px] flex-1"}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{render}</CardContent>
        </Card>
    );
}
