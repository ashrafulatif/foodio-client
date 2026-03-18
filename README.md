# Foodio Client

Frontend client for **Foodio** — a food ordering & menu management application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

- Live site: https://foodio-client-five.vercel.app/

## Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Bun** (used in scripts for dev/build/start)
- **Tailwind CSS v4**
- **shadcn/ui** + Radix primitives
- **Zod** + `@t3-oss/env-nextjs` (environment variable validation)
- `jsonwebtoken` (JWT decoding/verification utilities)

## Features (High Level)

- Public pages (Home, Menu browsing)
- Authentication pages (Login, Register)
- Customer protected area (Orders)
- Admin dashboard (Menu management, Orders management)
- Route guarding logic (auth/protected/admin redirects) via a proxy

## Project Structure

This repo uses the `src/` directory layout.

```
src/
  app/                 # Next.js App Router routes & layouts
    (commonLayout)/     # Public/common site layout group (navbar/footer)
    (dashboardLayout)/  # Dashboard route group (admin layouts)
  actions/             # Server actions (e.g. orders)
  components/          # UI + feature modules (shadcn/ui + app modules)
  context/             # React context providers (AuthProvider, CartProvider)
  lib/                 # Utilities (auth/jwt/utils, etc.)
  services/            # API/service layer (if used by modules)
  types/               # Shared TypeScript types
  zod/                 # Zod schemas (domain validation)
  env.ts               # Env var validation (required to run)
  apiInstance.ts       # Base backend URL + API endpoint constants
```

## Routes (selected)

### Common Layout (`src/app/(commonLayout)`)

- `/` – Home (Hero + categories)
- `/menu` – Menu browsing with filters (search/category/sort/pagination via `searchParams`)
- `/orders` – Customer orders page (**protected**)
- `/login` – Login page
- `/register` – Register page

### Dashboard Layout (`src/app/(dashboardLayout)`)

- `/dashboard/...` – Admin dashboard pages
  - `/dashboard/orders` – Order management (admin)
  - `/dashboard` (menu management group) – Menu items management

## Environment Variables

Environment variables are validated in `src/env.ts`. Create a `.env.local` file in the project root:

```bash
# Server-side (required)
BACKEND_URL="https://your-backend.example.com"
FRONTENDURL="http://localhost:3000"
JWT_ACCESS_SECRET="your-jwt-access-secret"

# Client-side (required)
NEXT_PUBLIC_API_BASE_URL="https://your-backend.example.com"
```

## Getting Started (Local Development)

### Prerequisites

- **pnpm** installed (scripts use Bun)
  - https://bun.sh/

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Open http://localhost:3000

## Build & Run (Production)

```bash
bun build
bun start
```

## Lint

```bash
pnpm lint
```

## API / Backend Integration

Backend endpoints are centralized in:

- `src/apiInstance.ts`
  - `API_BASE_URL` comes from `env.BACKEND_URL`
  - `API_ENDPOINTS` contains auth/users/menu-item/categories/orders endpoints

Example endpoints used:

- `/api/v1/auth/login`
- `/api/v1/auth/register`
- `/api/v1/orders`
- `/api/v1/menu-item`
- `/api/v1/categories`

### Rewrite Proxy (Auth)

In `next.config.ts`, requests to:

- `/api/v1/auth/:path*`

are rewritten to:

- `${NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/:path*`

This is typically done to simplify client calls and avoid CORS issues for auth routes.

## Auth & Route Protection

For route based access`proxy.ts` has been used:

- Redirects logged-in users away from `/login` and `/register`
- Redirects not-logged-in users to `/login` when accessing protected routes
- Prevents customers from accessing admin routes
- Prevents admins from accessing customer-only routes

It checks an `accessToken` cookie and inspects the JWT payload (including `role` and `exp`).

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a Pull Request
