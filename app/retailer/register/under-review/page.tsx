import { Clock, CheckCircle2 } from "lucide-react";
import { RetailerStatusShell } from "@/components/retailer/status-card-shell";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";

export default function RetailerUnderReviewPage() {
  return (
    <RetailerStatusShell
      icon={Clock}
      iconClassName="bg-warning-50 text-warning-500"
      title="Account Under Review"
      description="Your retailer application is currently being evaluated by our onboarding specialists."
    >
      <div className="flex flex-col gap-3 rounded-lg border border-cream-300 p-5 text-sm">
        <Row label="Application ID" value="#RT-2026-0847" />
        <Row label="Submitted on" value="Aug 12, 2026" />
        <div className="flex items-center justify-between">
          <span className="text-ink-700">Application Status</span>
          <StatusPill status="under review" />
        </div>
        <div className="h-px w-full bg-cream-300" />
        <Row label="Estimated Completion" value="2-3 Business Days" />
      </div>

      <div>
        <p className="text-sm font-semibold text-ink-900">Onboarding Checklist Progress</p>
        <div className="mt-4 flex flex-col gap-3">
          <ChecklistRow label="Document Verification Passed" state="done" />
          <ChecklistRow label="Quality Review (In progress...)" state="active" />
          <ChecklistRow label="Account Activation (Pending)" state="pending" />
        </div>
      </div>

      <Button size="lg" className="h-12 w-full">
        Check Status
      </Button>
    </RetailerStatusShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-700">{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  );
}

function ChecklistRow({ label, state }: { label: string; state: "done" | "active" | "pending" }) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      {state === "done" ? (
        <CheckCircle2 className="size-5 text-success-500" />
      ) : (
        <span className={`flex size-5 items-center justify-center rounded-full border-2 ${state === "active" ? "border-warning-500" : "border-cream-300"}`}>
          <span className={`size-2 rounded-full ${state === "active" ? "bg-warning-500" : "bg-cream-300"}`} />
        </span>
      )}
      <span className={state === "pending" ? "text-ink-500" : "text-ink-900"}>{label}</span>
    </div>
  );
}
