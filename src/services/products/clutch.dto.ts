import { IBaseProductCreationInputDto } from "./base.dto";

export interface CreateClutchInputDTO extends IBaseProductCreationInputDto {}

export interface UpdateClutchInputDto extends Partial<CreateClutchInputDTO> {}
