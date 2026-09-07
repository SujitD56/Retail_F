import Image from "next/image";

export function EventHero({
  eyebrow,
  title,
  description,
  imageUrl,
  children,
  height = "h-[480px]",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  imageUrl: string;
  children?: React.ReactNode;
  height?: string;
}) {
  return (
    <section className={`relative flex ${height} items-center px-16`}>
      <Image src={imageUrl} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[rgba(30,27,24,0.5)]" />
      <div className="relative z-10 flex max-w-[640px] flex-col gap-6">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-wide text-gold-400">{eyebrow}</p>}
        <h1 className="font-display text-6xl font-bold leading-[1.1] text-cream-100">{title}</h1>
        {description && <p className="text-lg leading-relaxed text-cream-300">{description}</p>}
        {children}
      </div>
    </section>
  );
}
