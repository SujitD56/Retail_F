import { Award, RefreshCw, ShieldCheck, Users } from "lucide-react";

const ITEMS = [
  { icon: Award, title: "Authentic Ilkal Sarees", description: "100% verified pure handloom products featuring geographical indication standards." },
  { icon: Users, title: "Verified Retailers", description: "Every store is rigorously vetted to ensure fair wages and genuine weaver origins." },
  { icon: ShieldCheck, title: "Secure Payments", description: "Fully encrypted transaction gateways supporting global payment routes securely." },
  { icon: RefreshCw, title: "Easy Returns", description: "Zero-fuss, 7-day hassle-free return policy to guarantee absolute delight." },
];

export function Trust() {
  return (
    <section className="grid grid-cols-1 gap-10 border-y border-cream-300 bg-white px-5 py-16 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-20">
      {ITEMS.map(({ icon: Icon, title, description }) => (
        <div key={title} className="flex flex-col items-start gap-3">
          <span className="flex size-10 items-center justify-center rounded-pill bg-primary-600/[0.07] text-primary-600">
            <Icon className="size-5" />
          </span>
          <p className="font-display text-lg text-primary-600">{title}</p>
          <p className="text-[13px] leading-relaxed text-ink-700">{description}</p>
        </div>
      ))}
    </section>
  );
}
