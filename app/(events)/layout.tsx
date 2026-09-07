import { EventsNavbar } from "@/components/layout/events-navbar";
import { Footer } from "@/components/layout/footer";
import { ToastProvider } from "@/components/ui/toast";

// The Events module uses its own promo-bar + nav-bar shell (see the
// "06/08/09 — Events" canvases in the source design) instead of the main
// storefront Navbar, so it lives in its own route group.
export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <EventsNavbar />
      <main className="flex-1 bg-cream-100">{children}</main>
      <Footer />
    </ToastProvider>
  );
}
