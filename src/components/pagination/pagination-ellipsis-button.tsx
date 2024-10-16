import { PaginationEllipsis } from "@/components/ui/pagination";

export function PaginationEllipsisButton({ onClick }: { onClick: () => void }) {
    return <PaginationEllipsis onClick={onClick} />;
}
