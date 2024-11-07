import { IBaseProductOutputType } from "@/types/products/base.interface";
import { useEffect, useState } from "react";

export default function useUniqueSelectedProducts(
    data: { items: IBaseProductOutputType[] },
    ids: string[],
) {
    const [items, setItems] = useState<IBaseProductOutputType[]>([]);

    useEffect(() => {
        if (!data.items?.length) return;

        const selectedItems = data.items.filter((item) =>
            ids.includes(item.id),
        );

        setItems((prevItems) => {
            const uniqueItems = [
                ...prevItems.filter((item) => ids.includes(item.id)),
                ...selectedItems,
            ];

            return Array.from(new Set(uniqueItems.map((item) => item.id))).map(
                (id) => uniqueItems.find((item) => item.id === id),
            );
        });
    }, [data.items, ids]);

    return items;
}
