export interface Service<Entity> {
    create(data: any): Promise<Entity>;

    getAll(filters: any): Promise<Entity[]>;

    getById(id: string): Promise<Entity>;

    deleteById(id: string): Promise<void>;

    updateById(id: string, data: any): Promise<Entity>;
}
