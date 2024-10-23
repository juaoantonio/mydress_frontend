export interface IBaseProductCreationInputDto {
    image: File;
    rentPrice: number;
    color: string;
    model: string;
}

export interface IBaseListProductQueryParamsInputDTO {
    page?: number;
    limit?: number;
    available?: boolean;
    startDate?: string;
    endDate?: string;
}
