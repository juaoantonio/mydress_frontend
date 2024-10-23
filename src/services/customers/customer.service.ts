import {
    CreateCustomerInputDto,
    UpdateCustomerDto,
} from "@/services/customers/customers.dto";
import { CustomerType } from "@/types/customer.types";
import { axiosClient } from "@/lib/axios.client";
import { Service } from "@/services/interface";
import { ValidationError } from "@/errors/validation.error";

export class CustomerService implements Service<CustomerType> {
    async create({
        data,
    }: {
        data: CreateCustomerInputDto;
    }): Promise<CustomerType> {
        const response = await axiosClient.post<CustomerType>(
            "/customers",
            data,
        );

        if (response.status === 400)
            throw new ValidationError(
                JSON.stringify({
                    code: response.status,
                    errors: Object.entries(response.data).map(
                        ([key, value]) => ({
                            field: key,
                            messages: value,
                        }),
                    ),
                }),
            );

        return response.data;
    }

    async getAll(options?: {
        filters: { name?: string };
        signal?: AbortSignal;
    }): Promise<any> {
        const response = await axiosClient.get<CustomerType[]>("/customers", {
            params: {
                name: options?.filters.name,
            },
            signal: options?.signal,
        });

        return response.data;
    }

    async getById({ id }: { id: string }) {
        const response = await axiosClient.get<CustomerType>(
            `/customers/${id}`,
        );

        return response.data;
    }

    async deleteById({ id }: { id: string }) {
        await axiosClient.delete<null>(`/customers/${id}`);

        return;
    }

    async updateById({ id, data }: { id: string; data: UpdateCustomerDto }) {
        const response = await axiosClient.put<CustomerType>(
            `/customers/${id}`,
            data,
        );

        return response.data;
    }
}
