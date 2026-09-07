import { AlertTriangle } from "lucide-react";
import { RetailerStatusShell } from "@/components/retailer/status-card-shell";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";

const ISSUES = [
  "PAN card image is unclear — please re-upload a higher quality scan.",
  "Business address doesn't match the GST registration address.",
];

export default function RetailerRejectedPage() {
  return (
    <RetailerStatusShell
      icon={AlertTriangle}
      iconClassName="bg-danger-50 text-danger-500"
      title="Action Required"
      description="We were unable to verify some of your submitted information."
    >
      <div className="flex flex-col gap-4 rounded-lg border border-cream-300 p-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-ink-700">Application ID</span>
          <span className="font-semibold text-ink-900">#RT-2026-0847</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-ink-700">Status</span>
          <StatusPill status="rejected" />
        </div>
        <div className="h-px w-full bg-cream-300" />
        <div>
          <p className="font-semibold text-ink-900">Issues Found</p>
          <ol className="mt-2 flex flex-col gap-2 text-ink-700">
            {ISSUES.map((issue, i) => (
              <li key={i}>
                {i + 1}. {issue}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <p className="text-sm text-ink-700">Please update these details to continue onboarding.</p>

      <div className="flex flex-col items-center gap-3">
        <Button size="lg" className="h-12 w-full">
          Correct &amp; Resubmit
        </Button>
        <div className="flex items-center gap-4 text-sm">
          <button type="button" className="font-semibold text-primary-600">
            Appeal Decision
          </button>
          <span className="text-ink-300">|</span>
          <button type="button" className="font-semibold text-primary-600">
            Contact Support
          </button>
        </div>
      </div>
    </RetailerStatusShell>
  );
}
