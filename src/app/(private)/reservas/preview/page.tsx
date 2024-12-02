import { PageContent } from "@/components/page/page-content";
import { PreviewBookingList } from "@/app/(private)/reservas/preview/components/preview-booking-list";

export default function BookingPreviewPage() {
    return (
        <PageContent pageTitle={`Pré-visualização das reservas`}>
            <PreviewBookingList />
        </PageContent>
    );
}
