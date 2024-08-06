import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AxiosErrorsEnum } from "@/types/enums/axios-errors.enum";

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
    if (!(error instanceof AxiosError)) {
        toast.error(errorMessage);
        console.error(error);

        return;
    }

    if (!(error.code === AxiosErrorsEnum.ERR_BAD_REQUEST)) {
        toast.error(errorMessage);
        console.error(error);

        return;
    }

    const responseErrors = error.response?.data;

    if (!responseErrors) {
        toast.error(errorMessage);
        console.error(error);

        return;
    }

    const fieldMessage = Object.entries(responseErrors);

    fieldMessage.map((error: any) => {
        const field = error[0];
        const message = messageFormatter(error[1][0]);

        if (field === "non_field_errors") {
            form.setError("root", { message });
        }
        form.setError(field, { message });
    });
}
