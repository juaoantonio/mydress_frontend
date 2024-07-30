import { CommonOutputDto } from "@/services/types";

export interface Service<Entity> {
  create(data: any): Promise<CommonOutputDto<Entity>>;

  getAll(): Promise<CommonOutputDto<Entity[]>>;

  getById(id: string): Promise<CommonOutputDto<Entity>>;

  deleteById(id: string): Promise<CommonOutputDto<null>>;

  updateById(
    id: string,
    data: Partial<Entity>,
  ): Promise<CommonOutputDto<Entity>>;
}
