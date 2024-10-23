import { useSearchParams } from "next/navigation";

export default function useProductFilterParams() {
    const searchParams = useSearchParams();

    const startDate = searchParams.get("start_date")
        ? searchParams.get("start_date") + "T00:00:00"
        : "";

    const available = searchParams.get("available") ?? "";

    const endDate = searchParams.get("end_date")
        ? searchParams.get("end_date") + "T00:00:00"
        : "";

    return {
        startDate,
        endDate,
        available,
    };
}
