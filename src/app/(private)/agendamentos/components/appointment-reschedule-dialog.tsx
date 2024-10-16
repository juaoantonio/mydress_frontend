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
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reagendar Visita</DialogTitle>
                    <DialogDescription>
                        Escolha uma nova data para o agendamento
                    </DialogDescription>
                </DialogHeader>
                <DatePicker
                    selectedDate={selectedDate}
                    onDateChange={onDateChange}
                />
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
