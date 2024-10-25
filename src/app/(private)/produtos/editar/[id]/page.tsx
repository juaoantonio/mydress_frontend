"use client";

import { EditProductCard } from "./components/cards/edit.product.card";
import { useParams, useSearchParams } from "next/navigation";
import { ClutcheFormEdit } from "./components/form/clutche-form.edit";
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
        clutche: (
            <EditProductCard
                title="Editar Bolsa"
                render={<ClutcheFormEdit id={id as string} />}
            />
        ),
    };

    return typeLiterals[type];
}
