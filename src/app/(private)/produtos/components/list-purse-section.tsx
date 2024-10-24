import { useMutation, useQuery } from "@tanstack/react-query";
import { PurseService } from "@/services/products/purse.service";
import Loading from "@/app/loading";
import { toast } from "sonner";
import Image from "next/image";
import { List, ListItem } from "@/components/list/list";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { cleanParams, cn, numberToCurrency } from "@/lib/utils";
import { queryClient } from "@/providers/react-query.provider";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import { useQueryParams } from "@/hooks/use-query-params";
import { useState } from "react";
import useProductFilterParams from "../hooks/filter-params";

const PER_NAVIGATION_RANGE = 3;

export function ListPurseSection() {
    const purseService = new PurseService();

    const { available, startDate, endDate } = useProductFilterParams();

    const { page, limit } = useQueryParams({
        page: 1,
        limit: 10,
    });

    const filters = cleanParams({
        page,
        available,
        startDate,
        endDate,
        limit,
    });

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ["clutches", filters],
        queryFn: () =>
            purseService.getAll({
                filters,
            }),
    });

    const [currentPageStartRange, setCurrentPageStartRange] = useState(page);

    const mutation = useMutation({
        mutationFn: (id: string) => purseService.deleteById({ id }),
        onMutate: () => toast.loading("Removendo bolsa"),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["clutches", filters],
            });
            toast.dismiss();
            toast.success("Bolsa removida com sucesso");
            refetch();
        },
        onError: () => {
            toast.dismiss();
            toast.error("Erro ao remover bolsa");
        },
    });

    if (isPending) {
        return (
            <div className={"min-h-[500px]"}>
                <Loading />
            </div>
        );
    }

    if (isError) {
        toast.error("Erro ao buscar bolsas");
        return;
    }

    async function handlePurseDelete(id: string) {
        await mutation.mutateAsync(id);
    }

    return (
        <div className={"space-y-4"}>
            {data?.items.length > 0 &&
                data.items.map((purse) => (
                    <Card
                        key={purse.id}
                        className={
                            "grid grid-cols-[120px,1fr] flex-row overflow-hidden rounded-lg"
                        }
                    >
                        <div className={"relative"}>
                            <div
                                className={cn(
                                    "absolute left-2 top-2 flex aspect-square h-6 items-center justify-center rounded bg-red-500 text-white",
                                    mutation.isPending &&
                                        "pointer-events-none cursor-not-allowed opacity-60",
                                )}
                                onClick={() => handlePurseDelete(purse.id)}
                            >
                                <Trash size={16} />
                            </div>
                            <Image
                                src={purse.imagePath}
                                alt={"Bolsa"}
                                width={200}
                                height={200}
                                className={"aspect-[5/6] h-full object-cover"}
                            />
                        </div>
                        <CardContent className={"space-y-3 py-3"}>
                            <List className={"gap-1.5 text-xs"}>
                                <ListItem
                                    label={"Preço de aluguel"}
                                    value={numberToCurrency(purse.rentPrice)}
                                />
                                <ListItem
                                    label={"Modelo"}
                                    value={purse.model}
                                />
                                <ListItem label={"Cor"} value={purse.color} />
                            </List>
                        </CardContent>
                    </Card>
                ))}

            {data.items.length > 0 && (
                <PaginationControls
                    data={data}
                    currentPageStartRange={currentPageStartRange}
                    setCurrentPageStartRange={setCurrentPageStartRange}
                    perNavigationRange={PER_NAVIGATION_RANGE}
                />
            )}
        </div>
    );
}
