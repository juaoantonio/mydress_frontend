import { IBaseProductCreationInputDto } from "./base.dto";

export interface CreatePurseInputDTO extends IBaseProductCreationInputDto {}

export interface UpdateClutcheInputDto extends Partial<CreatePurseInputDTO> {}
