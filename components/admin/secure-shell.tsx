import { ShieldAlert } from "lucide-react";

/**
 * Distinct dark "secure terminal" shell for the 5 Admin Authentication
 * screens — intentionally different from the Retailer/Customer auth shells,
 * matching the "geometric-backdrop" + "security-topbar" pattern from the
 * source design's "11 — Admin Authentication" canvas.
 */
export function AdminSecureShell({ badge, children }: { badge: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-secure-950 text-white">
      <div className="flex h-11 items-center justify-between border-b border-secure-700 px-10 text-xs text-secure-500">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-secure-accent" />
          Ilkal Threads Secure Server
        </span>
        <span>Node: secure_gateway_v3.2</span>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-[440px] rounded-lg border border-secure-700 bg-secure-900 p-9">
          <div className="mb-8 flex flex-col items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-sm bg-gold-400 font-display text-2xl font-bold text-primary-600">I</span>
            <div className="flex flex-col items-center gap-2">
              <p className="font-display text-2xl tracking-wide">ILKAL THREADS</p>
              <span className="rounded-pill bg-secure-800 px-3 py-1 text-[11px] font-semibold text-secure-accent">{badge}</span>
            </div>
          </div>
          {children}
        </div>
      </div>

      <div className="flex h-10 items-center justify-between border-t border-secure-700 px-10 text-[11px] text-secure-500">
        <span>SYSTEM STATUS: OK • ENCRYPTION: TLS_1.3_AES_256_GCM</span>
        <span>© 2026 Ilkal Threads IT Security</span>
      </div>
    </div>
  );
}

export function SecurityNotice({ text }: { text: string }) {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-sm border border-secure-700 bg-secure-800/60 p-4 text-xs text-secure-500">
      <ShieldAlert className="mt-0.5 size-4 shrink-0" />
      {text}
    </div>
  );
}
