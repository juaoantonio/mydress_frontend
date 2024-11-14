"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { BookingService } from "@/services/bookings/booking.service";
import { ImageListItem, List, ListItem } from "@/components/list/list";
import { format } from "date-fns";
import { getPercentage, numberToCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UpdateBookingPaymentTrigger } from "@/app/(private)/reservas/[id]/components/update-booking-payment-trigger";
import { BookingStatusMapping } from "@/mappings/bookings.mapping";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { CancelBookingTrigger } from "@/app/(private)/reservas/[id]/components/cancel-booking-trigger";
import { toast } from "sonner";
import { BookingStatus } from "@/types/booking.enums";

export function DetailBookingCard({ bookingId }: { bookingId: string }) {
    const router = useRouter();
    const bookingService = new BookingService();

    const {
        data: booking,
        isError,
        refetch,
        isPending,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => bookingService.getById(bookingId),
    });

    const mutation = useMutation({
        mutationFn: () => bookingService.processInit(bookingId),
        onSuccess: () => {
            refetch();
            toast.success("Processo iniciado com sucesso!");
        },
        onError: () => {
            toast.error("Não foi possível iniciar o processo");
        },
    });

    const dresses = booking?.dresses || [];
    const dressesDetails = booking?.dressesDetails || [];
    const clutchDetails = booking?.clutchesDetails || [];
    const clutches = booking?.clutches || [];

    if (isError) {
        return <p>Erro ao carregar reserva</p>;
    }

    if (isPending) {
        return <Loading />;
    }

    function handleProcessInit() {
        mutation.mutate();
    }

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
                    Reserva de {booking.customerName}{" "}
                </CardTitle>
                {BookingStatusMapping[booking.status]}
            </CardHeader>
            <CardContent className={"space-y-6"}>
                <List className={"grid gap-2 text-sm"}>
                    <ListItem
                        label={"Valor total do aluguel"}
                        value={numberToCurrency(booking?.totalBookingPrice)}
                    />
                    <ListItem
                        label={"Valor pago pela cliente"}
                        value={` (${
                            booking?.totalBookingPrice
                                ? getPercentage(
                                      booking?.amountPaid,
                                      booking?.totalBookingPrice,
                                  )
                                : 0
                        }%) ${numberToCurrency(booking?.amountPaid)}`}
                    />
                    <ListItem label={"Cliente"} value={booking?.customerName} />
                    <ListItem
                        label={"Data de início"}
                        value={
                            booking.expectedPickUpDate &&
                            format(booking.expectedPickUpDate, "dd/MM/yyyy")
                        }
                    />
                    <ListItem
                        label={"Data de término"}
                        value={
                            booking.expectedReturnDate &&
                            format(booking.expectedReturnDate, "dd/MM/yyyy")
                        }
                    />
                </List>

                <Separator />

                <div className={"space-y-3"}>
                    <h2
                        className={
                            "text-lg font-semibold leading-none tracking-tight"
                        }
                    >
                        Vestidos reservados
                    </h2>
                    <List className={"gap-2"}>
                        {dresses.length > 0 ? (
                            dresses.map((product, index) => (
                                <div
                                    key={product.id}
                                    className={"space-y-2 rounded border p-3"}
                                >
                                    <ImageListItem
                                        values={[
                                            {
                                                label: "Preço de aluguel",
                                                value: numberToCurrency(
                                                    dressesDetails[index]
                                                        .rentPrice,
                                                ),
                                            },
                                            {
                                                label: "Cor",
                                                value: dressesDetails[index]
                                                    .color,
                                            },
                                            {
                                                label: "Modelo",
                                                value: dressesDetails[index]
                                                    .model,
                                            },
                                        ]}
                                        img={dressesDetails[index].imagePath}
                                        imgAlt={dressesDetails[index].name}
                                        label={dressesDetails[index].name}
                                    />

                                    <div className={"space-y-2"}>
                                        <h3 className={"text-sm font-semibold"}>
                                            Ajustes
                                        </h3>
                                        <div>
                                            {product.adjustments.map(
                                                (adjustment, id) => (
                                                    <p key={id}>
                                                        {adjustment.label} -{" "}
                                                        {adjustment.description}
                                                    </p>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={"text-muted-foreground"}>
                                Sem vestidos reservados
                            </p>
                        )}
                    </List>
                </div>

                <Separator />

                <div className={"space-y-3"}>
                    <h2
                        className={
                            "text-lg font-semibold leading-none tracking-tight"
                        }
                    >
                        Bolsas reservadas
                    </h2>
                    <List>
                        {clutches.length > 0 ? (
                            clutches.map((product, index) => (
                                <div
                                    key={product.id}
                                    className={"rounded border px-3 py-2"}
                                >
                                    <ImageListItem
                                        values={[
                                            {
                                                label: "Preço de aluguel",
                                                value: numberToCurrency(
                                                    clutchDetails[index]
                                                        .rentPrice,
                                                ),
                                            },
                                            {
                                                label: "Cor",
                                                value: clutchDetails[index]
                                                    .color,
                                            },
                                            {
                                                label: "Modelo",
                                                value: clutchDetails[index]
                                                    .model,
                                            },
                                        ]}
                                        img={clutchDetails[index].imagePath}
                                        imgAlt={clutchDetails[index].name}
                                        label={clutchDetails[index].name}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className={"text-muted-foreground"}>
                                Sem bolsas reservadas
                            </p>
                        )}
                    </List>
                </div>

                <Separator />

                <div className={"flex flex-col gap-2"}>
                    <UpdateBookingPaymentTrigger
                        total={booking.totalBookingPrice}
                        status={booking.status}
                        bookingId={bookingId}
                        defaultValue={booking.amountPaid}
                    />

                    {booking.status === "NOT_INITIATED" && (
                        <Button
                            className={"w-full flex-1"}
                            type="button"
                            variant={"outline"}
                            onClick={handleProcessInit}
                        >
                            Iniciar Processo
                        </Button>
                    )}

                    {booking.status === BookingStatus.NOT_INITIATED && (
                        <Button
                            className={"w-full flex-1"}
                            type="button"
                            variant={"outline"}
                            onClick={() =>
                                router.push(
                                    `/reservas/cadastrar?bookingId=${bookingId}&step=2&expectedDate=${booking.expectedPickUpDate}&returnDate=${booking.expectedReturnDate}`,
                                )
                            }
                        >
                            Adicionar items da reserva
                        </Button>
                    )}

                    <Button
                        className={"w-full flex-1"}
                        type="button"
                        variant={"outline"}
                        onClick={() =>
                            router.push(
                                `/reservas/cadastrar/${bookingId}/ajustes`,
                            )
                        }
                    >
                        Editar Ajustes
                    </Button>

                    <CancelBookingTrigger bookingId={bookingId} />
                </div>
            </CardContent>
        </Card>
    );
}
