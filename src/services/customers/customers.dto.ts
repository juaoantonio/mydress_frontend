import { CustomerType } from "@/types/customer";

export type CreateCustomerDto = Omit<
  CustomerType,
  "created_at" | "updated_at" | "id"
>;
