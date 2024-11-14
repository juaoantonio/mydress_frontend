import { ImageListItem } from "@/components/list/list";
import { numberToCurrency } from "@/lib/utils";
import { IBaseProductOutputType } from "@/types/products/base.interface";
import React from "react";

interface Props {
    title: string;
    items: IBaseProductOutputType[];
    content?: (item: IBaseProductOutputType) => JSX.Element;
}

export default function ShowSelectedProducts({ items, content }: Props) {
    return (
        <>
            {items.length > 0 && (
                <div className="rounded-sm border border-gray-200 p-2">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="mb-2 flex flex-col items-start justify-between"
                        >
                            <ImageListItem
                                values={[
                                    {
                                        label: "Preço de aluguel",
                                        value: numberToCurrency(item.rentPrice),
                                    },
                                    {
                                        label: "Cor",
                                        value: item.color,
                                    },
                                    {
                                        label: "Modelo",
                                        value: item.model,
                                    },
                                ]}
                                img={item.imagePath}
                                imgAlt={item.name}
                                label={item.name}
                            />
                            {content && content(item)}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
