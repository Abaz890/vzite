import { Skeleton } from "./ui/skeleton";

export default function SkeletonComments() {
  return (
    <div className="flex flex-col">
      {[...Array(4)].map(() => (
          <div className="flex items-start gap-4 flex-1 mb-6 ">
            {/* Avatar */}
            <Skeleton className="w-10 h-10 rounded-full" />

            <div className="flex-1">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <div className="ml-auto">
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>

              {/* Comment body */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>

              {/* Actions */}
              {/* <div className="flex gap-4 mt-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div> */}
            </div>
          </div>
      ))}
    </div>
  );
}
