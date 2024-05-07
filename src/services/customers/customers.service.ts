import { CreateCustomerDto } from "@/services/customers/customers.dto";
import { env } from "@/env";

async function createCustomer(customer: CreateCustomerDto) {
  const response = await fetch(`${env.API_BASE_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) throw new Error("Failed to create customer");

  return response.json();
}

export const customersService = {};
