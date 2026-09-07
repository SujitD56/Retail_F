"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { AdminSecureShell, SecurityNotice } from "@/components/admin/secure-shell";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function AdminForgotPasswordPage() {
  const { toast } = useToast();

  return (
    <AdminSecureShell badge="Reset Password">
      <div className="mb-6 text-center">
        <h1 className="font-display text-2xl text-white">Access Assistance</h1>
        <p className="mt-1.5 text-sm text-secure-500">Enter your admin email to receive a verified security link</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast({ title: "Secure reset link sent", variant: "success" });
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <Label htmlFor="adminResetEmail" required className="text-white">
            Registered Admin Email Address
          </Label>
          <Input id="adminResetEmail" icon={<Mail className="size-4" />} className="border-secure-700 bg-secure-800 text-white placeholder:text-secure-500" />
        </div>

        <div className="rounded-sm border border-secure-700 bg-secure-800/60 p-4 text-xs leading-relaxed text-secure-500">
          <p>• A reset link will be sent to your registered address if it belongs to an active administrator.</p>
          <p className="mt-2">• Security links expire in exactly 15 minutes.</p>
        </div>

        <Button type="submit" size="lg" className="mt-1 h-12 w-full">
          Send Secure Reset Link
        </Button>
        <Link href="/admin/login" className="flex items-center justify-center gap-1.5 text-sm font-medium text-secure-accent">
          <ArrowLeft className="size-3.5" /> Back to Secure Login
        </Link>
      </form>

      <SecurityNotice text="Authorized personnel only. All access, events, and active sessions are monitored and logged." />
    </AdminSecureShell>
  );
}
