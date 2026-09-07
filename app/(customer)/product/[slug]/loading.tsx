import { ProductDetailSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="px-5 py-6 sm:px-10 lg:px-20">
      <Skeleton className="h-4 w-56" />
      <div className="mt-8">
        <ProductDetailSkeleton />
      </div>
    </div>
  );
}
