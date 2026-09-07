import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CreditCard,
  Grid3x3,
  Heart,
  Package,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Generic empty-state card, matching canvas "05 — Empty, Error & Loading States"
 * (icon-in-circle, title, description, single action) — reused across every
 * listing/cart/wishlist/order/review empty branch in the app.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-5 rounded-lg border border-cream-300 bg-white px-8 py-12 text-center", className)}>
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Icon className="size-7" strokeWidth={1.75} />
      </span>
      <div className="max-w-xs">
        <p className="text-lg font-semibold text-ink-900">{title}</p>
        <p className="mt-1.5 text-sm text-ink-700">{description}</p>
      </div>
      {actionLabel && actionHref && (
        <Button asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}

export const EmptyStatePresets = {
  noSareesFound: { icon: Search, title: "No sarees found", description: "Try adjusting your filters or search for something else.", actionLabel: "Clear Filters" },
  cartEmpty: { icon: ShoppingBag, title: "Your cart is empty", description: "Discover beautiful Ilkal sarees from our trusted retailers.", actionLabel: "Start Shopping", actionHref: "/sarees" },
  wishlistEmpty: { icon: Heart, title: "Your wishlist is empty", description: "Save sarees, retailers, and collections you love.", actionLabel: "Explore Sarees", actionHref: "/sarees" },
  noOrders: { icon: Package, title: "No orders yet", description: "When you place an order, it will appear here.", actionLabel: "Browse Sarees", actionHref: "/sarees" },
  noReviews: { icon: Star, title: "No reviews yet", description: "Be the first to review this product.", actionLabel: "Write a Review" },
  noProductsListed: { icon: Grid3x3, title: "No products listed yet", description: "This retailer is setting up their store.", actionLabel: "Explore Other Retailers", actionHref: "/retailers" },
} as const;

export function ErrorState({
  icon: Icon = AlertTriangle,
  title,
  description,
  actionLabel = "Try Again",
  onAction,
  secondaryLabel,
  onSecondary,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-5 rounded-lg border border-cream-300 bg-white px-8 py-12 text-center", className)}>
      <span className="flex size-16 items-center justify-center rounded-full bg-danger-50 text-danger-500">
        <Icon className="size-7" strokeWidth={1.75} />
      </span>
      <div className="max-w-xs">
        <p className="text-lg font-semibold text-ink-900">{title}</p>
        <p className="mt-1.5 text-sm text-ink-700">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        {onAction && <Button onClick={onAction}>{actionLabel}</Button>}
        {secondaryLabel && onSecondary && (
          <Button variant="secondary" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export const ErrorStatePresets = {
  somethingWentWrong: { title: "Something went wrong", description: "We encountered an issue loading this section. Please try again.", icon: AlertTriangle },
  paymentUnsuccessful: { title: "Payment unsuccessful", description: "Your transaction could not be completed. Please verify your payment details.", icon: CreditCard },
  sareeUnavailable: { title: "Saree no longer available", description: "This exclusive handloom piece has sold out or been removed by the weaver.", icon: AlertTriangle },
} as const;
