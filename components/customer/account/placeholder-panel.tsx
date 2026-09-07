import type { LucideIcon } from "lucide-react";

export function AccountPlaceholderPanel({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border border-cream-300 bg-white px-8 py-20 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Icon className="size-6" />
      </span>
      <div>
        <p className="font-display text-xl text-ink-900">{title}</p>
        <p className="mt-1.5 max-w-sm text-sm text-ink-700">{description}</p>
      </div>
    </div>
  );
}
