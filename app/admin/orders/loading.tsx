import { AdminShell } from "@/components/admin/shell";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOrdersLoading() {
  return (
    <AdminShell title="Order Management" subtitle="Monitor global handicraft sales and coordinate weaver logistics.">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-[126px] w-full" />
        ))}
      </div>
      <div className="mb-6 mt-6 flex items-center gap-3">
        <Skeleton className="h-10 w-44" />
        <Skeleton className="h-10 w-44" />
      </div>
      <TableSkeleton columns={9} />
    </AdminShell>
  );
}
