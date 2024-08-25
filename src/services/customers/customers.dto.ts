import { CustomerType } from "@/types/customer.types";

export type CreateCustomerInputDto = Omit<
    CustomerType,
    "created_at" | "updated_at" | "id"
>;

export type UpdateCustomerDto = Partial<CustomerType>;
