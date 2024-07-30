import { JewelryStatus, PurseStatus } from "@/types/products/product.enums";

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

export type PurseType = ProductType & {
  status: PurseStatus;
  color: string;
  model: string;
};

export type JewelryType = ProductType & {
  status: JewelryStatus;
  material: string;
  model: string;
};
