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
    return (
        <PaginationItem>
            <PaginationLink
                href={`?page=${index + currentPageStartRange}`}
                isActive={currentPage === index + currentPageStartRange}
            >
                {index + currentPageStartRange}
            </PaginationLink>
        </PaginationItem>
    );
}
