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
}: {
    label: string;
    value: string | number | ReactElement;
    className?: string;
}) {
    const mergedClassName = cn("flex items-center justify-between", className);

    return (
        <li className={mergedClassName}>
            <span className="inline-block text-muted-foreground">{label}</span>
            <span className={"inline-block text-right"}>{value}</span>
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
    values: { label: string; value: string }[];
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
            <div className={"flex-1 space-y-2"}>
                <h3 className="font-semibold">{label}</h3>
                <List className={"gap-2 text-xs"}>
                    {values.map(({ label, value }) => (
                        <ListItem key={label} label={label} value={value} />
                    ))}
                </List>
            </div>
        </li>
    );
}
