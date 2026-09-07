import { ToastProvider } from "@/components/ui/toast";

export default function RetailerRootLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
