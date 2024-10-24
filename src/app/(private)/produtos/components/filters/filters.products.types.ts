export enum ProductAvailability {
    Undefined = "",
    Available = "true",
    Unavailable = "false",
}

export type ProductFilters = {
    available: ProductAvailability;
    start_date: string;
    end_date: string;
};

export type FilterProps = {
    value: string;
    setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
};
