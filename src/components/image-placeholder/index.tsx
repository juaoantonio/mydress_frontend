import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({
    className,
    description,
}: {
    className?: string;
    description?: string;
}) {
    const mergedClassName = cn(
        "flex aspect-square w-full flex-col gap-3 items-center justify-center bg-secondary",
        className,
    );

    return (
        <div className={mergedClassName}>
            <span
                className={"rounded-full bg-neutral-200 p-7 text-neutral-500"}
            >
                <ImageIcon size={28} />
            </span>
            {description && (
                <p
                    className={
                        "max-w-[20ch] text-center text-xs text-muted-foreground"
                    }
                >
                    {description}
                </p>
            )}
        </div>
    );
}
