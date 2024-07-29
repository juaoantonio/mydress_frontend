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
import React from "react";
import {
  FieldPath,
  FieldValues,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { SelectMultipleInputOption } from "@/types/booking.types";

export function SelectMultipleInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  triggerText,
  form,
  fieldName,
  options,
}: {
  label: string;
  triggerText: string;
  form: UseFormReturn<TFieldValues>;
  fieldName: TName;
  options: SelectMultipleInputOption[];
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
                <Button variant={"outline"} className={"block w-full"}>
                  {triggerText}
                </Button>
              </PopoverTrigger>

              <PopoverContent>
                <ul className={"space-y-2"}>
                  {options.map((option, index) => (
                    <>
                      {index > 0 && <Separator />}
                      <div
                        key={option.id}
                        className={
                          "flex items-center gap-2 border-gray-200 p-1"
                        }
                      >
                        <Checkbox
                          checked={field.value.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              form.setValue(fieldName, [
                                ...field.value,
                                option.id,
                              ] as PathValue<TFieldValues, TName>);
                            } else {
                              form.setValue(
                                fieldName,
                                field.value.filter(
                                  (id: string) => id !== option.id,
                                ),
                              );
                            }
                          }}
                        />
                        <Image
                          src={option.image}
                          alt={option.description}
                          width={500}
                          height={500}
                          className={"h-16 w-16 rounded-md object-cover"}
                        />

                        <p className={"text-sm text-gray-800"}>
                          {option.description}
                        </p>
                      </div>
                    </>
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
