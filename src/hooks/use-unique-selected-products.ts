import { IBaseProductOutputType } from "@/types/products/base.interface";
import { useEffect, useState } from "react";

export default function useUniqueSelectedProducts(
    data: { items: IBaseProductOutputType[] },
    ids: string[],
) {
    const [items, setItems] = useState<IBaseProductOutputType[]>([]);

    useEffect(() => {
        if (!data?.items?.length) return;

        const selectedItems = data.items.filter((item) =>
            ids.includes(item.id),
        );

        setItems((prevItems) => {
            const itemMap = new Map(
                [
                    ...prevItems.filter((item) => ids.includes(item.id)),
                    ...selectedItems,
                ].map((item) => [item.id, item]),
            );

            return Array.from(itemMap.values());
        });
    }, [data?.items, ids]);

    return items;
}
