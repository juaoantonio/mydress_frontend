"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

interface IActiveLinkProps extends LinkProps {
    children: React.ReactNode;
    className: string;
}

export default function ActiveLink({
    children,
    className,
    ...props
}: IActiveLinkProps) {
    const pathname = usePathname();
    const isActive =
        pathname.slice(1).split("/")[0] === props.href.toString().slice(1);

    return (
        <Link
            {...props}
            className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                className,
            )}
        >
            {children}
        </Link>
    );
}
