import { Trophy } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function EventsNotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-24 sm:px-10">
      <EmptyState
        icon={Trophy}
        title="Event not found"
        description="This style challenge doesn't exist, has ended, or the link may be broken."
        actionLabel="Browse All Events"
        actionHref="/events"
      />
    </div>
  );
}
