import { DressType } from "@/types/products/dress.types";

export type CreateDressInputDTO = Omit<
    DressType,
    "created_at" | "id" | "updated_at" | "sku"
> & {
    rentable?: boolean;
    purchaseable?: boolean;
    status?: string;
    available_for_adjustment?: boolean;
};
