import { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function List({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    const mergedClassName = cn("grid gap-3", className);
    return <ul className={mergedClassName}>{children}</ul>;
}

export function ListItem({
    label,
    value,
    className,
    textLeft = false,
}: {
    label: string;
    value: string | number | ReactElement | null;
    className?: string;
    textLeft?: boolean;
}) {
    const mergedClassName = cn("flex items-center gap-2", className, {
        "justify-between": !textLeft,
    });

    return (
        <li className={mergedClassName}>
            <span className="inline-block text-muted-foreground">{label}</span>
            <span
                className={cn("inline-block", {
                    "text-right": !textLeft,
                })}
            >
                {value}
            </span>
        </li>
    );
}

export function ImageListItem({
    img,
    imgAlt,
    label,
    values,
}: {
    img: string | null;
    imgAlt: string;
    label: string;
    values?: { label: string; value: string }[];
}) {
    return (
        <li className="flex gap-3">
            <Image
                width={100}
                height={100}
                src={img ?? ""}
                alt={imgAlt}
                className="h-[125px] w-[125px] rounded object-cover object-center"
            />
            <div
                className={cn("flex-1 space-y-2", {
                    "flex flex-col items-center justify-center": !values,
                })}
            >
                <h3 className={"text-nowrap font-semibold"}>{label}</h3>
                {values && (
                    <List className={"gap-2 text-xs"}>
                        {values.map(({ label, value }) => (
                            <ListItem key={label} label={label} value={value} />
                        ))}
                    </List>
                )}
            </div>
        </li>
    );
}
