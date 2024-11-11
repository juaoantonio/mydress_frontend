"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn, handleCreationFormError } from "@/lib/utils";
import {
    BookingFormType,
    createBookingSchema,
} from "@/schemas/booking.schemas";
import { BookingService } from "@/services/bookings/booking.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import {
    Popover,
    PopoverContent,
    PopoverPortal,
    PopoverTrigger,
} from "@/components/ui/popover";
import { getSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format, setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCreateQueryString } from "@/hooks/use-create-query-string";

export interface Props {
    service: BookingService;
}

setDefaultOptions({ locale: ptBR });

function handleBookingCreationError(
    error: unknown,
    form: UseFormReturn<BookingFormType>,
) {
    handleCreationFormError(
        error,
        form,
        "Erro ao criar a reserva",
        (message) => message,
    );
}

export default function BasicForm({ service }: Props) {
    const router = useRouter();

    const form = useForm<BookingFormType>({
        resolver: zodResolver(createBookingSchema),
        defaultValues: {
            customer: "",
        },
    });

    const createQueryString = useCreateQueryString();

    const mutation = useMutation({
        mutationFn: async (data: BookingFormType) => {
            return service.create({
                eventDate: data.eventDate.toISOString(),
                customerName: data.customer,
                expectedPickUpDate: data.expectedPickUpDate!.toISOString(),
                expectedReturnDate: data.expectedReturnDate!.toISOString(),
            });
        },
        onMutate: () => toast.loading("Criando reserva"),
        onError: (error) => {
            toast.dismiss();
            toast.error(String(error));
            handleBookingCreationError(error, form);
        },
        onSuccess: async (data, variables) => {
            toast.dismiss();
            toast.success("Reserva criada com sucesso!");
            const queryString = createQueryString({
                step: 2,
                bookingId: data.bookingId,
                expectedDate: variables.expectedPickUpDate.toISOString(),
                returnDate: variables.expectedReturnDate.toISOString(),
            });
            router.push(`?${queryString}`);
        },
    });

    async function handleBookingCreation(data: BookingFormType) {
        const session = await getSession();
        if (!session) {
            toast.error(
                "Você precisa estar logado para criar uma nova reserva!",
            );
            return;
        }
        mutation.mutate(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleBookingCreation)}
                className={"space-y-4"}
            >
                <div className={"grid gap-3 lg:grid-cols-2 lg:gap-4"}>
                    <FormField
                        control={form.control}
                        name={"customer"}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Nome do Cliente"
                                        id={"customer"}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>
                                    {form.formState.errors.customer?.message}
                                </FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"eventDate"}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Data do evento</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>
                                                        Escolha uma data
                                                    </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverPortal>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                locale={ptBR}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </PopoverPortal>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"expectedPickUpDate"}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Data de retirada esperada</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>
                                                        Escolha uma data
                                                    </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverPortal>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                locale={ptBR}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </PopoverPortal>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"expectedReturnDate"}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>
                                    Data de devolução esperada
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>
                                                        Escolha uma data
                                                    </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverPortal>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                locale={ptBR}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </PopoverPortal>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className={"flex gap-2"}>
                        <Button
                            className={"flex-1"}
                            type={"button"}
                            variant={"outline"}
                            onClick={() => router.back()}
                        >
                            Cancelar
                        </Button>
                        <Button
                            className={"flex-1"}
                            type={"submit"}
                            disabled={form.formState.isSubmitting}
                        >
                            Criar Reserva
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
