// lucide-react dropped brand/logo glyphs (Instagram, Facebook, Twitter, YouTube)
// from its icon set — these small inline SVGs fill that gap so the footer
// doesn't depend on an external icon-font or logo library for four marks.
import type { SVGProps } from "react";

export function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.99 3.03 15.02 3 13.9 3 11.4 3 9.7 4.51 9.7 7.3v2.3H7v3.2h2.7V21h3.8Z" />
    </svg>
  );
}

export function TwitterGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3h3.1l-6.77 7.73L23.2 21h-6.23l-4.88-6.38L6.5 21H3.4l7.24-8.27L2.8 3h6.38l4.4 5.83L18.9 3Zm-1.09 16.2h1.72L7.28 4.72H5.43L17.81 19.2Z" />
    </svg>
  );
}

export function GoogleGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.99.66-2.25 1.05-3.72 1.05-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.66-2.85Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

export function YoutubeGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 8.6a3.4 3.4 0 0 0-2.4-2.4C17.8 5.7 12 5.7 12 5.7s-5.8 0-7.6.5A3.4 3.4 0 0 0 2 8.6 35 35 0 0 0 1.5 12a35 35 0 0 0 .5 3.4A3.4 3.4 0 0 0 4.4 17.8c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a3.4 3.4 0 0 0 2.4-2.4A35 35 0 0 0 22.5 12a35 35 0 0 0-.5-3.4Z" />
      <path d="m10 9.8 5 2.2-5 2.2Z" fill="currentColor" />
    </svg>
  );
}
