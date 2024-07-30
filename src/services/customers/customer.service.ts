import { CreateCustomerInputDto } from "@/services/customers/customers.dto";
import { CustomerType } from "@/types/customer.types";
import { axiosClient } from "@/lib/axios.client";
import { Service } from "@/services/interface";
import { ValidationError } from "@/errors/validation.error";

export class CustomersService implements Service<CustomerType> {
  async create(data: CreateCustomerInputDto): Promise<CustomerType> {
    const response = await axiosClient.post<CustomerType>("/customers", data);

    if (response.status === 400)
      throw new ValidationError(
        JSON.stringify({
          code: response.status,
          errors: Object.entries(response.data).map(([key, value]) => ({
            field: key,
            messages: value,
          })),
        }),
      );

    return response.data;
  }

  async getAll() {
    const response = await axiosClient.get<CustomerType[]>("/customers");

    if (response.status === 500) throw new Error("Internal server error");

    return response.data;
  }

  async getById(id: string) {
    const response = await axiosClient.get<CustomerType>(`/customers/${id}`);

    if (response.status === 500) throw new Error("Internal server error");

    return response.data;
  }

  async deleteById(id: string) {
    const response = await axiosClient.delete<null>(`/customers/${id}`);

    if (response.status === 500) throw new Error("Internal server error");

    return;
  }

  async updateById(id: string, data: Partial<CustomerType>) {
    const response = await axiosClient.put<CustomerType>(
      `/customers/${id}`,
      data,
    );

    if (response.status === 500) throw new Error("Internal server error");

    return response.data;
  }
}