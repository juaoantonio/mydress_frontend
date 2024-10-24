import { useSearchParams } from "next/navigation";
import { ProductAvailability } from "../components/filters/filters.products.types";
import { useMemo } from "react";

export default function useProductFilterParams() {
    const searchParams = useSearchParams();

    const startDate = searchParams.get("start_date") ?? "";

    const available = (searchParams.get("available") ??
        "") as ProductAvailability;

    const endDate = searchParams.get("end_date") ?? "";

    return useMemo(
        () => ({
            startDate,
            endDate,
            available,
        }),
        [startDate, endDate, available],
    );
}
