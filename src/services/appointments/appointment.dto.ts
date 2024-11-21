import { GetPaginatedInputDto, GetPaginatedOutputDto } from "@/services/types";
import { Appointment } from "@/types/appointment.types";

export type GetPaginatedAppointmentsInputDto = GetPaginatedInputDto & {
    appointmentDate?: string;
    customerName?: string;
    includeAll?: boolean;
};

export type GetPaginatedAppointmentsOutputDto =
    GetPaginatedOutputDto<Appointment>;

export type RescheduleAppointmentInputDto = {
    appointmentId: string;
    newDate: string;
};

export type ScheduleInitialVisitInputDto = {
    appointmentDate: string;
    customerName: string;
    eventDate: string;
};

export type ScheduleAdjustmentReturnInputDto = {
    appointmentDate: string;
    bookingId: string;
};
