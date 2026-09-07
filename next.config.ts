import type { NextConfig } from "next";

// The browser only ever talks to same-origin `/api/backend/*` — Next.js
// proxies that to the real API server. This sidesteps CORS entirely and
// keeps the API's httpOnly session cookies same-site in dev (different
// ports) and in prod (same domain, reverse-proxied). Server Components call
// the API directly (see lib/api/server.ts) since they aren't subject to
// browser CORS/cookie-origin rules to begin with.
const API_INTERNAL_URL = process.env.API_INTERNAL_URL ?? "http://localhost:4000/api/v1";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/api/backend/:path*", destination: `${API_INTERNAL_URL}/:path*` }];
  },
  images: {
    remotePatterns: [
      // Uploaded product/retailer/event imagery lives in S3 — allow
      // next/image to optimize it directly from the bucket (virtual-hosted
      // `<bucket>.s3.<region>.amazonaws.com` URLs), and/or a CDN domain in
      // front of it (CloudFront, or a custom S3_PUBLIC_HOSTNAME).
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: process.env.S3_PUBLIC_HOSTNAME ?? "**.cloudfront.net" },
    ],
  },
};

export default nextConfig;
