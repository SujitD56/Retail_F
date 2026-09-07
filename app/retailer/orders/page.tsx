"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Download } from "lucide-react";
import { RetailerShell } from "@/components/retailer/shell";
import { DataTable } from "@/components/ui/data-table";
import { StatusPill } from "@/components/ui/status-pill";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useApiQuery } from "@/lib/hooks/use-api-query";
import { formatDate, formatINR, cn } from "@/lib/utils";

interface RetailerOrderTableRow {
  id: string;
  customer: string;
  product: string;
  amount: number;
  paymentStatus: "Paid" | "COD" | "Failed";
  shipStatus: "Processing" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
}

const columns: ColumnDef<RetailerOrderTableRow>[] = [
  { accessorKey: "id", header: "Order ID", cell: ({ row }) => <span className="font-semibold text-ink-900">#{row.original.id}</span> },
  { accessorKey: "customer", header: "Customer Name" },
  { accessorKey: "product", header: "Product Details" },
  { accessorKey: "amount", header: "Total Amount", cell: ({ row }) => formatINR(row.original.amount) },
  { accessorKey: "paymentStatus", header: "Payment Status", cell: ({ row }) => <StatusPill status={row.original.paymentStatus} /> },
  { accessorKey: "shipStatus", header: "Ship Status", cell: ({ row }) => <StatusPill status={row.original.shipStatus} /> },
  { accessorKey: "date", header: "Order Date", cell: ({ row }) => formatDate(row.original.date) },
];

export default function RetailerOrdersPage() {
  const { data, loading } = useApiQuery<{ items: RetailerOrderTableRow[] }>("/orders/retailer/mine");
  const rows = useMemo(() => data?.items ?? [], [data]);
  const [tab, setTab] = useState<"all" | "new" | "confirmed" | "shipped" | "delivered">("all");
  const { toast } = useToast();

  const tabs = [
    { key: "all" as const, label: "All", count: rows.length },
    { key: "new" as const, label: "New", count: rows.filter((o) => o.shipStatus === "Processing").length },
    { key: "confirmed" as const, label: "Confirmed", count: rows.filter((o) => o.shipStatus === "Confirmed").length },
    { key: "shipped" as const, label: "Shipped", count: rows.filter((o) => o.shipStatus === "Shipped").length },
    { key: "delivered" as const, label: "Delivered", count: rows.filter((o) => o.shipStatus === "Delivered").length },
  ];

  const filtered = useMemo(() => {
    if (tab === "all") return rows;
    if (tab === "new") return rows.filter((o) => o.shipStatus === "Processing");
    if (tab === "confirmed") return rows.filter((o) => o.shipStatus === "Confirmed");
    if (tab === "shipped") return rows.filter((o) => o.shipStatus === "Shipped");
    return rows.filter((o) => o.shipStatus === "Delivered");
  }, [rows, tab]);

  return (
    <RetailerShell title="Orders Dispatch" subtitle="Track sales shipments and dispatch weaver inventory easily.">
      <div className="mb-6 flex justify-end">
        <Button variant="secondary" onClick={() => toast({ title: "Export started", description: "Your CSV will download shortly." })} className="uppercase">
          <Download className="size-4" /> Export Data
        </Button>
      </div>

      <div className="mb-6 flex gap-2 rounded-md border border-cream-300 bg-white p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "flex items-center gap-2 rounded-sm px-4 py-1.5 text-sm font-medium",
              tab === t.key ? "bg-primary-600 text-white" : "text-ink-700 hover:bg-cream-100",
            )}
          >
            {t.label}
            <span className={cn("rounded-sm px-1.5 text-xs", tab === t.key ? "bg-white/20" : "bg-cream-200")}>{t.count}</span>
          </button>
        ))}
      </div>

      {loading ? <Skeleton className="h-96 w-full" /> : <DataTable columns={columns} data={filtered} pageSize={8} emptyMessage="No orders in this status." />}
    </RetailerShell>
  );
}
