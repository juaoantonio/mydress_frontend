import { DressStatus } from "@/types/products/product.enums";
import { ProductType } from "@/types/products/product.types";

export type DressType = ProductType & {
  status: DressStatus;
  fabric: string;
  color: string;
  model: string;
  available_for_adjustment: boolean;
};
export type CreateDressInputDTO = Partial<
  Omit<DressType, "created_at" | "id" | "updated_at" | "sku">
> & {
  rentable?: boolean;
  purchaseable?: boolean;
  status?: string;
  available_for_adjustment?: boolean;
};
