import { TableRowSkeleton } from "@/components/ui/skeleton";

/** Full-table loading placeholder for Retailer/Admin DataTable routes (products, orders, retailers, etc). */
export function TableSkeleton({ columns = 6, rows = 8 }: { columns?: number; rows?: number }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-cream-300 bg-white">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
