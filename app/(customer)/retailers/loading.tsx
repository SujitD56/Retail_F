import { RetailerCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function RetailersLoading() {
  return (
    <div>
      <div className="px-5 pt-6 sm:px-10 lg:px-20">
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex flex-col gap-3 px-5 pb-8 pt-12 sm:px-10 lg:px-20">
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-5 w-full max-w-2xl" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="grid grid-cols-1 gap-6 px-5 pb-16 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <RetailerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
