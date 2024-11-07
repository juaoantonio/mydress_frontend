import React, { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import { CreateAdjustmentsCard } from "@/app/(private)/reservas/cadastrar/[id]/ajustes/components/create-adjustments-card";

export default function CreateAdjustmentsPage({
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
                <CreateAdjustmentsCard bookingId={id} />
            </Suspense>
        </section>
    );
}
