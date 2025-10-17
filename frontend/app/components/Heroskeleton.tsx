

import { Skeleton } from "@/components/ui/skeleton"
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 p-10 m-10 gap-3 ">
      <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
