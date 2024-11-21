"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppointmentService } from "@/services/appointments/appointment.service";
import { ScheduleAdjustmentReturnInputDto } from "@/services/appointments/appointment.dto";
import { DatePicker } from "@/components/ui/date-picker";
import {
    scheduleAdjustmentReturnVisitSchema,
    scheduleInitialVisitSchema,
} from "@/schemas/appointment.schemas";
import { DevTool } from "@hookform/devtools";

type ScheduleAdjustmentReturnFormType = z.infer<
    typeof scheduleAdjustmentReturnVisitSchema
>;

export function ScheduleAdjustmentReturnForm({
    bookingId,
}: {
    bookingId: string;
}) {
    const router = useRouter();
    const form = useForm<ScheduleAdjustmentReturnFormType>({
        resolver: zodResolver(scheduleInitialVisitSchema),
        defaultValues: {
            appointmentDate: "",
            bookingId,
        },
    });

    const service = new AppointmentService();
    const mutation = useMutation({
        mutationFn: (data: ScheduleAdjustmentReturnInputDto) =>
            service.scheduleAdjustmentReturnVisit(data),
        onMutate: () => toast.loading("Agendando visita para ajustes..."),
        onError: (error) => {
            toast.dismiss();
            toast.error("Erro ao agendar visita");
            console.error(error);
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Visita agendada com sucesso!");
            router.replace("/agendamentos");
        },
    });

    async function handleSubmit(data: any) {
        mutation.mutate(data);
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className={"space-y-4"}
                >
                    <DatePicker
                        control={form.control}
                        name="appointmentDate"
                        label="Data da visita"
                        placeholder="Selecione a data da visita"
                    />

                    <FormMessage>
                        {form.formState.errors.root?.message}
                    </FormMessage>

                    <div className="flex gap-2">
                        <Button
                            className="flex-1"
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                        >
                            Cancelar
                        </Button>
                        <Button
                            className="flex-1"
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? "Salvando..."
                                : "Agendar Visita"}
                        </Button>
                    </div>
                </form>
            </Form>
            <DevTool control={form.control} />
        </>
    );
}
