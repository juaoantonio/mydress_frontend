import {
  CreateCustomerInputDto,
  CreateCustomerOutputDto,
} from "@/services/customers/customers.dto";
import { env } from "@/env";
import { CustomerType } from "@/types/customer";

async function createCustomer(
  customer: CreateCustomerInputDto,
  accessToken: string,
): Promise<CreateCustomerOutputDto> {
  try {
    const response = await fetch(`${env.API_BASE_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(customer),
    });

    if (response.status === 500) throw new Error("Erro interno no servidor");

    const json = await response.json();

    if (response.status === 400) {
      return {
        errors: Object.entries(json).map(([key, value]) => ({
          field: key,
          messages: value,
        })),
      } as CreateCustomerOutputDto;
    }

    return {
      data: json,
    } as CreateCustomerOutputDto;
  } catch (e) {
    console.error(e);
    throw new Error("Algo deu errado ao cadastrar o cliente");
  }
}

async function getCustomers(accessToken: string) {
  const response = await fetch(`${env.API_BASE_URL}/customers`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 500) throw new Error("Erro interno no servidor");
  if (!response.ok) throw new Error("Erro ao buscar clientes");

  return (await response.json()) as CustomerType[];
}

async function deleteCustomerById(id: string, accessToken: string) {
  const response = await fetch(`${env.API_BASE_URL}/customers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 500) throw new Error("Erro interno no servidor");
  if (!response.ok) throw new Error("Erro ao deletar cliente");

  return response.ok;
}

export const customersService = {
  create: createCustomer,
  listAll: getCustomers,
  deleteById: deleteCustomerById,
};
