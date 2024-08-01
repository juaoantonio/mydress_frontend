import { JewelryStatus } from "@/types/products/product.enums";

export type ProductType = {
    id: string;
    img: string;
    description: string;
    price: number;
    rentable: boolean;
    purchaseable: boolean;
    sku: string;
    created_at: string;
    updated_at: string;
};

export type JewelryType = ProductType & {
    status: JewelryStatus;
    material: string;
    model: string;
};
