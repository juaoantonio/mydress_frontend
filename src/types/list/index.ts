export interface IResourceList<T> {
    currentPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    lastPage: number;
    perPage: number;
    total: number;
    items: T[];
}
