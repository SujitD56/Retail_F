"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, Clock3 } from "lucide-react";
import { AdminSecureShell } from "@/components/admin/secure-shell";
import { Button } from "@/components/ui/button";

export default function AdminSessionExpiredPage() {
  const router = useRouter();

  return (
    <AdminSecureShell badge="Session Interrupted">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-warning-500/10 text-warning-500">
          <Clock3 className="size-7" />
        </span>
        <h1 className="font-display text-2xl text-white">Session Expired</h1>
        <p className="mt-1.5 text-sm text-secure-500">Your secure admin session has expired due to 15 minutes of inactivity</p>
      </div>

      <div className="flex flex-col gap-3 rounded-sm border border-secure-700 bg-secure-800/60 p-4 text-sm">
        <Row label="Operational User" value="superadmin_security_02" />
        <Row label="Last Recorded Action" value="2 hours ago (14:32:01 IST)" />
        <Row label="Session Duration" value="4 hrs 12 mins" />
      </div>

      <Button size="lg" className="mt-6 h-12 w-full" onClick={() => router.push("/admin/login")}>
        Sign In Again
      </Button>

      <div className="mt-5 flex items-start gap-3 rounded-sm border border-danger-500/30 bg-danger-500/10 p-4 text-xs text-danger-500">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        If you did not initiate this login session, contact the IT Security Response Team immediately.
      </div>
    </AdminSecureShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-secure-500">{label}:</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
