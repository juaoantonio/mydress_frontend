import React from "react";
import { PageContent } from "@/components/page/page-content";
import { DetailAppointmentCard } from "@/app/(private)/agendamentos/components/detail-appointment-card";

export default function AppointmentDetail({
    params: { id },
}: {
    params: {
        id: string;
    };
}) {
    return (
        <PageContent pageTitle={"Detalhes da visita"}>
            <DetailAppointmentCard appointmentId={id} />
        </PageContent>
    );
}
