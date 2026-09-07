export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center gap-3 text-center">
      <p className="text-xs font-semibold uppercase text-gold-400">{eyebrow}</p>
      <h2 className="font-display text-4xl text-primary-600 sm:text-[42px]">{title}</h2>
      {description && <p className="text-base leading-relaxed text-ink-700">{description}</p>}
    </div>
  );
}
