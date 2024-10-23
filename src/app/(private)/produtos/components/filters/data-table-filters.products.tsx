"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Filter } from "lucide-react";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Filters } from "../filters.products";

setDefaultOptions({
    locale: ptBR,
});

export function DataTableFiltersProducts() {
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
