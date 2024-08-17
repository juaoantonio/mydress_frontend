export enum BookingStatus {
    CONFIRMED = "CONFIRMED",
    CANCELED = "CANCELED",
    IN_PROGRESS = "IN_PROGRESS",
    OVERDUE = "OVERDUE",
    CONCLUDED = "CONCLUDED",
}

export const BookingStatusLabels: {
    [key in BookingStatus]: string;
} = {
    [BookingStatus.CONFIRMED]: "Confirmada",
    [BookingStatus.CANCELED]: "Cancelada",
    [BookingStatus.IN_PROGRESS]: "Em andamento",
    [BookingStatus.OVERDUE]: "Atrasada",
    [BookingStatus.CONCLUDED]: "Concluída",
};
