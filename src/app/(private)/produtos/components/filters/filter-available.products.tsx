import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import { FilterProps, ProductAvailability } from "./filters.products.types";

export function FilterAvailableProducts({ value, setFilters }: FilterProps) {
    function handleChange(value: ProductAvailability) {
        setFilters((prev) => ({
            ...prev,
            available: value,
        }));
    }

    function handleClear() {
        setFilters((prev) => ({
            ...prev,
            available: ProductAvailability.Undefined,
        }));
    }

    return (
        <div className={"flex items-center gap-2"}>
            <Label>Disponibilidade</Label>
            <Select
                value={value}
                onValueChange={(value) => handleChange(value as ProductAvailability)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="true">Disponível</SelectItem>
                        <SelectItem value="false">Indisponivel</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button
                variant={"destructive"}
                className={"aspect-square p-1"}
                onClick={handleClear}
            >
                <X size={18} />
            </Button>
        </div>
    );
}
