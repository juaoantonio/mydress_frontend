"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BookingService } from "@/services/bookings/booking.service";
import BasicForm from "./basic-form";
import ItemsForm from "./items-form";
import { isValidUUID } from "@/lib/utils";

export function CreateBookingForm() {
    const service = new BookingService();

    const router = useRouter();

    const searchParams = useSearchParams();

    const bookingId = searchParams.get("bookingId") ?? "";

    const formStep = searchParams.get("step") ?? "1";

    const validUuid = isValidUUID(bookingId);

    const validSteps = ["1", "2"].includes(formStep);

    if ((formStep != "1" && !validUuid) || !validSteps) {
        router.replace("/");
        return;
    }

    const stepLiterals = {
        "1": <BasicForm service={service} />,
        "2": <ItemsForm bookingId={bookingId} service={service} />,
    };

    return stepLiterals[formStep];
}
