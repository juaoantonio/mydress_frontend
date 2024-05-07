import { Customer } from "@/types/customer";

export type CreateCustomerDto = Omit<
  Customer,
  "created_at" | "updated_at" | "id"
>;
