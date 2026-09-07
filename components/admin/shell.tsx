"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ClipboardList,
  Folder,
  Gauge,
  HelpCircle,
  LayoutGrid,
  Megaphone,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Ticket,
  Users,
  UsersRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid, active: true },
  { label: "Retailers", href: "/admin/retailers", icon: Users, active: true },
  { label: "Customers", href: "#", icon: UsersRound, active: false },
  { label: "Products", href: "/admin/products", icon: Package, active: true },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag, active: true },
  { label: "Events", href: "/admin/events", icon: ClipboardList, active: true },
  { label: "Categories", href: "#", icon: Tag, active: false },
  { label: "Collections", href: "#", icon: Folder, active: false },
  { label: "Reviews", href: "#", icon: Star, active: false },
  { label: "Coupons", href: "#", icon: Ticket, active: false },
  { label: "Promotions", href: "#", icon: Megaphone, active: false },
  { label: "Reports", href: "#", icon: Gauge, active: false },
  { label: "Settings", href: "#", icon: Settings, active: false },
];

export function AdminShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-cream-100">
      <aside className="flex w-[260px] shrink-0 flex-col justify-between border-r border-cream-300 bg-white">
        <div className="flex flex-col gap-1 p-5 pt-6">
          <div className="px-1 pb-5">
            <p className="font-display text-2xl font-bold text-primary-600">Ilkal Threads</p>
            <p className="mt-1 flex items-center gap-2 text-xs text-ink-500">
              Platform Admin <span className="h-3 w-px bg-cream-300" /> v3.2 Stable
            </p>
          </div>
          {NAV.map((item) => {
            const current = item.active && (pathname === item.href || pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-3.5 py-2 text-sm font-medium",
                  current ? "bg-primary-600 text-white" : item.active ? "text-ink-900 hover:bg-cream-100" : "text-ink-300 cursor-not-allowed",
                )}
                aria-disabled={!item.active}
                onClick={(e) => {
                  if (!item.active) e.preventDefault();
                }}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="border-t border-cream-300 p-5">
          <button type="button" className="flex items-center gap-2 text-sm text-ink-700 hover:text-primary-600">
            <HelpCircle className="size-4" /> Documentation &amp; Support
          </button>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary-600">AD</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink-900">Aditi Deshpande</p>
              <p className="text-xs text-ink-500">Super Administrator</p>
            </div>
          </div>
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
              <span className="flex size-9 items-center justify-center rounded-full bg-cream-200 font-semibold text-ink-900">AD</span>
              <div>
                <p className="text-sm font-semibold text-ink-900">Aditi D.</p>
                <p className="text-xs text-ink-500">HQ Admin</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-10">{children}</main>
      </div>
    </div>
  );
}
