import { RetailerShell } from "@/components/retailer/shell";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function RetailerProductsLoading() {
  return (
    <RetailerShell title="Products" subtitle="Manage and showcase your exquisite Ilkal masterpieces.">
      <div className="mb-6 flex justify-end">
        <Skeleton className="h-11 w-36" />
      </div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Skeleton className="h-11 w-80" />
        <Skeleton className="h-10 w-72" />
      </div>
      <TableSkeleton columns={7} />
    </RetailerShell>
  );
}
