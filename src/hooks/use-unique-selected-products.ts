import { IBaseProductOutputType } from "@/types/products/base.interface";
import { useEffect, useMemo, useState } from "react";

export default function useUniqueSelectedProducts(
    data: { items: IBaseProductOutputType[] },
    ids: string[],
) {
    const [items, setItems] = useState<IBaseProductOutputType[]>([]);

    const selectedItems = useMemo(() => {
        if (!data?.items?.length) return [];
        return data.items.filter((item) => ids.includes(item.id));
    }, [data?.items, ids]);

    useEffect(() => {
        setItems((prevItems) => {
            const newItemsMap = new Map(
                [
                    ...prevItems.filter((item) => ids.includes(item.id)),
                    ...selectedItems,
                ].map((item) => [item.id, item]),
            );

            const newItems = Array.from(newItemsMap.values());

            if (
                newItems.length !== prevItems.length ||
                newItems.some((item, index) => item.id !== prevItems[index]?.id)
            ) {
                return newItems;
            }

            return prevItems;
        });
    }, [selectedItems, ids]);

    return items;
}
