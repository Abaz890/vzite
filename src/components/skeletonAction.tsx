import { Skeleton } from "./ui/skeleton";

export function SkeletonAction() {
    return (
        <div className="flex flex-col my-1">
            <Skeleton className="h-6 w-28 mb-2" />
            <div className='mb-3 flex justify-between'>
                <div className="flex">
                    <Skeleton className="h-10 w-28 mb-2" />
                    <Skeleton className="h-10 w-14 mx-2 mb-2" />
                </div>
                <div className="flex">
                    <Skeleton className="h-10 w-28 mb-2" />
                    <Skeleton className="h-10 w-28 mx-2 mb-2" />

                </div>
            </div>
        </div>

    )
}

