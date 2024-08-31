import React from "react";

export type BookingsFilters = {
    status: string;
    event_date: string;
    customer_name: string;
    event_reception: string;
};

export type FilterProps = {
    value: string;
    setFilters: React.Dispatch<React.SetStateAction<BookingsFilters>>;
};
