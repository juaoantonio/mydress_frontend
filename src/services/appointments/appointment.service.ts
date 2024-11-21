import { axiosClient } from "@/lib/axios.client";
import {
    GetPaginatedAppointmentsInputDto,
    GetPaginatedAppointmentsOutputDto,
    RescheduleAppointmentInputDto,
    ScheduleAdjustmentReturnInputDto,
    ScheduleInitialVisitInputDto,
} from "@/services/appointments/appointment.dto";
import { Appointment } from "@/types/appointment.types";

export class AppointmentService {
    async getAppointment(appointmentId: string) {
        const response = await axiosClient.get<Appointment>(
            `/appointments/${appointmentId}`,
        );
        return response.data;
    }

    async getPaginated(
        input: GetPaginatedAppointmentsInputDto,
    ): Promise<GetPaginatedAppointmentsOutputDto> {
        const response =
            await axiosClient.get<GetPaginatedAppointmentsOutputDto>(
                "/appointments",
                {
                    params: input,
                },
            );
        return response.data;
    }

    async scheduleInitialVisit(input: ScheduleInitialVisitInputDto) {
        await axiosClient.post("/appointments/initial-visit", input);
    }

    async scheduleAdjustmentReturnVisit(
        input: ScheduleAdjustmentReturnInputDto,
    ) {
        await axiosClient.post("/appointments/adjustment-return", input);
    }

    async reescheduleAppointment(input: RescheduleAppointmentInputDto) {
        await axiosClient.patch(
            `/appointments/${input.appointmentId}/reschedule`,
            {
                newDate: input.newDate,
            },
        );
    }

    async cancelAppointment(appointmentId: string) {
        await axiosClient.patch(`/appointments/${appointmentId}/cancel`);
    }

    async completeAppointment(appointmentId: string) {
        await axiosClient.patch(`/appointments/${appointmentId}/complete`);
    }
}
