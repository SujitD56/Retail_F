import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function RetailerStatusShell({
  icon: Icon,
  iconClassName,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  iconClassName?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-100 px-6 py-16">
      <div className="w-full max-w-[640px] rounded-xl border border-cream-300 bg-white p-10 sm:p-12">
        <div className="flex flex-col items-center text-center">
          <span className={cn("flex size-[100px] items-center justify-center rounded-full", iconClassName ?? "bg-primary-50 text-primary-600")}>
            <Icon className="size-11" />
          </span>
          <h1 className="mt-8 font-display text-4xl text-primary-600">{title}</h1>
          <p className="mt-3 max-w-md text-base text-ink-700">{description}</p>
        </div>
        <div className="mt-8 flex flex-col gap-6">{children}</div>
        <p className="mt-6 text-center text-sm text-ink-500">
          Need help?{" "}
          <Link href="#" className="font-semibold text-primary-600">
            Contact Seller Support
          </Link>
        </p>
      </div>
    </div>
  );
}
