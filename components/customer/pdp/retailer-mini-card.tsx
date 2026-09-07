import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import type { Retailer } from "@/types";
import { StarRating } from "@/components/ui/star-rating";

export function RetailerMiniCard({ retailer }: { retailer: Retailer }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-cream-300 bg-cream-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-cream-300">
            <Image src={retailer.logoUrl} alt={retailer.name} fill sizes="48px" className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-display text-lg text-ink-900">{retailer.name}</p>
              <span className="flex items-center gap-1 rounded-sm bg-[#e2ece9] px-1.5 py-0.5 text-[10px] font-semibold text-[#1e5c49]">
                <BadgeCheck className="size-2.5" /> Verified
              </span>
            </div>
            <p className="text-[13px] text-ink-700">{retailer.location}</p>
          </div>
        </div>
        <Link href={`/retailers/${retailer.slug}`} className="text-sm font-semibold text-primary-600">
          View Store →
        </Link>
      </div>
      <div className="flex gap-8">
        <div>
          <p className="text-xs text-ink-500">Store Rating</p>
          <StarRating value={retailer.rating} size="xs" />
        </div>
        <div>
          <p className="text-xs text-ink-500">Inventory</p>
          <p className="text-sm font-semibold text-ink-900">{retailer.productCount.toLocaleString("en-IN")}+ Products</p>
        </div>
      </div>
    </div>
  );
}
