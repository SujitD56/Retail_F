import { AdminShell } from "@/components/admin/shell";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProductsLoading() {
  return (
    <AdminShell title="Product Management" subtitle="Moderate global product listings and handle flagged item complaints.">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Skeleton className="h-11 w-[420px]" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-72" />
        </div>
      </div>
      <Skeleton className="mb-6 h-12 w-full" />
      <TableSkeleton columns={8} />
    </AdminShell>
  );
}
