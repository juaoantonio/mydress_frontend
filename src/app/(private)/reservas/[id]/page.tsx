import React, { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { DetailBookingCard } from "@/app/(private)/reservas/[id]/components/DetailBookingCard";

export default function BookingDetail({
    params: { id },
}: {
    params: {
        id: string;
    };
}) {
    return (
        <section className={"flex h-[130vh] justify-center lg:items-center"}>
            <Suspense
                fallback={
                    <div
                        className={
                            "flex h-full w-full items-center justify-center"
                        }
                    >
                        <LoaderCircle className={"animate-spin text-primary"} />
                    </div>
                }
            >
                <DetailBookingCard bookingId={id} />
            </Suspense>
        </section>
    );
}
