import { ProductGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function SareesLoading() {
  return (
    <div className="pb-4">
      <div className="px-5 pt-6 sm:px-10 lg:px-20">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="h-8" />
      <div className="flex flex-col gap-8 px-5 sm:px-10 lg:flex-row lg:px-20">
        <Skeleton className="hidden h-[600px] w-64 shrink-0 lg:block" />
        <div className="flex-1">
          <ProductGridSkeleton count={9} />
        </div>
      </div>
    </div>
  );
}
