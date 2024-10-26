import { useMutation, useQuery } from "@tanstack/react-query";
import { ClutchService } from "@/services/products/clutch.service";
import Loading from "@/app/loading";
import { toast } from "sonner";
import Image from "next/image";
import { List, ListItem } from "@/components/list/list";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";
import { cleanParams, cn, numberToCurrency } from "@/lib/utils";
import { queryClient } from "@/providers/react-query.provider";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import { useQueryParams } from "@/hooks/use-query-params";
import { useState } from "react";
import useProductFilterParams from "../hooks/filter-params";
import Link from "next/link";

const PER_NAVIGATION_RANGE = 3;

export function ListClutchSection() {
    const clutchService = new ClutchService();

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
            clutchService.getAll({
                filters,
            }),
    });

    const [currentPageStartRange, setCurrentPageStartRange] = useState(page);

    const mutation = useMutation({
        mutationFn: (id: string) => clutchService.deleteById({ id }),
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

    async function handleClutchDelete(id: string) {
        await mutation.mutateAsync(id);
    }

    return (
        <div className={"space-y-4"}>
            {data?.items.length > 0 &&
                data.items.map((Clutch) => (
                    <Card
                        key={Clutch.id}
                        className={
                            "grid grid-cols-[120px,1fr] flex-row overflow-hidden rounded-lg"
                        }
                    >
                        <div className={"relative"}>
                            <div className="flex items-center bg-blue-50">
                                <div className="absolute left-2 top-2 flex space-x-2">
                                    <div
                                        className={cn(
                                            "flex aspect-square h-6 items-center justify-center rounded bg-red-500 text-white",
                                            mutation.isPending &&
                                                "pointer-events-none cursor-not-allowed opacity-60",
                                        )}
                                        onClick={() =>
                                            handleClutchDelete(Clutch.id)
                                        }
                                    >
                                        <Trash
                                            className="cursor-pointer"
                                            size={16}
                                        />
                                    </div>
                                    <Link
                                        href={`/produtos/editar/${Clutch.id}?type=clutch`}
                                    >
                                        <div className="rounded-md bg-blue-700 p-[0.18rem]">
                                            <Pencil
                                                color="white"
                                                className="cursor-pointer"
                                                size={18}
                                            />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <Image
                                src={Clutch.imagePath}
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
                                    value={numberToCurrency(Clutch.rentPrice)}
                                />
                                <ListItem
                                    label={"Modelo"}
                                    value={Clutch.model}
                                />
                                <ListItem label={"Cor"} value={Clutch.color} />
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
