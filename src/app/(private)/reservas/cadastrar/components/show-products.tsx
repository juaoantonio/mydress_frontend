import { numberToCurrency } from "@/lib/utils";

interface IItem {
    id: string;
    name: string;
    rentPrice: number;
}

interface Props {
    title: string;
    items: IItem[];
}

export default function ShowSelectedProducts({ items, title }: Props) {
    return (
        <>
            {items?.length > 0 && (
                <div className="rounded-sm border border-gray-200 p-2">
                    <h3>
                        <strong>{title}:</strong>
                    </h3>
                    {items.map((item) => (
                        <p key={item.id}>
                            - {item.name} - {numberToCurrency(item.rentPrice)}`
                        </p>
                    ))}
                </div>
            )}
        </>
    );
}
