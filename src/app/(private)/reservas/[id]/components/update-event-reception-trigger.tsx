import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EventService } from "@/services/events/event.service";
import { toast } from "sonner";
import { queryClient } from "@/providers/react-query.provider";

const updateEventReceptionSchema = z.object({
    event_reception: z.string().min(1, {
        message: "O campo é obrigatório",
    }),
});

type UpdateEventReceptionType = z.infer<typeof updateEventReceptionSchema>;

export function UpdateEventReceptionTrigger({
    eventId,
    bookingId,
    defaultValue,
}: {
    eventId: string;
    bookingId: string;
    defaultValue: string;
}) {
    const [open, setOpen] = useState(false);

    const form = useForm<UpdateEventReceptionType>({
        resolver: zodResolver(updateEventReceptionSchema),
    });
    const service = new EventService();
    const mutation = useMutation({
        mutationFn: (data: UpdateEventReceptionType) =>
            service.updateById({ id: eventId, data }),
        mutationKey: ["update-event-reception", eventId],
        onMutate: () => {
            toast.loading("Salvando recepção do evento...");
        },
        onError: (error) => {
            console.error(error);
            toast.dismiss();
            toast.error("Erro ao salvar recepção do evento");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
            setOpen(false);
            toast.dismiss();
            toast.success("Sucesso!");
        },
    });

    function handleUpdateEventReception(data: UpdateEventReceptionType) {
        mutation.mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={"w-full flex-1"} type="button">
                    Alterar Recepção do Evento
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className={"text-start"}>
                    <DialogTitle>Informar pagamento da reserva</DialogTitle>
                    <DialogDescription>
                        Digite um valor menor ou igual ao valor total da reserva
                    </DialogDescription>
                </DialogHeader>

                <form
                    className={"space-y-4"}
                    onSubmit={form.handleSubmit(handleUpdateEventReception)}
                >
                    <div className="grid grid-cols-[auto,auto] items-center gap-x-4 gap-y-2">
                        <Label
                            htmlFor="event_reception"
                            className="text-nowrap"
                        >
                            Recepção do evento
                        </Label>

                        <Input
                            {...form.register("event_reception")}
                            defaultValue={defaultValue}
                            id="event_reception"
                        />

                        <p
                            className={
                                "col-span-full text-[0.8rem] font-medium text-destructive"
                            }
                        >
                            {form.formState.errors.event_reception?.message}
                        </p>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Salvar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
