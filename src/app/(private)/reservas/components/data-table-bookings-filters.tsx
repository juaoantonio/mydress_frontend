"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCreateQueryString } from "@/hooks/useCreateQueryString";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { CalendarIcon, Filter, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, setDefaultOptions } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

setDefaultOptions({
    locale: ptBR,
});

export function DataTableBookingsFilters() {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex items-center">
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button
                        size={"sm"}
                        variant="outline"
                        className="items-center justify-start gap-2"
                    >
                        Filtros
                        <Filter className={"text-foreground"} size={18} />
                    </Button>
                </DrawerTrigger>
                <DrawerContent onOpenAutoFocus={(e) => e.stopPropagation()}>
                    <Filters handleClose={() => setOpen(false)} />
                </DrawerContent>
            </Drawer>
        </div>
    );
}

function Filters({ handleClose }: { handleClose: () => void }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const createQueryString = useCreateQueryString();

    const status = searchParams.get("status") ?? "";

    const event_date = searchParams.get("event_date")
        ? searchParams.get("event_date") + "T00:00:00"
        : "";
    const customer_name = searchParams.get("customer_name") ?? "";

    const [filters, setFilters] = useState({
        status,
        event_date,
        customer_name,
    });

    function handleApplyFilters() {
        const queryString = createQueryString(filters);
        router.push(`${pathname}?${queryString}`);
        handleClose();
    }

    console.log(filters.event_date);

    return (
        <div>
            <DrawerHeader>
                <DrawerTitle className={"text-left"}>Filtros</DrawerTitle>
            </DrawerHeader>

            <div className={"space-y-3 p-4 pb-0"}>
                <div className={"flex items-center gap-2"}>
                    <Label>Status</Label>
                    <Select
                        value={filters.status}
                        onValueChange={(value) =>
                            setFilters((prev) => ({ ...prev, status: value }))
                        }
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
                                <SelectItem value="CANCELED">
                                    Cancelada
                                </SelectItem>
                                <SelectItem value="CONCLUDED">
                                    Concluída
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                        variant={"destructive"}
                        className={"aspect-square p-1"}
                        onClick={() =>
                            setFilters((prev) => ({ ...prev, status: "" }))
                        }
                    >
                        <X size={18} />
                    </Button>
                </div>
                <div className={"flex items-center gap-2"}>
                    <Label className={"text-nowrap"}>Cliente</Label>
                    <Input
                        type={"text"}
                        value={filters.customer_name}
                        placeholder={"Digite o nome do cliente"}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                customer_name: e.target.value,
                            }))
                        }
                    />
                    <Button
                        variant={"destructive"}
                        className={"aspect-square p-1"}
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                customer_name: "",
                            }))
                        }
                    >
                        <X size={18} />
                    </Button>
                </div>
                <div className={"flex items-center gap-2"}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !filters.event_date &&
                                        "text-muted-foreground",
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {filters.event_date ? (
                                    format(filters.event_date, "PPP")
                                ) : (
                                    <span>Escolha a data do evento</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-auto p-0"
                            onOpenAutoFocus={(e) => e.stopPropagation()}
                        >
                            <Calendar
                                mode="single"
                                locale={ptBR}
                                selected={
                                    filters.event_date
                                        ? new Date(filters.event_date)
                                        : undefined
                                }
                                onSelect={(date) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        event_date: date
                                            ? date.toISOString().split("T")[0]
                                            : "",
                                    }))
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <Button
                        variant={"destructive"}
                        className={"aspect-square p-1"}
                        onClick={() =>
                            setFilters((prev) => ({ ...prev, event_date: "" }))
                        }
                    >
                        <X size={18} />
                    </Button>
                </div>
            </div>

            <DrawerFooter>
                <Button onClick={handleApplyFilters}>Aplicar Filtros</Button>
                <DrawerClose asChild>
                    <Button variant="outline">Cancelar</Button>
                </DrawerClose>
            </DrawerFooter>
        </div>
    );
}
