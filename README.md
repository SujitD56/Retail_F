# Ilkal Threads — Marketplace

A full 3-role handloom saree marketplace platform — **Customer** storefront,
**Retailer** seller portal, and **Admin** console — implemented from the
"Ilkal Threads — Marketplace Design System" Figma file (59 screens across 9
canvases) in Next.js, TypeScript, and Tailwind CSS.

Backed by a real API — Node.js/TypeScript/Express/Prisma/PostgreSQL, with
S3-backed image uploads — living in its **own separate repo/project**
(not a subfolder here; see [Backend](#backend)) instead of the mock
in-memory repositories this app started from. `lib/data/*` and
`lib/store/*` are the same seams the original mock build used; their
function bodies now call the API over HTTP instead of reading local
arrays, and every page/component kept the exact same call sites.

## Getting started

This app needs the backend running somewhere reachable — it's a separate
project (this machine currently has it at `../Practice- B`, adjust the path
below to wherever you cloned it):

```bash
# 1. Start Postgres + the API, from the backend's own repo
cd ../Practice-\ B
cp .env.example .env    # fill in DATABASE_URL, JWT secrets, AWS creds
docker compose up --build -d postgres api
# (first run only) apply the schema + demo data:
npm install && npm run prisma:migrate

# 2. Start the frontend, from this repo
cd -   # back to this repo
cp .env.local.example .env.local   # API_INTERNAL_URL + JWT_ACCESS_SECRET (must match the backend's .env)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The backend's
`prisma/seed.ts` prints demo logins (admin with its MFA QR code, a
customer, and one per seeded retailer) to the console on first
migrate/seed.

| Script | Purpose |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build — also the fastest way to catch type/route errors |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Signing in (real auth)

Real accounts, backed by the database — the login/signup forms call the
API, which issues httpOnly JWT session cookies. `lib/store/auth.ts` mirrors
the resulting `User` object for the UI; `proxy.ts` verifies the JWT
directly (no network round-trip) to gate `/retailer/*` and `/admin/*`,
redirecting signed-out visitors to the right login page. The backend's
seed script prints working demo logins for all three roles (admin's
includes a scannable MFA QR code) — see its console output after
`npm run prisma:migrate` or `npm run db:seed`.

| Role | Start here | Lands on |
|---|---|---|
| Customer | `/login` or `/signup` | `/account` |
| Retailer | `/retailer/login` | `/retailer/dashboard` |
| Admin | `/admin/login` (2-step: password → TOTP code at `/admin/mfa`) | `/admin/dashboard` |

To reset, log out from the account/profile menu on any role.

## Route map

```
app/
  (customer)/     storefront — home, PLP, PDP, search, retailers, collections,
                   account, wishlist, cart, checkout, order tracking
  (auth)/         customer login/signup — minimal chrome, no site nav/footer
  (events)/       customer-facing Style Challenge — landing, detail, entries,
                   leaderboard, winners, hall of fame, shop-the-event
  retailer/       seller portal — its own auth (login/5-step registration/
                   forgot-password), onboarding, dashboard, products, orders,
                   analytics, settings, collections, and a retailer-side
                   events module (join/submit/analytics/achievements)
  admin/          platform console — its own auth (login/MFA/forgot &
                   reset password/session-expired) on a dark "secure
                   terminal" shell, dashboard, retailers, products, orders,
                   and an admin events module (dashboard/create/moderation/
                   analytics)
```

One Next.js app, not a monorepo — Customer/Retailer/Admin are organized as
route-group/folder splits so they share the same Tailwind design tokens,
`components/ui/*` primitives, and data layer. `lib/`, `components/ui/`, and
`types/` are already framework-agnostic enough to extract into a monorepo
package later without a rewrite, if the three roles ever need independent
deploys.

## Architecture

- **Next.js 16** (App Router, Turbopack, TypeScript strict, `@/*` alias).
  `proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`) does the
  role-gating described above by verifying the same JWT the API issues as
  an httpOnly cookie — no network round-trip, just a signature check with
  a secret shared between this app's `.env.local` and the backend's `.env`
  (see [Backend](#backend) — it's a separate repo, this secret is the one
  thing that has to be copied between the two by hand).
- **Tailwind CSS v4** — design tokens (colors, radii, shadows, fonts) are
  defined once as `@theme` variables in `app/globals.css`, extracted
  directly from the Figma file's CSS output. `EB Garamond` (display/serif)
  + `Geist` (body/sans) via `next/font/google`.
- **State** — Zustand + `persist` for cart, wishlist, saved retailers, event
  votes, orders, and auth. Nothing server-side; everything survives a
  reload via `localStorage`.
- **Forms** — `react-hook-form` + `zod` on every form in the app (auth ×3
  roles, checkout, 5-step retailer registration, add-product, store
  settings, event submission/creation).
- **Tables** — `@tanstack/react-table` v8 powers every Retailer/Admin data
  table (`components/ui/data-table.tsx`) — sorting, pagination, one
  implementation reused everywhere.
- **Charts** — `recharts` for retailer/admin analytics.
- **UI primitives** — Radix (Dialog, Tabs, Accordion, Toast, Tooltip,
  DropdownMenu, Select, Checkbox, Avatar) wrapped as owned components under
  `components/ui/*`, styled with `class-variance-authority` + `cn()`.
- **Repository pattern** — `lib/data/*.ts` exposes `async` functions
  (`getProducts()`, `getRetailerBySlug()`, etc.) that call the API
  (`lib/api/server.ts`, server-only) or, for the handful of Client
  Components that need the same reads (cart/wishlist/checkout resolving
  productIds), `lib/api/client.ts` via the same-origin `/api/backend/*`
  rewrite in `next.config.ts`.
- **Resilience boundaries** — every role has its own `not-found.tsx` and
  `error.tsx` (built on the shared `EmptyState`/`ErrorState` components),
  plus `loading.tsx` skeletons on the heaviest data routes (PLP, PDP,
  retailer listing, and the Retailer/Admin data-table pages), so the
  pattern is already in place as real async data fetching is introduced.

## Backend

The API is a **separate project** — its own repo/folder, own `package.json`,
own git history, deployed independently from this frontend. It's not
importable from here and nothing in this repo builds it; the two integrate
purely over HTTP (see the env vars below and this repo's `next.config.ts`
rewrite). On this machine it currently lives at `../Practice- B`; wherever
it ends up, that project's own README documents the full integration
contract, its module-boundary rule, and its known scope cuts in detail.

In short: it's a modular-monolith API (Node.js/TypeScript/Express/Prisma/
PostgreSQL) — one module per domain (auth, products, retailers, orders,
events, admin, uploads…), each only reachable by other modules through its
own service functions or a domain event bus, so any module can be lifted
into its own microservice later without a redesign.

Image uploads (product photos, retailer logo/cover, event banners/entries)
go straight from the browser to S3 via a presigned URL the API issues
(`POST /uploads/presign`) — the API server never proxies file bytes.

Auth is real: JWT access + rotating refresh tokens as httpOnly cookies,
bcrypt-hashed passwords, and TOTP MFA for admin accounts (the seed script
prints a scannable otpauth:// URL). Checkout, stock, and pricing are always
recomputed server-side from the database — nothing client-submitted is
trusted for a charge.

**Known gaps:** a few screens (retailer store settings, event video-reel
submission) upload files but don't yet persist the resulting URL to a
backend record — the upload itself is real, the "save" step on those
specific forms isn't wired yet. The uploaded-image S3 bucket's IAM
credentials in this deployment can `PutObject`/`GetObject` but not
`DeleteObject`/`ListBucket`/CORS-config — image deletes drop the app's own
record of the file but can't remove the object itself, and the bucket's
CORS policy needs configuring (by whoever owns that AWS account) before
browser uploads will pass preflight from a real deployed origin.

## Known deliberate deviations from the source Figma

- **Generic UI icons** (search, heart, cart, chevrons, table/nav icons) are
  rendered with `lucide-react` rather than exported as individual SVG
  assets — all **photography** (product shots, retailer/artisan photos,
  hero banners, event entry images) is real, downloaded Figma exports in
  `public/images/**`.
- A handful of mock text fields conflict across duplicate/copy-pasted
  Figma frames (e.g. two different admin display names, or a discount
  percentage that doesn't match its own listed price on one screen). Where
  that happened, the more internally-consistent value was kept rather than
  reproducing the inconsistency, and the admin portal consistently uses one
  sidebar/identity across all of its screens.
