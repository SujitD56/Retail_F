import { Search } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function CustomerNotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 sm:px-10">
      <EmptyState
        icon={Search}
        title="We couldn't find that page"
        description="The saree, retailer, or page you're looking for doesn't exist or may have been moved."
        actionLabel="Continue Shopping"
        actionHref="/sarees"
      />
    </div>
  );
}
