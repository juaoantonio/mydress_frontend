import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import React, { Fragment } from "react";
import {
    FieldPath,
    FieldValues,
    PathValue,
    UseFormReturn,
} from "react-hook-form";
import { SelectMultipleInputOption } from "@/types/booking.types";
import { LoaderCircle } from "lucide-react";

export function SelectMultipleInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    label,
    triggerText,
    form,
    fieldName,
    options,
    loading,
    error,
    errorMessage,
}: {
    label: string;
    triggerText: string;
    form: UseFormReturn<TFieldValues>;
    fieldName: TName;
    options?: SelectMultipleInputOption[];
    loading?: boolean;
    error?: boolean;
    errorMessage?: string;
}) {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={"space-y-1"}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={"block w-full"}
                                >
                                    {triggerText}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className={"p-2"}>
                                <ul className={"space-y-2"}>
                                    {loading && (
                                        <div
                                            className={
                                                "flex items-center justify-center p-2"
                                            }
                                        >
                                            <LoaderCircle
                                                className={
                                                    "animate-spin text-primary"
                                                }
                                            />
                                        </div>
                                    )}
                                    {error && errorMessage}

                                    {options?.map((option, index) => (
                                        <Fragment key={option.id}>
                                            {index > 0 && <Separator />}
                                            <label
                                                key={option.id}
                                                htmlFor={
                                                    "checkbox-products-" +
                                                    option.id
                                                }
                                                className={
                                                    "flex items-center gap-2 border-gray-200 p-1"
                                                }
                                            >
                                                <Checkbox
                                                    id={
                                                        "checkbox-products-" +
                                                        option.id
                                                    }
                                                    checked={field.value.includes(
                                                        option.id,
                                                    )}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) => {
                                                        if (checked) {
                                                            form.setValue(
                                                                fieldName,
                                                                [
                                                                    ...field.value,
                                                                    option.id,
                                                                ] as PathValue<
                                                                    TFieldValues,
                                                                    TName
                                                                >,
                                                            );
                                                        } else {
                                                            form.setValue(
                                                                fieldName,
                                                                field.value.filter(
                                                                    (
                                                                        id: string,
                                                                    ) =>
                                                                        id !==
                                                                        option.id,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                />
                                                <Image
                                                    src={option.img ?? ""}
                                                    alt={option.description}
                                                    width={500}
                                                    height={500}
                                                    className={
                                                        "h-16 w-16 rounded-md object-cover"
                                                    }
                                                />

                                                <p
                                                    className={
                                                        "text-sm text-gray-800"
                                                    }
                                                >
                                                    {option.description}
                                                </p>
                                            </label>
                                        </Fragment>
                                    ))}
                                </ul>
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
