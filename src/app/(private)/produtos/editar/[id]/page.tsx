"use client";

import { EditProductCard } from "./components/cards/edit.product.card";
import { useParams, useSearchParams } from "next/navigation";

export default function EditProductsPage() {
    const { id } = useParams();

    const searchParams = useSearchParams();

    const type = searchParams.get("type") ?? "dress";

    const typeLiterals = {
        dress: <EditProductCard title="Editar Vestido" id={id as string} />,
        clutche: <EditProductCard title="Editar Bolsa" id={id as string} />,
    };

    return typeLiterals[type];
}
