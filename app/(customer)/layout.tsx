import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <TooltipProvider delayDuration={200}>
        <Navbar />
        <main className="flex-1 bg-cream-200">{children}</main>
        <Footer />
      </TooltipProvider>
    </ToastProvider>
  );
}
