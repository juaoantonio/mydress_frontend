import { CustomerType } from "@/types/customer";

export type CreateCustomerInputDto = Omit<
  CustomerType,
  "created_at" | "updated_at" | "id"
>;

type CreateCustomerSuccessOutputDto = {
  data: CustomerType;
  errors: null;
};

type CreateCustomerErrorOutputDto = {
  data: null;
  errors: {
    field: string;
    messages: string[];
  }[];
};

export type CreateCustomerOutputDto =
  | CreateCustomerSuccessOutputDto
  | CreateCustomerErrorOutputDto;
