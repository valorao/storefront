import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div>
                <Skeleton className="w-96 h-10" />
            </div>
            <div>
                <Skeleton className="w-64 h-24" />
            </div>
            <div>
                <Skeleton className="w-96 h-10" />
            </div>
            <div className="gap-3 flex flex-col">
                <Skeleton className="w-96 h-32" />
                <Skeleton className="w-96 h-32" />
                <Skeleton className="w-96 h-32" />
            </div>
        </div>
    )
}