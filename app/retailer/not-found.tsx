import Link from "next/link";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RetailerNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-cream-100 px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Store className="size-7" strokeWidth={1.75} />
      </span>
      <div>
        <p className="font-display text-3xl text-ink-900">Page not found</p>
        <p className="mt-1.5 max-w-sm text-sm text-ink-700">
          This retailer portal page doesn&apos;t exist or may have been moved.
        </p>
      </div>
      <Button asChild>
        <Link href="/retailer/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
