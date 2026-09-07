import Image from "next/image";

export function AuthSplitCard({
  imageSrc,
  eyebrow,
  heading,
  description,
  children,
}: {
  imageSrc: string;
  eyebrow: string;
  heading: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-[1000px] overflow-hidden rounded-lg border border-cream-300 bg-white shadow-card max-lg:flex-col">
        <div className="relative flex w-[500px] shrink-0 flex-col items-start justify-end p-12 max-lg:w-full max-lg:p-8">
          <Image src={imageSrc} alt="" fill sizes="500px" className="object-cover" />
          <div className="absolute inset-0 bg-primary-600/65" />
          <div className="relative z-10 flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase text-gold-400">{eyebrow}</p>
            <p className="font-display text-[32px] leading-[1.2] text-white">{heading}</p>
            <p className="text-sm leading-relaxed text-cream-400">{description}</p>
          </div>
        </div>
        <div className="flex w-[500px] shrink-0 flex-col gap-6 p-10 max-lg:w-full">{children}</div>
      </div>
    </div>
  );
}
