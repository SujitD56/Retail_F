"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart2,
  Bell,
  Calendar,
  Folder,
  HelpCircle,
  LayoutGrid,
  Package,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/auth";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/retailer/dashboard", icon: LayoutGrid },
  { label: "Products", href: "/retailer/products", icon: Package },
  { label: "Collections", href: "/retailer/collections", icon: Folder },
  { label: "Orders", href: "/retailer/orders", icon: ShoppingBag },
  { label: "Analytics", href: "/retailer/analytics", icon: BarChart2 },
  { label: "Events", href: "/retailer/events", icon: Calendar },
  { label: "Store Settings", href: "/retailer/settings", icon: Settings },
];

export function RetailerShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-cream-100">
      <aside className="flex w-[260px] shrink-0 flex-col justify-between border-r border-cream-300 bg-white">
        <div className="flex flex-col gap-2 p-5 pt-6">
          <div className="px-1 pb-6">
            <p className="font-display text-2xl font-bold text-primary-600">Ilkal Threads</p>
            <p className="mt-1 flex items-center gap-2 text-xs text-ink-500">
              Retailer Portal <span className="h-3 w-px bg-cream-300" /> Partner v2.6
            </p>
          </div>
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-sm font-medium",
                  active ? "bg-primary-600 text-white" : "text-ink-900 hover:bg-cream-100",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="border-t border-cream-300 p-5">
          <button type="button" className="flex items-center gap-2 text-sm text-ink-700 hover:text-primary-600">
            <HelpCircle className="size-4" /> Help &amp; Documentation
          </button>
          <button
            type="button"
            onClick={() => router.push("/retailer/settings")}
            className="mt-4 flex w-full items-center gap-3 rounded-sm py-2 text-left hover:bg-cream-100"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-50 font-display text-sm font-semibold text-primary-600">
              LS
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink-900">{user?.name ?? "Lakshmi Sarees"}</p>
              <p className="text-xs text-ink-500">Ilkal, KA • Verified</p>
            </div>
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-[88px] items-center justify-between border-b border-cream-300 bg-white px-10">
          <div>
            <h1 className="font-display text-2xl text-ink-900">{title}</h1>
            {subtitle && <p className="text-sm text-ink-500">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-6">
            <button type="button" aria-label="Notifications" className="relative text-ink-700">
              <Bell className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary-600" />
            </button>
            <span className="h-6 w-px bg-cream-300" />
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-cream-200 font-semibold text-ink-900">DS</span>
              <div>
                <p className="text-sm font-semibold text-ink-900">Devappa Swamy</p>
                <p className="text-xs text-ink-500">Store Manager</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
}
