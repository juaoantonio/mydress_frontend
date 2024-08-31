import { Service } from "@/services/interface";
import { EventType } from "@/types/events/event.types";
import { CreateEventInputDTO } from "@/services/events/event.dto";
import { axiosClient } from "@/lib/axios.client";

export class EventService implements Service<EventType> {
    async create({ data }: { data: CreateEventInputDTO }): Promise<EventType> {
        const response = await axiosClient.post<EventType>("/events", data);

        return response.data;
    }

    async getById({ id }: { id: string }): Promise<EventType> {
        const response = await axiosClient.get<EventType>(`/events/${id}`);

        return response.data;
    }

    async getAll(options?: {
        filters: {
            event_reception?: string;
        };
    }): Promise<EventType[]> {
        const response = await axiosClient.get<EventType[]>("/events", {
            params: options?.filters,
        });

        return response.data;
    }

    async deleteById({ id }: { id: string }) {
        await axiosClient.delete<null>(`/events/${id}`);
    }

    async updateById({
        id,
        data,
    }: {
        id: string;
        data: Partial<EventType>;
    }): Promise<EventType> {
        const response = await axiosClient.patch<EventType>(
            `/events/${id}`,
            data,
        );

        return response.data;
    }
}
