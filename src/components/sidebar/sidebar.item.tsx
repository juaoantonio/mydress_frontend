import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ActiveLink from "@/components/sidebar/sidebar.active-link";

interface ISidebarItem {
    tooltipText: string;
    link: string;
    icon: {
        Component: LucideIcon;
        className?: string;
    };
}

export default function SidebarItem({ icon, tooltipText, link }: ISidebarItem) {
    return (
        <Tooltip>
            <TooltipTrigger>
                <ActiveLink
                    href={link}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                    <icon.Component className={cn("h-5 w-5", icon.className)} />
                    <span className="sr-only">{tooltipText}</span>
                </ActiveLink>
            </TooltipTrigger>
            <TooltipContent side="right">{tooltipText}</TooltipContent>
        </Tooltip>
    );
}
