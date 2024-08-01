import { ProductType } from "@/types/products/product.types";
import { PurseStatus } from "@/types/products/product.enums";

export type PurseType = ProductType & {
  status: PurseStatus;
  color: string;
  model: string;
};

export type CreatePurseInputDTO = {
  img: string;
  price: number;
  description: string;
  rentable: boolean;
  purchaseable: boolean;
  color: string;
  model: string;
};
