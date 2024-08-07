import { DressStatus } from "@/types/products/product.enums";

export type DressType = {
    id: string;
    img: string;
    description: string;
    price: number;
    rentable: boolean;
    purchaseable: boolean;
    sku: string;
    created_at: string;
    updated_at: string;
    status: DressStatus;
    fabric: string;
    color: string;
    model: string;
    available_for_adjustment: boolean;
};
