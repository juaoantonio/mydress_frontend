import { useMutation, useQuery } from "@tanstack/react-query";
import { DressService } from "@/services/products/dress.service";
import Loading from "@/app/loading";
import { toast } from "sonner";
import Image from "next/image";
import { List, ListItem } from "@/components/list";
import { Card, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { cn, numberToCurrency } from "@/lib/utils";
import { queryClient } from "@/providers/react-query.provider";
import { DressStatusMapping } from "@/mappings/products.mapping";

export function ListDressSection() {
    const dressService = new DressService();
    const { data, isPending, isError } = useQuery({
        queryKey: ["dresses"],
        queryFn: dressService.getAll,
    });
    const mutation = useMutation({
        mutationFn: (id: string) => dressService.deleteById(id),
        onMutate: () => toast.loading("Removendo vestido"),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dresses"],
            });
            toast.dismiss();
            toast.success("Vestido removido com sucesso");
        },
        onError: () => {
            toast.dismiss();
            toast.error("Erro ao remover vestido");
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
        toast.error("Erro ao buscar vestidos");
        return;
    }

    async function handleDressDelete(id: string) {
        await mutation.mutateAsync(id);
    }

    return (
        <div className={"space-y-4"}>
            {data.map((dress) => (
                <Card
                    key={dress.id}
                    className={
                        "grid grid-cols-[180px,1fr] flex-row overflow-hidden rounded-lg"
                    }
                >
                    <div className={"relative"}>
                        <div
                            className={cn(
                                "absolute left-2.5 top-2.5 flex aspect-square h-7 items-center justify-center rounded bg-red-500 text-white",
                                mutation.isPending &&
                                    "pointer-events-none cursor-not-allowed opacity-60",
                            )}
                            onClick={() => handleDressDelete(dress.id)}
                        >
                            <Trash size={16} />
                        </div>
                        <Image
                            src={dress.img ?? ""}
                            alt={"Vestido"}
                            width={200}
                            height={200}
                            className={
                                "aspect-[5/6] h-full w-full object-cover"
                            }
                        />
                    </div>
                    <CardContent className={"space-y-3 py-3"}>
                        <div className={"space-y-2"}>
                            <h3 className={"text-lg font-semibold"}>
                                {dress.description}
                            </h3>
                            <span className={"inline-block text-xs"}>
                                {DressStatusMapping[dress.status]}
                            </span>
                        </div>
                        <List className={"gap-1.5 text-xs"}>
                            <ListItem
                                label={"Preço de aluguel"}
                                value={numberToCurrency(dress.price)}
                            />
                            <ListItem label={"Modelo"} value={dress.model} />
                            <ListItem label={"Cor"} value={dress.color} />
                            <ListItem label={"Tecido"} value={dress.fabric} />
                            <ListItem
                                label={"Disponível para ajustes"}
                                value={
                                    dress.available_for_adjustment
                                        ? "Sim"
                                        : "Não"
                                }
                            />
                        </List>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
