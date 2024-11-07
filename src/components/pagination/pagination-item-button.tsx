import { PaginationItem, PaginationLink } from "@/components/ui/pagination";

export function PaginationItemButton({
    index,
    currentPageStartRange,
    currentPage,
}: {
    index: number;
    currentPageStartRange: number;
    currentPage: number;
}) {
    const currentSearchParams = new URLSearchParams(window.location.search);

    currentSearchParams.set("page", (index + currentPageStartRange).toString());

    const newUrl = `?${currentSearchParams.toString()}`;

    return (
        <PaginationItem>
            <PaginationLink
                href={newUrl}
                isActive={currentPage === index + currentPageStartRange}
            >
                {index + currentPageStartRange}
            </PaginationLink>
        </PaginationItem>
    );
}
