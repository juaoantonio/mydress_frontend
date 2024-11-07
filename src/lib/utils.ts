import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { AxiosError } from "axios";
import { AxiosErrorsEnum } from "@/types/enums/axios-errors.enum";
import { ChangeEvent } from "react";

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

export function numberToCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

export function isServer() {
    return !(typeof window != "undefined" && window.document);
}

/*
 * This function is used to handle errors from the creation form.
 * It checks if the error is an AxiosError, if it is a bad request and if it has a response.
 * If it has a response, it will map the errors and set them in the form.
 * If it doesn't have a response, it will show a generic error message.
 */
export function handleCreationFormError<T extends FieldValues>(
    error: unknown,
    form: UseFormReturn<T>,
    errorMessage: string,
    messageFormatter: (message: string) => string,
) {
    if (!(error instanceof AxiosError)) {
        console.error(error);

        return;
    }

    if (!(error.code === AxiosErrorsEnum.ERR_BAD_REQUEST)) {
        console.error(error);

        return;
    }

    const responseErrors = error.response?.data;

    if (!responseErrors) {
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

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const dataTransfer = new DataTransfer();

    Array.from(event.target.files).forEach((image) =>
        dataTransfer.items.add(image),
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
}

export function getPercentage(partial: number, total: number) {
    return +((partial * 100) / total).toFixed(2);
}

export function cleanParams(params: Record<string, any>): Record<string, any> {
    return Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value),
    );
}

export function isValidUUID(uuid: string): boolean {
    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}

export function replaceSearchParam(param: string, value: string) {
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set(param, value);

    const newUrl = `${window.location.pathname}?${currentSearchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
}
