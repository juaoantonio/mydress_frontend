import { LoadingSpinner } from "@/components/loading-spinner/loading-spinner";

export default function Loading() {
    return (
        <div className={"flex min-h-screen w-full items-center justify-center"}>
            <LoadingSpinner />
        </div>
    );
}
