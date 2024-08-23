import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import { BookingsFilters } from "@/app/(private)/reservas/components/filters/filters.bookings.types";

export function FilterCustomerNameBookings({
    value,
    setFilters,
}: {
    value: string;
    setFilters: React.Dispatch<React.SetStateAction<BookingsFilters>>;
}) {
    function handleChange(value: string) {
        setFilters((prev) => ({
            ...prev,
            customer_name: value,
        }));
    }

    function handleClear() {
        setFilters((prev) => ({
            ...prev,
            customer_name: "",
        }));
    }
    return (
        <div className={"flex items-center gap-2"}>
            <Label className={"text-nowrap"}>Cliente</Label>
            <Input
                type={"text"}
                value={value}
                placeholder={"Digite o nome do cliente"}
                onChange={(e) => handleChange(e.target.value)}
            />
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
