import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationEllipsisButton } from "@/components/pagination/pagination-ellipsis-button";
import { PaginationItemButton } from "@/components/pagination/pagination-item-button";
import { GetPaginatedOutputDto } from "@/services/types";

export function PaginationControls<T extends GetPaginatedOutputDto<any>>({
    data,
    currentPageStartRange,
    setCurrentPageStartRange,
    perNavigationRange,
}: {
    data: T;
    currentPageStartRange: number;
    setCurrentPageStartRange: React.Dispatch<React.SetStateAction<number>>;
    perNavigationRange: number;
}) {
    const handlePreviousNavigationPage = () => {
        setCurrentPageStartRange((prevState) => Math.max(prevState - 1, 1));
    };

    const handleNextNavigationPage = () => {
        setCurrentPageStartRange((prevState) =>
            Math.min(prevState + 1, data.lastPage),
        );
    };

    const handlePreviousPage = () => {
        setCurrentPageStartRange((prevState) => Math.max(prevState - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPageStartRange((prevState) =>
            Math.min(prevState + 1, data.lastPage),
        );
    };

    if (data.lastPage > 3) {
        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={`?page=${Math.max(data.currentPage - 1, 1)}`}
                            text={"Anterior"}
                            disabled={data.isFirstPage}
                            onClick={handlePreviousPage}
                        />
                    </PaginationItem>

                    {currentPageStartRange > 1 && (
                        <PaginationEllipsisButton
                            onClick={handlePreviousNavigationPage}
                        />
                    )}

                    {Array.from({ length: perNavigationRange }).map(
                        (_, index) =>
                            index + currentPageStartRange <= data.lastPage && (
                                <PaginationItemButton
                                    key={index}
                                    index={index}
                                    currentPageStartRange={
                                        currentPageStartRange
                                    }
                                    currentPage={data.currentPage}
                                />
                            ),
                    )}

                    {currentPageStartRange + perNavigationRange - 1 <
                        data.lastPage && (
                        <PaginationEllipsisButton
                            onClick={handleNextNavigationPage}
                        />
                    )}

                    <PaginationItem>
                        <PaginationNext
                            href={`?page=${Math.min(data.currentPage + 1, data.lastPage)}`}
                            text={"Próximo"}
                            disabled={data.isLastPage}
                            onClick={handleNextPage}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={`?page=${Math.max(data.currentPage - 1, 1)}`}
                        text={"Anterior"}
                        disabled={data.isFirstPage}
                        onClick={handlePreviousPage}
                    />
                </PaginationItem>

                {Array.from({ length: data.lastPage }).map((_, index) => (
                    <PaginationItemButton
                        key={index}
                        index={index}
                        currentPageStartRange={1}
                        currentPage={data.currentPage}
                    />
                ))}

                <PaginationItem>
                    <PaginationNext
                        href={`?page=${Math.min(data.currentPage + 1, data.lastPage)}`}
                        text={"Próximo"}
                        disabled={data.isLastPage}
                        onClick={handleNextPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
