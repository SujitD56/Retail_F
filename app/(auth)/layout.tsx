import { MinimalNavbar } from "@/components/layout/minimal-navbar";
import { ToastProvider } from "@/components/ui/toast";

// Customer auth screens (login/signup) use a minimal chrome — logo-only
// navbar, no site nav/footer — matching the "minimal-navbar" frame in the
// source design, distinct from the full (customer) layout.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <MinimalNavbar />
      <main className="flex flex-1 flex-col bg-cream-200">{children}</main>
    </ToastProvider>
  );
}
