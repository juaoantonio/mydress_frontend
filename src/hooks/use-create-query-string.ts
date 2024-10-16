import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCreateQueryString() {
    const searchParams = useSearchParams();

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    return useCallback(
        (params: { [name: string]: string | number | boolean | null }) => {
            const newSearchParams = new URLSearchParams(searchParams);

            for (const [key, value] of Object.entries(params)) {
                if (!value) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, String(value));
                }
            }

            return newSearchParams.toString();
        },
        [searchParams],
    );
}
