import { PurseStatus } from "@/types/products/product.enums";

export type CreatePurseInputDTO = {
    img?: any;
    price: number;
    description: string;
    rentable: boolean;
    purchasable: boolean;
    color: string;
    model: string;
    status: PurseStatus;
};
