import { useSearchParams } from "next/navigation";

export function useQueryParams<T extends Record<string, any>>(
    defaultValues: T,
): T {
    const searchParams = useSearchParams();

    const result = {} as T;

    Object.keys(defaultValues).forEach((param) => {
        const value = searchParams.get(param);

        if (value !== null) {
            if (typeof defaultValues[param] === "number") {
                result[param as keyof T] = parseFloat(value) as T[keyof T];
            } else if (typeof defaultValues[param] === "boolean") {
                result[param as keyof T] = (value === "true") as T[keyof T];
            } else {
                result[param as keyof T] = value as T[keyof T];
            }
        } else {
            result[param as keyof T] = defaultValues[param];
        }
    });

    return result;
}
