import { CustomerType } from "@/types/customer.types";

export type CreateCustomerInputDto = Omit<
    CustomerType,
    "created_at" | "updated_at" | "id"
>;
