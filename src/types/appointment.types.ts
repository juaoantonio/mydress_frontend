export type Appointment = {
    id: string;
    appointmentDate: string;
    bookingId: string;
    customerName: string;
    eventDate: string;
    type: AppointmentType;
    status: AppointmentStatus;
    history: AppointmentHistoryType[];
};

export enum AppointmentType {
    INITIAL_VISIT = "INITIAL_VISIT",
    RETURN_FOR_ADJUSTMENT = "RETURN_FOR_ADJUSTMENT",
    PICKUP = "PICKUP",
    RETURN = "RETURN",
}

export enum AppointmentStatus {
    SCHEDULED = "SCHEDULED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED",
}

export type AppointmentHistoryType = {
    status: AppointmentStatus;
    date: string;
    appointmentDate: string;
};
