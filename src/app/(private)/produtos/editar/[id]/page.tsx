"use client";

import { EditProductCard } from "./components/cards/edit.product.card";
import { useParams, useSearchParams } from "next/navigation";
import { ClutchFormEdit } from "./components/form/clutch-form.edit";
import { DressFormEdit } from "./components/form/dress-form.edit";

export default function EditProductsPage() {
    const { id } = useParams();

    const searchParams = useSearchParams();

    const type = searchParams.get("type") ?? "dress";

    const typeLiterals = {
        dress: (
            <EditProductCard
                title="Editar Vestido"
                render={<DressFormEdit id={id as string} />}
            />
        ),
        clutch: (
            <EditProductCard
                title="Editar Bolsa"
                render={<ClutchFormEdit id={id as string} />}
            />
        ),
    };

    return typeLiterals[type];
}
