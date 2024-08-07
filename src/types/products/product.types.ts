import { JewelryStatus } from "@/types/products/product.enums";

export type ProductType = {
    // Identificação e status
    id: string;
    sku: string;
    resourcetype: string;
    status: string;
    polymorphic_ctype: number;

    // Descrição do produto
    description: string;
    model: string;
    fabric: string;
    color: string;

    // Informações sobre a disponibilidade e preço
    price: number;
    purchaseable: boolean;
    rentable: boolean;
    available_for_adjustment: boolean;

    // Datas de criação e atualização
    created_at: string; // Date string format
    updated_at: string; // Date string format

    // Imagem
    img: string;
};

export type JewelryType = ProductType & {
    status: JewelryStatus;
    material: string;
    model: string;
};
