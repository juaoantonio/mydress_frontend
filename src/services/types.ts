type SuccessOutputDto<DataType> = {
    body: DataType;
    errors: null;
};

type ErrorOutputDto = {
    body: null;
    errors: {
        code: number;
        content: any;
    };
};

export type CommonCreateUpdateOutputDto<DataType> =
    | SuccessOutputDto<DataType>
    | ErrorOutputDto;

export type GetPaginatedOutputDto<T> = {
    items: T[];
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
};

export type GetPaginatedInputDto = {
    page: number;
    limit: number;
    sort?: string;
    sortDir?: SortDirection;
};

export type SortDirection = "asc" | "desc";
