import { useSearchParams } from "next/navigation";

export function useQueryParams<T extends Record<string, any>>(
    defaultValues: T,
): T {
    const searchParams = useSearchParams();

    const result = {} as T;

    Object.keys(defaultValues).forEach((param) => {
        const value = searchParams.get(param);
        if (value !== null) {
            const defaultValueType = typeof defaultValues[param];

            if (defaultValueType === "number") {
                const parsedValue = parseFloat(value);
                result[param as keyof T] = isNaN(parsedValue)
                    ? defaultValues[param]
                    : (parsedValue as T[keyof T]);
            } else if (defaultValueType === "boolean") {
                result[param as keyof T] = (value === "true") as T[keyof T];
            } else {
                result[param as keyof T] = value as T[keyof T];
            }
        } else {
            if (
                typeof defaultValues[param] === null ||
                typeof defaultValues[param] === "undefined"
            ) {
                return;
            }
            result[param as keyof T] = defaultValues[param];
        }
    });
    return result;
}
