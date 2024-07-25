import { z } from "zod";
import { createCustomerSchema } from "@/schemas/customer.schemas";
import React from "react";

export type InputType = {
  field: keyof z.infer<typeof createCustomerSchema>;
  label: string;
  placeholder?: string;
  inputComponentRender: (props: any) => React.ReactElement;
};