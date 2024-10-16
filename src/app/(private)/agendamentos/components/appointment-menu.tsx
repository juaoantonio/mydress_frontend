import { Button } from "@/components/ui/button";
import {
    CalendarClock,
    CheckCircle,
    MoreHorizontal,
    XCircle,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppointmentMenu({
    appointmentId,
    onRescheduleClick,
    onCancel,
    onComplete,
}: {
    appointmentId: string;
    onRescheduleClick: (id: string) => void;
    onCancel: (id: string) => void;
    onComplete: (id: string) => void;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => onRescheduleClick(appointmentId)}
                >
                    <CalendarClock className="mr-2 h-4 w-4 text-blue-500" />
                    Reagendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCancel(appointmentId)}>
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    Cancelar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onComplete(appointmentId)}>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Concluir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
