import { Appointment, AppointmentStatus } from "@/types/appointment.types";
import { List, ListItem } from "@/components/list/list";
import { AppointmentMenu } from "@/app/(private)/agendamentos/components/appointment-menu";
import {
    formatDate,
    getAppointmentTypeLabel,
    getStatusBadge,
} from "@/app/(private)/agendamentos/utils";

export function AppointmentCard({
    appointment,
    onRescheduleClick,
    onCancel,
    onComplete,
    onClick,
    setSelectedDate,
}: {
    appointment: Appointment;
    onRescheduleClick: (id: string) => void;
    onCancel: (id: string) => void;
    onComplete: (id: string) => void;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    setSelectedDate: (date?: Date) => void;
}) {
    return (
        <div className="space-y-4 rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h2 className="mb-2 text-lg font-semibold">
                    {appointment.customerName}
                </h2>
                {appointment.status === AppointmentStatus.SCHEDULED && (
                    <AppointmentMenu
                        appointmentId={appointment.id}
                        onOpenChange={(open) => {
                            open
                                ? setSelectedDate(
                                      new Date(appointment.appointmentDate),
                                  )
                                : setSelectedDate(undefined);
                        }}
                        onRescheduleClick={(id) => onRescheduleClick(id)}
                        onCancel={onCancel}
                        onComplete={onComplete}
                    />
                )}
            </div>

            <div
                className="flex cursor-pointer items-center justify-between"
                onClick={onClick}
            >
                <List className="gap-1">
                    <ListItem
                        className="gap-2 text-sm"
                        label="Data da visita:"
                        value={formatDate(appointment.appointmentDate)}
                    />
                    <ListItem
                        className="gap-2 text-sm"
                        label="Data do evento:"
                        value={formatDate(appointment.eventDate)}
                    />
                    <ListItem
                        className="gap-2 text-sm"
                        label="Razão da visita:"
                        value={getAppointmentTypeLabel(appointment.type)}
                    />
                </List>

                <div className="flex flex-col items-end space-y-2">
                    {getStatusBadge(appointment.status)}
                </div>
            </div>
        </div>
    );
}
