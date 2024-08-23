import { ReactNode } from "react";

export function PageSection({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <div className={"space-y-3"}>
            <h2 className={"text-lg font-medium text-gray-600"}>{title}</h2>

            {children}
        </div>
    );
}
