import { ProductGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <div className="px-5 py-8 sm:px-10 lg:px-20">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-5 h-9 w-72" />
      <div className="mt-8">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
