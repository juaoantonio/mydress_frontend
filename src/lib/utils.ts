import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { ValidationError } from "@/errors/validation.error";
import { ValidationErrorReturn } from "@/types/validation.types";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function jsonParse<T>(value: string): T | undefined {
    try {
        return JSON.parse(value);
    } catch (error) {
        return;
    }
}

export function handleCreationFormError<T extends FieldValues>(
    error: unknown,
    form: UseFormReturn<T>,
    errorMessage: string,
    messageFormatter: (message: string) => string,
) {
    if (!(error instanceof ValidationError)) {
        throw error;
    }

    const parsedError = jsonParse<ValidationErrorReturn>(error.message);

    if (!parsedError) {
        toast.error(errorMessage);
        console.error(error);

        return;
    }

    if (parsedError.code === 400) {
        parsedError.errors.map((error: any) => {
            const field = error.field;
            const message = messageFormatter(error.messages[0]);
            form.setError(field, { message });
        });

        return;
    }

    toast.error(errorMessage);
}
