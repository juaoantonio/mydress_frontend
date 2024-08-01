import { DressStatus } from "@/types/products/product.enums";
import { ProductType } from "@/types/products/product.types";

export type DressType = ProductType & {
  status: DressStatus;
  fabric: string;
  color: string;
  model: string;
  available_for_adjustment: boolean;
};

