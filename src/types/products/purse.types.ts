import { PurseStatus } from "@/types/products/product.enums";

export type PurseType = {
    id: string;
    img: string;
    description: string;
    price: number;
    rentable: boolean;
    purchaseable: boolean;
    sku: string;
    created_at: string;
    updated_at: string;
    status: PurseStatus;
    color: string;
    model: string;
};
