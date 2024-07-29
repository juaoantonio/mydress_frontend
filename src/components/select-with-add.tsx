import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Plus } from "lucide-react";
import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type SelectOption = {
  value: string;
  label: string;
};

export function SelectWithAdd<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  options,
  addActionMessage,
  addActionLink,
}: {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  options: SelectOption[];
  addActionMessage: string;
  addActionLink: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={"space-y-1"}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {
                <>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                  <Link
                    href={addActionLink}
                    className={
                      "flex w-full cursor-pointer items-center gap-1 rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground"
                    }
                  >
                    <Plus size={18} />
                    {addActionMessage}
                  </Link>
                </>
              }
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
