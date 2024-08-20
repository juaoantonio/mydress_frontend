import { useMutation, useQuery } from "@tanstack/react-query";
import { DressService } from "@/services/products/dress.service";
import Loading from "@/app/loading";
import { toast } from "sonner";
import Image from "next/image";
import { List, ListItem } from "@/components/list";
import { Card, CardContent } from "@/components/ui/card";
import { DressStatus } from "@/types/products/product.enums";
import { ReactElement } from "react";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { queryClient } from "@/providers/react-query.provider";

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
                <Card key={dress.id} className={"overflow-hidden"}>
                    <div className={"relative mb-4"}>
                        <div
                            className={cn(
                                "absolute right-4 top-4 flex aspect-square h-9 items-center justify-center rounded-lg bg-red-500 text-white",
                                mutation.isPending &&
                                    "pointer-events-none cursor-not-allowed opacity-60",
                            )}
                            onClick={() => handleDressDelete(dress.id)}
                        >
                            <Trash />
                        </div>
                        <Image
                            src={dress.img ?? ""}
                            alt={"Vestido"}
                            width={200}
                            height={200}
                            className={
                                "h-[500px] max-h-[500px] w-full object-cover"
                            }
                        />
                    </div>
                    <CardContent className={"space-y-3"}>
                        <div className={"flex items-center justify-between"}>
                            <h3 className={"text-lg font-semibold"}>
                                {dress.description}
                            </h3>
                            <span className={"inline-block text-sm"}>
                                {DressStatusMapping[dress.status]}
                            </span>
                        </div>
                        <List className={"gap-1.5"}>
                            <ListItem label={"Modelo"} value={dress.model} />
                            <ListItem label={"Cor"} value={dress.color} />
                            <ListItem label={"Tecido"} value={dress.fabric} />
                        </List>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export const DressStatusMapping: {
    [key in DressStatus]: ReactElement;
} = {
    [DressStatus.AVAILABLE]: (
        <span className={"rounded bg-green-500 px-2 py-1 text-white"}>
            Disponível
        </span>
    ),
    [DressStatus.OUT_OF_STOCK]: (
        <span className={"rounded bg-red-500 px-2 py-1 text-white"}>
            Indisponível
        </span>
    ),
    [DressStatus.PICKED_UP]: (
        <span className={"rounded bg-yellow-500 px-2 py-1 text-white"}>
            Retirado
        </span>
    ),
    [DressStatus.BOOKED]: (
        <span className={"rounded bg-blue-500 px-2 py-1 text-white"}>
            Reservado
        </span>
    ),
    [DressStatus.RETURNED]: (
        <span className={"rounded bg-purple-500 px-2 py-1 text-white"}>
            Devolvido
        </span>
    ),
    [DressStatus.DAMAGED]: (
        <span className={"rounded bg-red-500 px-2 py-1 text-white"}>
            Danificado
        </span>
    ),
    [DressStatus.IN_WASH]: (
        <span className={"rounded bg-blue-500 px-2 py-1 text-white"}>
            Em lavagem
        </span>
    ),
};
