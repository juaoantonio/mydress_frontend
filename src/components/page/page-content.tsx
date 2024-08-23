import { ReactNode } from "react";

export function PageContent({
    pageTitle,
    pageActionsElement,
    children,
}: {
    pageTitle: string;
    children: ReactNode;
    pageActionsElement?: ReactNode;
}) {
    return (
        <section className={"mt-3 flex flex-col gap-8"}>
            <div className={"flex items-center justify-between"}>
                <h1 className={"self-auto text-2xl font-semibold"}>
                    {pageTitle}
                </h1>
                {pageActionsElement}
            </div>

            <div className={"space-y-7"}>{children}</div>
        </section>
    );
}
