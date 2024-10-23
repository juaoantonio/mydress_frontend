import { useSearchParams } from "next/navigation";

export default function useProductFilterParams() {
    const searchParams = useSearchParams();

    const startDate = searchParams.get("start_date")
        ? searchParams.get("start_date")
        : "";

    const available = searchParams.get("available") ?? "";

    const endDate = searchParams.get("end_date")
        ? searchParams.get("end_date")
        : "";

    return {
        startDate,
        endDate,
        available,
    };
}
