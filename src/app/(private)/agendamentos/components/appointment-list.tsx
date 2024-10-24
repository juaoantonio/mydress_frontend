import { Appointment } from "@/types/appointment.types";

import { useState } from "react";
import { AppointmentCard } from "@/app/(private)/agendamentos/components/appointment-card";
import { AppointmentRescheduleDialog } from "@/app/(private)/agendamentos/components/appointment-reschedule-dialog";
import { useRouter } from "next/navigation";

export function AppointmentList({
    appointments,
    onReschedule,
    onCancel,
    onComplete,
}: {
    appointments: Appointment[];
    onReschedule: (id: string, newDate: Date) => void;
    onCancel: (id: string) => void;
    onComplete: (id: string) => void;
}) {
    const router = useRouter();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<
        string | null
    >(null);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const handleRescheduleClick = (id: string) => {
        setSelectedAppointmentId(id);
        setModalOpen(true);
    };

    const handleReschedule = (data: { newDate: string }) => {
        if (selectedAppointmentId) {
            onReschedule(selectedAppointmentId, new Date(data.newDate));
            setModalOpen(false);
            setSelectedDate(undefined);
        }
    };

    return (
        <div className="space-y-4">
            {appointments.length === 0 ? (
                <p className="text-center text-gray-500">
                    Nenhuma visita agendada.
                </p>
            ) : (
                appointments.map((appointment) => (
                    <AppointmentCard
                        onClick={() =>
                            router.push(`/agendamentos/${appointment.id}`)
                        }
                        key={appointment.id}
                        appointment={appointment}
                        onRescheduleClick={handleRescheduleClick}
                        setSelectedDate={setSelectedDate}
                        onCancel={onCancel}
                        onComplete={onComplete}
                    />
                ))
            )}
            <AppointmentRescheduleDialog
                isOpen={isModalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedDate(undefined);
                }}
                selectedDate={selectedDate}
                onConfirm={handleReschedule}
            />
        </div>
    );
}
