# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project

SportSee — a French-language sports analytics dashboard (OpenClassrooms P9). React 19 + TypeScript + Vite SPA that renders four Recharts visualizations (activity bars, session line, performance radar, score radial) plus nutrition metric cards for a user profile.

## Commands (pnpm)

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Vite dev server on http://localhost:5173 |
| `pnpm dev:all` | Dev server + Express backend (`Backend/`, port 3000) together |
| `pnpm build` | Production build to `dist/` (also emits `dist/stats.html` bundle report) |
| `pnpm preview` | Preview the production build on port 3000 |
| `pnpm lint` / `pnpm lint:fix` | ESLint over `src` |
| `pnpm lint:styles` | Stylelint over `src/**/*.css` |
| `pnpm format` / `pnpm format:check` | Prettier write / check |
| `pnpm exec tsc --noEmit` | Type check (also runs inside dev/build via vite-plugin-checker) |
| `pnpm docs` | Generate TypeDoc into `docs/` (gitignored; CI republishes it under `/jdocs`) |

There is no test suite.

## Data source switching

`VITE_USE_API` (in `.env`) selects the data source at build time: `true` → Axios calls to the backend at `VITE_API_URL`, `false` → in-memory mocks from `src/data/mockData.ts`. `.env.production` forces mock data because GitHub Pages has no backend. Mock data only has users `12` and `18`.

## Architecture

Data flows one way: route loader → client → builder → typed props for components.

- `src/main.tsx` — router setup (`/` home, `/profile/:id` with `profileLoader`).
- `src/loaders/profileLoader.ts` — fetches the four datasets with `Promise.allSettled`; each section of the profile page degrades independently (null → fallback message).
- `src/client/client.ts` — public API (`getUser`, `getUserActivity`, …). Picks the API or mock fetcher based on `USE_API`, then normalizes via builders.
- `src/client/builders.ts` — validates/normalizes raw payloads into the types in `src/types/user.ts`, reconciling API/mock field differences (`todayScore` vs `score`, `keyData` vs `nutritionData`, `kind` vs `categories`). Uses guards from `src/helpers/validator.ts` which throw on invalid data.
- `src/pages/Profile/Profile.tsx` — lazy-loads the four chart components (each is its own chunk; recharts sits in the shared `vendor-charts` chunk).
- `src/components/Charts/*` — one file + one CSS file per chart; shared card styles in `style/charts.css`, shared colors/values in `src/constants/chartConstants.ts`.

Components never call the client directly — data enters through route loaders (`useLoaderData`).

## Conventions

- Imports use the `@/` alias for `src/` (tsconfig paths + vite-tsconfig-paths).
- UI copy is French; keep new user-facing text in French.
- CSS is plain, component-scoped, BEM-style class names; stylelint enforces alphabetical property order.
- ESLint enforces `import/order` (external, then `@/` internal, blank line between groups, alphabetized).
- `Backend/` is the OpenClassrooms-provided Express API — treat as vendored, don't refactor it.
- CI (`.github/workflows/ci.yml`) runs docs, build, typecheck, both linters and prettier check on every push; keep all of them green.
