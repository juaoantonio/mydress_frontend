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
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { CancelBookingTrigger } from "@/app/(private)/reservas/[id]/components/cancel-booking-trigger";
import { UpdateEventReceptionTrigger } from "@/app/(private)/reservas/[id]/components/update-event-reception-trigger";

export function DetailBookingCard({ bookingId }: { bookingId: string }) {
    const router = useRouter();
    const bookingService = new BookingService();
    const {
        data: booking,
        isError,
        isPending,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => bookingService.getById({ id: bookingId }),
    });
    const dresses = booking?.dresses || [];
    const clutches = booking?.clutches || [];

    if (isError) {
        return <p>Erro ao carregar reserva</p>;
    }

    if (isPending) {
        return <Loading />;
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
                    Reserva de {booking.customer.name}{" "}
                </CardTitle>

                {BookingStatusMapping[booking.status]}
            </CardHeader>
            <CardContent className={"space-y-6"}>
                <List className={"grid gap-2 text-sm"}>
                    <ListItem
                        label={"Valor total do aluguel"}
                        value={numberToCurrency(booking?.payment_amount)}
                    />
                    <ListItem
                        label={"Valor pago pela cliente"}
                        value={` (${getPercentage(booking?.amountPaid, booking?.payment_amount)}%) ${numberToCurrency(booking?.amountPaid)}`}
                    />
                    <ListItem
                        label={"Cliente"}
                        value={booking?.customer.name}
                    />
                    <ListItem
                        label={"Data de início"}
                        value={format(booking?.start_date, "dd/MM/yyyy")}
                    />
                    <ListItem
                        label={"Data de término"}
                        value={format(booking?.end_date, "dd/MM/yyyy")}
                    />
                    <ListItem
                        label={"Recepção do evento"}
                        value={booking?.event.event_reception}
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
                            dresses.map((product) => (
                                <div
                                    key={product.id}
                                    className={"space-y-2 rounded border p-3"}
                                >
                                    <ImageListItem
                                        values={[
                                            {
                                                label: "Preço de aluguel",
                                                value: numberToCurrency(
                                                    product.rentPrice,
                                                ),
                                            },
                                            {
                                                label: "Cor",
                                                value: product.color,
                                            },
                                            {
                                                label: "Modelo",
                                                value: product.model,
                                            },
                                        ]}
                                        img={product.imagePath}
                                        imgAlt={product.imagePath}
                                        label={product.imagePath}
                                    />

                                    <div className={"space-y-2"}>
                                        <h3 className={"text-sm font-semibold"}>
                                            Ajustes
                                        </h3>

                                        <List className={"gap-2 text-xs"}>
                                            {booking.adjustments.filter(
                                                (adjustment) =>
                                                    adjustment.dress ===
                                                    product.id,
                                            ).length > 0 ? (
                                                booking.adjustments
                                                    .filter(
                                                        (adjustment) =>
                                                            adjustment.dress ===
                                                            product.id,
                                                    )
                                                    .map((adjustment) => (
                                                        <ListItem
                                                            className={
                                                                "grid grid-cols-2"
                                                            }
                                                            key={adjustment.id}
                                                            label={
                                                                adjustment.label
                                                            }
                                                            value={
                                                                adjustment.description
                                                            }
                                                        />
                                                    ))
                                            ) : (
                                                <p
                                                    className={
                                                        "text-muted-foreground"
                                                    }
                                                >
                                                    Sem ajustes
                                                </p>
                                            )}
                                        </List>
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
                            clutches.map((product) => (
                                <div
                                    key={product.id}
                                    className={"rounded border px-3 py-2"}
                                >
                                    <ImageListItem
                                        label={product.description}
                                        values={[
                                            {
                                                label: "Preço de aluguel",
                                                value: numberToCurrency(
                                                    product.price,
                                                ),
                                            },
                                            {
                                                label: "Disponível para ajuste",
                                                value: product.available_for_adjustment
                                                    ? "Sim"
                                                    : "Não",
                                            },
                                            {
                                                label: "Cor",
                                                value: product.color,
                                            },
                                            {
                                                label: "Modelo",
                                                value: product.model,
                                            },
                                        ]}
                                        img={product.img}
                                        imgAlt={product.description}
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
                        bookingId={bookingId}
                        defaultValue={booking.amountPaid}
                    />

                    <UpdateEventReceptionTrigger
                        eventId={booking?.event.id}
                        bookingId={bookingId}
                        defaultValue={booking?.event.event_reception}
                    />

                    <Button
                        className={"w-full flex-1"}
                        type="button"
                        variant={"outline"}
                        onClick={() =>
                            router.push(
                                `/reservas/cadastrar/ajustes/${bookingId}`,
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
