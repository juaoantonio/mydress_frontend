import { useMutation, useQuery } from "@tanstack/react-query";
import { DressService } from "@/services/products/dress.service";
import Loading from "@/app/loading";
import { toast } from "sonner";
import Image from "next/image";
import { List, ListItem } from "@/components/list/list";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { cn, numberToCurrency } from "@/lib/utils";
import { queryClient } from "@/providers/react-query.provider";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import { useQueryParams } from "@/hooks/use-query-params";
import { useState } from "react";

const PER_NAVIGATION_RANGE = 3;

export function ListDressSection() {
    const dressService = new DressService();

    const { page, limit } = useQueryParams({
        page: 1,
        limit: 10,
    });

    const { data, isPending, isError } = useQuery({
        queryKey: ["dresses", page, limit],
        queryFn: () =>
            dressService.getAll({
                filters: {
                    page,
                    limit,
                },
            }),
    });

    const [currentPageStartRange, setCurrentPageStartRange] = useState(page);

    const mutation = useMutation({
        mutationFn: (id: string) => dressService.deleteById({ id }),
        onMutate: () => toast.loading("Removendo vestido"),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dresses", page, limit],
            });
            toast.dismiss();
            toast.success("Vestido removido com sucesso");
        },
        onError: () => {
            toast.dismiss();
            toast.error("Erro ao remover vestido");
        },
    });

    async function handleDressDelete(id: string) {
        await mutation.mutateAsync(id);
    }

    if (isPending) {
        return (
            <div className={"min-h-[500px]"}>
                <Loading />
            </div>
        );
    }

    if (isError) {
        toast.error("Erro ao buscar vestidos");
        return;
    }

    return (
        <div className={"space-y-4"}>
            {data?.items.length > 0 &&
                data.items.map((dress) => (
                    <Card
                        key={dress.id}
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
                                onClick={() => handleDressDelete(dress.id)}
                            >
                                <Trash size={16} />
                            </div>
                            <Image
                                src={dress.imagePath}
                                alt={"Vestido"}
                                width={200}
                                height={200}
                                className={"aspect-[5/6] h-full object-cover"}
                            />
                        </div>
                        <CardContent className={"space-y-3 py-3"}>
                            <List className={"gap-1.5 text-xs"}>
                                <ListItem
                                    label={"Preço de aluguel"}
                                    value={numberToCurrency(dress.rentPrice)}
                                />
                                <ListItem
                                    label={"Modelo"}
                                    value={dress.model}
                                />
                                <ListItem label={"Cor"} value={dress.color} />
                                <ListItem
                                    label={"Tecido"}
                                    value={dress.fabric}
                                />
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
