import { AdminShell } from "@/components/admin/shell";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminRetailersLoading() {
  return (
    <AdminShell title="Retailer Management" subtitle="Vet credentials, approve payouts, and manage verified handloom stores globally.">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Skeleton className="h-11 w-96" />
        <Skeleton className="h-10 w-72" />
      </div>
      <TableSkeleton columns={8} />
    </AdminShell>
  );
}
