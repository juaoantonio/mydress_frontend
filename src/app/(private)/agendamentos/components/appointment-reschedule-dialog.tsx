import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const appointmentRescheduleSchema = z.object({
    newDate: z
        .string({ message: "A data de agendamento é obrigatória" })
        .datetime()
        .refine((date) => {
            return new Date(date) > new Date();
        }, "A data de agendamento não pode ser no passado"),
});
type AppointmentRescheduleFormType = z.infer<
    typeof appointmentRescheduleSchema
>;

export function AppointmentRescheduleDialog({
    isOpen,
    onClose,
    selectedDate,
    onConfirm,
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedDate?: Date;
    onConfirm: (data: AppointmentRescheduleFormType) => void;
}) {
    const form = useForm<AppointmentRescheduleFormType>({
        resolver: zodResolver(appointmentRescheduleSchema),
    });

    function handleSubmit(data: AppointmentRescheduleFormType) {
        onConfirm(data);
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Reagendar Visita</DialogTitle>
                            <DialogDescription>
                                Escolha uma nova data para o agendamento
                            </DialogDescription>
                        </DialogHeader>

                        <DatePicker
                            control={form.control}
                            name="newDate"
                            label="Data da visita"
                            placeholder="Selecione a data da visita"
                            defaultDate={selectedDate}
                        />

                        <DialogFooter className={"pt-4"}>
                            <Button variant="secondary" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button variant="default" type={"submit"}>
                                Confirmar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
