export interface Service<Entity> {
  create(data: any): Promise<Entity>;

  getAll(): Promise<Entity[]>;

  getById(id: string): Promise<Entity>;

  deleteById(id: string): Promise<void>;

  updateById(id: string, data: Partial<Entity>): Promise<Entity>;
}
