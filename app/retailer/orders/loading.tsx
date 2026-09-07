import { RetailerShell } from "@/components/retailer/shell";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function RetailerOrdersLoading() {
  return (
    <RetailerShell title="Orders" subtitle="Track and fulfil customer orders across your storefront.">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Skeleton className="h-11 w-96" />
        <Skeleton className="h-10 w-32" />
      </div>
      <TableSkeleton columns={7} />
    </RetailerShell>
  );
}
