import { IBaseProductCreationInputDto } from "./base.dto";

export interface CreateDressInputDTO extends IBaseProductCreationInputDto {
    fabric: string;
}

export interface UpdateDressInputDto extends Partial<CreateDressInputDTO> {}
