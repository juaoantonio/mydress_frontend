import { DressStatus, JewelryStatus, PurseStatus } from "@/types/product.enums";

type ProductType = {
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

export type DressType = ProductType & {
  status: DressStatus;
  fabric: string;
  color: string;
  model: string;
  available_for_adjustment: boolean;
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
