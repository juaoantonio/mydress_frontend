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
import { FilterProps } from "@/app/(private)/reservas/components/filters/filters.bookings.types";

export function FilterStatusBookings({ value, setFilters }: FilterProps) {
    function handleChange(value: string) {
        setFilters((prev) => ({
            ...prev,
            status: value,
        }));
    }

    function handleClear() {
        setFilters((prev) => ({
            ...prev,
            status: "",
        }));
    }

    return (
        <div className={"flex items-center gap-2"}>
            <Label>Status</Label>
            <Select
                value={value}
                onValueChange={(value) => handleChange(value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="PAYMENT_PENDING">
                            Pagamento pendente
                        </SelectItem>
                        <SelectItem value="CONFIRMED">
                            Pagamento confirmado
                        </SelectItem>
                        <SelectItem value="CANCELED">Cancelada</SelectItem>
                        <SelectItem value="CONCLUDED">Concluída</SelectItem>
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
