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
    appointmentDate: z
        .string()
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
    onDateChange,
    onConfirm,
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedDate?: Date;
    onDateChange: (date: Date | undefined) => void;
    onConfirm: () => void;
}) {
    const form = useForm<AppointmentRescheduleFormType>({
        defaultValues: {
            appointmentDate: selectedDate?.toISOString(),
        },
        resolver: zodResolver(appointmentRescheduleSchema),
    });

    function handleSubmit(data: AppointmentRescheduleFormType) {
        onDateChange(new Date(data.appointmentDate));
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reagendar Visita</DialogTitle>
                    <DialogDescription>
                        Escolha uma nova data para o agendamento
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <DatePicker
                            control={form.control}
                            name="appointmentDate"
                            label="Data da visita"
                            placeholder="Selecione a data da visita"
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="default" onClick={onConfirm}>
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
