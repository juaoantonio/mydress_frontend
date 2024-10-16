"use client";

import { useRouter } from "next/navigation";
import { AppointmentService } from "@/services/appointments/appointment.service";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    formatDate,
    getAppointmentTypeLabel,
    getStatusBadge,
} from "@/app/(private)/agendamentos/utils";
import { List, ListItem } from "@/components/list/list";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";

export function DetailAppointmentCard({
    appointmentId,
}: {
    appointmentId: string;
}) {
    const router = useRouter();
    const appointmentService = new AppointmentService();

    const {
        data: appointment,
        isError,
        isPending,
    } = useQuery({
        queryKey: ["appointment", appointmentId],
        queryFn: () => appointmentService.getAppointment(appointmentId),
    });

    if (isError) {
        return <p>Erro ao carregar agendamento</p>;
    }

    if (isPending) {
        return <Loading />;
    }

    const history = appointment?.history || [];

    return (
        <Card className={"h-fit max-w-[800px] flex-1"}>
            <CardHeader
                className={
                    "flex flex-row items-center justify-between space-y-0 py-5 text-sm"
                }
            >
                <CardTitle
                    className={
                        "items-center justify-between text-lg leading-tight"
                    }
                >
                    Agendamento de {appointment.customerName}
                </CardTitle>

                {getStatusBadge(appointment.status)}
            </CardHeader>
            <CardContent className={"space-y-6"}>
                <List className={"grid gap-2 text-sm"}>
                    <ListItem
                        label={"Cliente"}
                        value={appointment.customerName}
                    />
                    <ListItem
                        label={"Data da Visita"}
                        value={formatDate(appointment.appointmentDate)}
                    />
                    <ListItem
                        label={"Data do Evento"}
                        value={formatDate(appointment.eventDate)}
                    />
                    <ListItem
                        label={"Razão da Visita"}
                        value={getAppointmentTypeLabel(appointment.type)}
                    />

                    {appointment.bookingId && (
                        <ListItem
                            label={"Código da Reserva"}
                            value={appointment.bookingId}
                        />
                    )}
                </List>

                <div className={"space-y-3"}>
                    <h2
                        className={
                            "text-lg font-semibold leading-none tracking-tight"
                        }
                    >
                        Histórico da visita
                    </h2>
                    {history.length > 0 ? (
                        <List className={"gap-3 text-xs"}>
                            {history.map((item, index) => (
                                <Fragment key={index}>
                                    {index > 0 && <Separator />}
                                    <div className={"space-y-1"}>
                                        <ListItem
                                            label={"Data da alteração"}
                                            value={formatDate(item.date)}
                                        />

                                        <ListItem
                                            label={
                                                "Data anterior do agendamento"
                                            }
                                            value={formatDate(
                                                item.appointmentDate,
                                            )}
                                        />
                                    </div>
                                </Fragment>
                            ))}
                        </List>
                    ) : (
                        <p className={"text-muted-foreground"}>Sem histórico</p>
                    )}
                </div>

                <div className={"flex flex-col gap-2"}>
                    <Button
                        className={"w-full flex-1"}
                        type="button"
                        variant={"outline"}
                        onClick={() => router.back()}
                    >
                        Voltar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
