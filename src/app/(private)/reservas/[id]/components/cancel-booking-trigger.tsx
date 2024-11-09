import { Button } from "@/components/ui/button";
import React from "react";
import { BookingService } from "@/services/bookings/booking.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CancelBookingTrigger({ bookingId }: { bookingId: string }) {
    const router = useRouter();
    const service = new BookingService();
    const mutation = useMutation({
        mutationFn: () => service.cancel(bookingId),
        mutationKey: ["cancelBooking", bookingId],
        onMutate: () => toast.loading("Cancelando reserva..."),
        onSuccess: () => {
            toast.dismiss();
            toast.success("Reserva cancelada com sucesso!");
            router.push("/");
        },
        onError: (error) => {
            toast.dismiss();
            toast.error("Erro ao cancelar reserva");
            console.error(error);
        },
    });

    return (
        <Button
            className={"w-full flex-1"}
            type="button"
            variant={"outline"}
            disabled={mutation.isPending}
            onClick={() => {
                mutation.mutate();
            }}
        >
            Cancelar Reserva
        </Button>
    );
}
