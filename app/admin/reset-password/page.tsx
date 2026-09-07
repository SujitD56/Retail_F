"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Lock, X } from "lucide-react";
import { AdminSecureShell } from "@/components/admin/secure-shell";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const RULES = [
  { key: "length", label: "8 or more characters minimum", test: (v: string) => v.length >= 8 },
  { key: "upper", label: "Includes uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { key: "lower", label: "Includes lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { key: "digit", label: "Includes numeric digit", test: (v: string) => /[0-9]/.test(v) },
  { key: "special", label: "Includes special character (!@#$%)", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

export default function AdminResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const passed = useMemo(() => RULES.filter((r) => r.test(password)).length, [password]);
  const strengthLabel = ["Very Weak", "Weak", "Fair", "Good", "Strong"][passed] ?? "Very Weak";

  return (
    <AdminSecureShell badge="Admin Security">
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl text-white">Establish Credentials</h1>
        <p className="mt-1.5 text-sm text-secure-500">Configure a strong password meeting government standards</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/admin/login");
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <Label htmlFor="newAdminPassword" required className="text-white">
            New Administrative Password
          </Label>
          <Input
            id="newAdminPassword"
            type="password"
            icon={<Lock className="size-4" />}
            className="border-secure-700 bg-secure-800 text-white placeholder:text-secure-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={cn("h-1 flex-1 rounded-full", i < passed ? "bg-secure-accent" : "bg-secure-700")} />
            ))}
            <span className="ml-2 whitespace-nowrap text-[11px] font-medium text-secure-accent">{strengthLabel}</span>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmAdminPassword" required className="text-white">
            Confirm Administrative Password
          </Label>
          <Input
            id="confirmAdminPassword"
            type="password"
            icon={<Lock className="size-4" />}
            className="border-secure-700 bg-secure-800 text-white placeholder:text-secure-500"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 rounded-sm border border-secure-700 bg-secure-800/60 p-4">
          {RULES.map((r) => {
            const ok = r.test(password);
            return (
              <div key={r.key} className="flex items-center gap-2 text-xs">
                {ok ? <Check className="size-3.5 text-secure-accent" /> : <X className="size-3.5 text-secure-500" />}
                <span className={ok ? "text-white" : "text-secure-500"}>{r.label}</span>
              </div>
            );
          })}
        </div>

        <Button type="submit" size="lg" disabled={passed < 5 || password !== confirm || !password} className="mt-1 h-12 w-full">
          Save and Reset Password
        </Button>
      </form>
    </AdminSecureShell>
  );
}
