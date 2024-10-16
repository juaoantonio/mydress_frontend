import { GetPaginatedInputDto, GetPaginatedOutputDto } from "@/services/types";
import { Appointment } from "@/types/appointment.types";

export type GetPaginatedAppointmentsInputDto = GetPaginatedInputDto & {
    appointmentDate?: string;
    customerName?: string;
};

export type GetPaginatedAppointmentsOutputDto =
    GetPaginatedOutputDto<Appointment>;

export type RescheduleAppointmentInputDto = {
    appointmentId: string;
    newDate: string;
};
