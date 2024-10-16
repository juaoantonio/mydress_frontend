"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppointmentService } from "@/services/appointments/appointment.service";
import { ScheduleInitialVisitInputDto } from "@/services/appointments/appointment.dto";
import { DatePicker } from "@/components/ui/date-picker";
import { scheduleInitialVisitSchema } from "@/schemas/appointment.schemas";
import { DevTool } from "@hookform/devtools";

type ScheduleInitialVisitFormType = z.infer<typeof scheduleInitialVisitSchema>;

export function ScheduleInitialVisitForm() {
    const router = useRouter();
    const form = useForm<ScheduleInitialVisitFormType>({
        resolver: zodResolver(scheduleInitialVisitSchema),
        defaultValues: {
            appointmentDate: "",
            eventDate: "",
            customerName: "",
        },
    });

    const service = new AppointmentService();
    const mutation = useMutation({
        mutationFn: (data: ScheduleInitialVisitInputDto) =>
            service.scheduleInitialVisit(data),
        onMutate: () => toast.loading("Agendando visita inicial..."),
        onError: (error) => {
            toast.dismiss();
            toast.error("Erro ao agendar visita inicial");
            console.error(error);
        },
        onSuccess: () => {
            toast.dismiss();
            toast.success("Visita inicial agendada com sucesso!");
            router.replace("/agendamentos");
        },
    });

    async function handleSubmit(data: ScheduleInitialVisitFormType) {
        mutation.mutate(data);
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className={"space-y-4"}
                >
                    <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome da Cliente</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Exemplo: Marina Silva"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DatePicker
                        control={form.control}
                        name="appointmentDate"
                        label="Data da visita"
                        placeholder="Selecione a data da visita"
                    />

                    <DatePicker
                        control={form.control}
                        name="eventDate"
                        label="Data do Evento"
                        placeholder="Selecione a data do evento"
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
