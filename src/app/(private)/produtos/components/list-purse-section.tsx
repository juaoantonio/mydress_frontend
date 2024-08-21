import { PurseService } from "@/services/products/purse.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/providers/react-query.provider";
import Loading from "@/app/loading";
import { Card, CardContent } from "@/components/ui/card";
import { cn, numberToCurrency } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import { List, ListItem } from "@/components/list";
import { DressStatusMapping } from "@/mappings/products.mapping";

export function ListPurseSection() {
    const purseService = new PurseService();
    const { data, isPending, isError } = useQuery({
        queryKey: ["purses"],
        queryFn: purseService.getAll,
    });

    const mutation = useMutation({
        mutationFn: (id: string) => purseService.deleteById(id),
        onMutate: () => toast.loading("Removendo bolsa"),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["purses"],
            });
            toast.dismiss();
            toast.success("Bolsa removida com sucesso");
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
        mutation.mutate(id);
    }

    return (
        <div className={"space-y-4"}>
            {data.map((purse) => (
                <Card
                    key={purse.id}
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
                            onClick={() => handlePurseDelete(purse.id)}
                        >
                            <Trash size={16} />
                        </div>
                        <Image
                            src={purse.img ?? ""}
                            alt={"Vestido"}
                            width={200}
                            height={200}
                            className={"h-full w-full object-cover"}
                        />
                    </div>
                    <CardContent className={"space-y-3 py-3"}>
                        <div className={"space-y-2"}>
                            <h3 className={"text-lg font-semibold"}>
                                {purse.description}
                            </h3>
                            <span className={"inline-block text-xs"}>
                                {DressStatusMapping[purse.status]}
                            </span>
                        </div>
                        <List className={"gap-1.5 text-xs"}>
                            <ListItem
                                label={"Preço de aluguel"}
                                value={numberToCurrency(purse.price)}
                            />
                            <ListItem label={"Modelo"} value={purse.model} />
                            <ListItem label={"Cor"} value={purse.color} />
                        </List>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
