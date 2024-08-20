import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return (
        <div className={"flex h-full w-full items-center justify-center"}>
            <LoaderCircle className={"animate-spin text-primary"} />
        </div>
    );
}
