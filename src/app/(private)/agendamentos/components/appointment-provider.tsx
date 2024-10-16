"use client";

import { AppointmentService } from "@/services/appointments/appointment.service";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import { AppointmentList } from "@/app/(private)/agendamentos/components/appointment-list";
import { RescheduleAppointmentInputDto } from "@/services/appointments/appointment.dto";
import { useQueryParams } from "@/hooks/use-query-params";
import { SortDirection } from "@/services/types";
import { queryClient } from "@/providers/react-query.provider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useCreateQueryString } from "@/hooks/use-create-query-string";

const PER_NAVIGATION_RANGE = 3;

export function AppointmentProvider() {
    const router = useRouter();
    const createQueryString = useCreateQueryString();
    const {
        page,
        limit,
        sort,
        sortDir,
        appointmentDate,
        customerName,
        includeAll,
    } = useQueryParams({
        page: 1,
        limit: 5,
        sort: "appointmentDate",
        sortDir: "desc" as SortDirection,
        appointmentDate: undefined,
        customerName: undefined,
        includeAll: false,
    });

    const service = new AppointmentService();
    const { data, isError, isPending } = useQuery({
        queryKey: [
            "appointments",
            page,
            limit,
            sort,
            sortDir,
            appointmentDate,
            customerName,
            includeAll,
        ],
        queryFn: () =>
            service.getPaginated({
                page,
                limit,
                sort,
                sortDir,
                appointmentDate,
                customerName,
                includeAll,
            }),
        placeholderData: keepPreviousData,
    });
    const rescheduleMutation = useMutation({
        mutationFn: (input: RescheduleAppointmentInputDto) =>
            service.reescheduleAppointment(input),
        onMutate: () => toast.loading("Reagendando visita"),
        onError: (e) => {
            toast.dismiss();
            toast.error("Erro ao reagendar visita");
            console.error(e);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [
                    "appointments",
                    page,
                    limit,
                    sort,
                    sortDir,
                    appointmentDate,
                    customerName,
                    includeAll,
                ],
            });
            toast.dismiss();
            toast.success("Visita reagendada com sucesso");
        },
    });
    const cancelMutation = useMutation({
        mutationFn: (id: string) => service.cancelAppointment(id),
        onMutate: () => toast.loading("Cancelando visita"),
        onError: (e) => {
            toast.dismiss();
            toast.error("Erro ao cancelar visita");
            console.error(e);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [
                    "appointments",
                    page,
                    limit,
                    sort,
                    sortDir,
                    appointmentDate,
                    customerName,
                    includeAll,
                ],
            });
            toast.dismiss();
            toast.success("Visita cancelada com sucesso");
        },
    });
    const completeMutation = useMutation({
        mutationFn: (id: string) => service.completeAppointment(id),
        onMutate: () => toast.loading("Finalizando visita"),
        onError: (e) => {
            toast.dismiss();
            toast.error("Erro ao finalizar visita");
            console.error(e);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [
                    "appointments",
                    page,
                    limit,
                    sort,
                    sortDir,
                    appointmentDate,
                    customerName,
                    includeAll,
                ],
            });
            toast.dismiss();
            toast.success("Visita finalizada com sucesso");
        },
    });
    const [currentPageStartRange, setCurrentPageStartRange] = useState(page);

    useEffect(() => {
        if (data?.lastPage) {
            setCurrentPageStartRange((prevState) => {
                if (prevState === data.lastPage) {
                    return data.lastPage - PER_NAVIGATION_RANGE + 1;
                }
                return prevState;
            });
        }
    }, [page, data]);

    if (isPending) {
        return (
            <div className={"flex items-center justify-center"}>
                <LoadingSpinner />
            </div>
        );
    }

    if (isError) {
        toast.error("Erro ao carregar agendamentos");
        return;
    }

    return (
        <div className={"space-y-6"}>
            <div className="flex items-center space-x-2">
                <Switch
                    id="include"
                    defaultChecked={true}
                    onCheckedChange={(checked) => {
                        const queryString = createQueryString({
                            includeAll: !checked,
                        });
                        router.push(`?${queryString}`);
                    }}
                />
                <Label htmlFor="include">Mostar apenas visitas ativas</Label>
            </div>
            <AppointmentList
                appointments={data.items}
                onReschedule={(id: string, newDate: Date) =>
                    rescheduleMutation.mutate({
                        appointmentId: id,
                        newDate: newDate.toISOString(),
                    })
                }
                onCancel={(id: string) => cancelMutation.mutate(id)}
                onComplete={(id: string) => completeMutation.mutate(id)}
            />
            <PaginationControls
                data={data}
                currentPageStartRange={currentPageStartRange}
                setCurrentPageStartRange={setCurrentPageStartRange}
                perNavigationRange={PER_NAVIGATION_RANGE}
            />
        </div>
    );
}
