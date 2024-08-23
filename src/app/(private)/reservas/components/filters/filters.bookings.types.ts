import React from "react";

export type BookingsFilters = {
    status: string;
    event_date: string;
    customer_name: string;
};

export type FilterProps = {
    value: string;
    setFilters: React.Dispatch<React.SetStateAction<BookingsFilters>>;
};
