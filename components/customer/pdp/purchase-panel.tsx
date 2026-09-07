"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

export function PurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const inWishlist = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const { toast } = useToast();

  return (
    <div className="flex items-center gap-6">
      <QuantityStepper value={quantity} onChange={setQuantity} max={product.stockCount} />
      <Button
        size="lg"
        className="flex-1 uppercase"
        disabled={!product.inStock}
        onClick={() => {
          addItem(product.id, quantity);
          toast({ title: "Added to cart", description: `${product.name} × ${quantity}`, variant: "success" });
        }}
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </Button>
      <button
        type="button"
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(product.id)}
        className="flex size-12 shrink-0 items-center justify-center rounded-sm border border-cream-300 bg-white hover:bg-cream-100"
      >
        <Heart className={cn("size-5", inWishlist ? "fill-primary-600 text-primary-600" : "text-ink-700")} />
      </button>
    </div>
  );
}
