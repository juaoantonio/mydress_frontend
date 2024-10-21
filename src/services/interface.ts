import { GetPaginatedOutputDto } from "./types";

export interface Service<Entity> {
    create(options: { data: any; signal?: AbortSignal }): Promise<Entity>;

    getAll(options?: {
        filters?: any;
        signal?: AbortSignal;
    }): Promise<GetPaginatedOutputDto<Entity>>;

    getById(options: { id: string; signal?: AbortSignal }): Promise<Entity>;

    deleteById(options: { id: string; signal?: AbortSignal }): Promise<void>;

    updateById(options: { id: string; signal?: AbortSignal }): Promise<Entity>;
}
