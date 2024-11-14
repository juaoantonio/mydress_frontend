import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverPortal,
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
import { PaginationControls } from "../pagination/pagination-controls";
import { Input } from "../ui/input";
import { replaceSearchParam } from "@/lib/utils";

interface Props<T, K> {
    data: any;
    triggerText: string;
    page: number;
    searchName: string;
    reloadPageOnClose: boolean;
    form: UseFormReturn<T>;
    fieldName: K;
    options?: SelectMultipleInputOption[];
    loading?: boolean;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;

    searchHandler(value: string): void;

    pageHandler(value: number): void;
}

export function SelectMultipleProducts<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    data,
    triggerText,
    form,
    reloadPageOnClose,
    fieldName,
    searchName,
    options,
    loading,
    page,
    searchHandler,
    pageHandler,
    error,
    errorMessage,
}: Props<TFieldValues, TName>) {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        searchHandler(search);
    };

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem className={"space-y-1"}>
                    <FormControl>
                        <Popover
                            onOpenChange={(open) => {
                                if (!open) {
                                    if (reloadPageOnClose) {
                                        replaceSearchParam("page", "1");
                                    }
                                }
                            }}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={"block w-full"}
                                >
                                    {triggerText}
                                </Button>
                            </PopoverTrigger>
                            <PopoverPortal>
                                <PopoverContent
                                    className={
                                        "max-h-[300px] overflow-x-scroll p-2"
                                    }
                                >
                                    {searchName && searchHandler && (
                                        <Input
                                            onChange={handleSearchChange}
                                            placeholder={searchName}
                                        />
                                    )}
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
                                                        checked={
                                                            Array.isArray(
                                                                field.value,
                                                            ) &&
                                                            field.value.some(
                                                                (item: any) =>
                                                                    item.clutchId ===
                                                                        option.id ||
                                                                    item.dressId ===
                                                                        option.id,
                                                            )
                                                        }
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            const currentValue =
                                                                field.value ??
                                                                [];
                                                            if (checked) {
                                                                form.setValue(
                                                                    fieldName,
                                                                    [
                                                                        ...currentValue,

                                                                        fieldName ===
                                                                        "dresses"
                                                                            ? {
                                                                                  dressId:
                                                                                      option.id,
                                                                              }
                                                                            : {
                                                                                  clutchId:
                                                                                      option.id,
                                                                                  isCourtesy:
                                                                                      false,
                                                                              },
                                                                    ] as PathValue<
                                                                        TFieldValues,
                                                                        TName
                                                                    >,
                                                                );
                                                            } else {
                                                                form.setValue(
                                                                    fieldName,
                                                                    currentValue.filter(
                                                                        (
                                                                            item: any,
                                                                        ) =>
                                                                            item.clutchId !==
                                                                                option.id &&
                                                                            item.dressId !==
                                                                                option.id,
                                                                    ) as PathValue<
                                                                        TFieldValues,
                                                                        TName
                                                                    >,
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <Image
                                                        src={option.img ?? ""}
                                                        alt={
                                                            option.description ??
                                                            ""
                                                        }
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

                                    {options?.length > 0 && (
                                        <PaginationControls
                                            data={data}
                                            currentPageStartRange={page}
                                            setCurrentPageStartRange={
                                                pageHandler
                                            }
                                            perNavigationRange={3}
                                        />
                                    )}
                                </PopoverContent>
                            </PopoverPortal>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
