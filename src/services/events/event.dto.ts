import { EventType } from "@/types/events/event.types";

export type CreateEventInputDTO = Omit<
    EventType,
    "id" | "created_at" | "updated_at"
>;
