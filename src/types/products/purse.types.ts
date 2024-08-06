import { ProductType } from "@/types/products/product.types";
import { PurseStatus } from "@/types/products/product.enums";

export type PurseType = ProductType & {
    status: PurseStatus;
    color: string;
    model: string;
};
