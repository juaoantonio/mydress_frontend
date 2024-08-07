import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ImageListItem, List, ListItem } from "@/components/list";
import { BookingStatusLabels } from "@/types/booking.enums";
import { format } from "date-fns";
import { numberToCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BookingType } from "@/types/booking.types";

export function DetailCalendarEvent({
    isOpen,
    setIsOpen,
    currentBooking,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentBooking: BookingType | null;
}) {
    const dresses = currentBooking?.products.filter(
        (product) => product.resourcetype.toLowerCase() === "dress",
    );

    const purses = currentBooking?.products.filter(
        (product) => product.resourcetype.toLowerCase() === "purse",
    );

    return (
        <Dialog
            open={isOpen}
            onOpenChange={() => setIsOpen((prevState) => !prevState)}
        >
            <DialogContent
                className={"flex h-[90%] flex-col overflow-y-scroll"}
            >
                <DialogHeader className={"text-start"}>
                    <DialogTitle>Detalhes da reserva</DialogTitle>
                </DialogHeader>
                {currentBooking ? (
                    <List className={"grid gap-2 text-sm"}>
                        <ListItem
                            label={"Situação"}
                            value={BookingStatusLabels[currentBooking.status]}
                        />
                        <ListItem
                            label={"Cliente"}
                            value={currentBooking.customer.name}
                        />
                        <ListItem
                            label={"Data de início"}
                            value={format(
                                currentBooking.start_date,
                                "dd/MM/yyyy",
                            )}
                        />
                        <ListItem
                            label={"Data de término"}
                            value={format(
                                currentBooking.end_date,
                                "dd/MM/yyyy",
                            )}
                        />
                        <ListItem
                            label={"Recepção do evento"}
                            value={currentBooking.event.event_reception}
                        />
                        <ListItem
                            label={"Valor total do aluguel"}
                            value={numberToCurrency(
                                currentBooking.products.reduce(
                                    (acc, product) => acc + product.price,
                                    0,
                                ),
                            )}
                        />
                    </List>
                ) : null}

                <Separator />

                <DialogTitle>Vestidos reservados</DialogTitle>
                <List>
                    {dresses && dresses.length > 0 ? (
                        dresses.map((product) => (
                            <ImageListItem
                                key={product.id}
                                label={product.description}
                                values={[
                                    {
                                        label: "Preço de aluguel",
                                        value: numberToCurrency(product.price),
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
                        ))
                    ) : (
                        <p className={"text-muted-foreground"}>
                            Sem vestidos reservados
                        </p>
                    )}
                </List>

                <Separator />

                <DialogTitle>Bolsas reservadas</DialogTitle>
                <List>
                    {purses && purses.length > 0 ? (
                        purses.map((product) => (
                            <ImageListItem
                                key={product.id}
                                label={product.description}
                                values={[
                                    {
                                        label: "Preço de aluguel",
                                        value: numberToCurrency(product.price),
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
                        ))
                    ) : (
                        <p className={"text-muted-foreground"}>
                            Sem bolsas reservadas
                        </p>
                    )}
                </List>

                <DialogFooter
                    className={"gap-2 justify-self-end sm:flex-col-reverse"}
                >
                    <Button type="button" variant={"outline"}>
                        Cancelar Reserva
                    </Button>
                    <Button type="button" variant={"outline"}>
                        Editar
                    </Button>
                    <Button type="button">Atualizar Reserva</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
