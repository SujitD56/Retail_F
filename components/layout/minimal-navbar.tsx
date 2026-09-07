import Link from "next/link";

export function MinimalNavbar() {
  return (
    <header className="flex h-[88px] w-full items-center justify-center border-b border-cream-300 bg-white px-20">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-display text-[32px] font-semibold text-primary-600">Ilkal Threads</span>
        <span className="h-5 w-px bg-cream-300" />
        <span className="text-xs font-medium uppercase text-gold-400">Marketplace</span>
      </Link>
    </header>
  );
}
