import { DressStatus } from "@/types/products/product.enums";

export type CreateDressInputDTO = {
    img: File;
    description: string;
    price: number;
    rentable: boolean;
    purchaseable: boolean;
    status: DressStatus;
    fabric: string;
    color: string;
    model: string;
    available_for_adjustment: boolean;
};
