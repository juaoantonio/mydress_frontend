import { format } from "date-fns";
import { AppointmentStatus, AppointmentType } from "@/types/appointment.types";
import { Badge } from "@/components/ui/badge";
import { ReactElement } from "react";

export function formatDate(dateString: string) {
    return format(new Date(dateString), "dd/MM/yyyy");
}

export function getStatusBadge(status: AppointmentStatus): ReactElement | null {
    switch (status) {
        case AppointmentStatus.SCHEDULED:
            return <Badge variant="success">Agendado</Badge>;
        case AppointmentStatus.CANCELLED:
            return <Badge variant="danger">Cancelada</Badge>;
        case AppointmentStatus.COMPLETED:
            return <Badge variant="neutral">Concluída</Badge>;
        default:
            return null;
    }
}

export function getAppointmentTypeLabel(type: AppointmentType) {
    switch (type) {
        case AppointmentType.INITIAL_VISIT:
            return "Visita Inicial";
        case AppointmentType.RETURN_FOR_ADJUSTMENT:
            return "Retorno para Ajuste";
        case AppointmentType.PICKUP:
            return "Retirada";
        case AppointmentType.RETURN:
            return "Devolução";
        default:
            return "";
    }
}
