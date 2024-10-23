export type ProductFilters = {
    available: string;
    start_date: string;
    end_date: string;
};

export type FilterProps = {
    value: string;
    setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
};