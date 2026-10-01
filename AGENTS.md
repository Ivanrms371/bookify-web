# Public web agent guidance

This independent Git repository contains both marketing and public business/booking pages. It uses Astro 7, React islands, Tailwind 4, TanStack Query and Zustand. Run pnpm commands here. When available, consult [parent guidance](../AGENTS.md), [architecture](../docs/architecture.md), and [cross-app workflow](../docs/cross-app-changes.md); the local guidance also applies when opened alone.

## Runtime and API boundaries

`astro.config.mjs` configures `output: 'server'` with the standalone Node adapter and React integration. `src/pages/index.astro` is marketing; `src/pages/b/[slug]/index.astro` is a public business page and `src/pages/b/[slug]/book.astro` renders the booking flow. Astro pages load public data on the server; interactive React components use directives such as `client:load`. Preserve the boundary between server data loading and hydrated islands, and never expose secrets through `PUBLIC_*` variables.

Domain code lives in `src/features`; shared API, layouts, components, types, utilities and state live in `src/shared`. `@/*` maps to `src/*` in `tsconfig.json`. Reuse existing components and island/provider/state patterns.

`src/shared/api/client.ts` uses axios with `PUBLIC_API_URL`, credentials and a timeout. Feature API functions consume backend `/api/public/*` endpoints for tenant, services, professionals and availability, including slot validation. Check the configured base URL and relative paths together rather than blindly adding another `/api` prefix. These are public resource contracts, not the dashboard's authenticated tenant-header flow.

The booking wizard and data/availability selection exist, but `src/features/booking/api/create-booking.api.ts`, `cancel-booking.api.ts`, and `reschedule-booking.api.ts` are empty async placeholders wrapped in mutation hooks. Do not report booking submission/cancellation/rescheduling as functional merely because the UI or backend endpoints exist. Backend management-token routes also do not imply matching web pages exist. Trace implementation and failure/redirect behavior for each claimed capability.

## Commands and validation

| Command | Behavior |
| --- | --- |
| `pnpm dev` | Starts Astro dev server (default CLI port 4321). |
| `pnpm exec astro dev --background` | Starts background dev mode; supported by the installed CLI. |
| `pnpm exec astro dev status` / `pnpm exec astro dev logs` / `pnpm exec astro dev stop` | Inspects/logs/stops that background server; `stop` changes running process state. |
| `pnpm build` | Runs `astro build`; writes server/client output to `dist` and generated artifacts. |
| `pnpm preview` | Starts preview of built output. |
| `pnpm format:check` | Prettier check without rewriting files. |
| `pnpm format` | Prettier `--write .`; rewrites files across the app. |

The manifest requires Node >=22.12.0. No app test or typecheck script, automated tests, or repository CI workflows were found. A build is not proof of working booking mutations or complete TypeScript validation. Validate relevant server-rendered pages and island interactions when authorized; runtime data loading needs a reachable API and compatible environment configuration. Templates are not a verified complete setup guide.

Coordinate public DTO/response/availability changes with `../backend` and inspect `../frontend` for shared contracts. If siblings are unavailable, report coordination needed. Preserve this Git root and dirty state; the parent currently does not track this app. Do not start servers, run rewriting commands, change dependencies/environment or mutate databases as incidental documentation work. Current session sandbox/approval restrictions apply. No web-specific operational skill is defined; backend/dashboard skills apply to their owning apps, not this app. Historical deleted dependency rules remain pending reconciliation.

## Documentation and evidence

Documentation provides architectural/domain context, but relevant code and tests remain the evidence of actual behavior. When documentation conflicts with implementation:

- Do not silently choose one.
- Report the inconsistency.
- Determine actual behavior from relevant implementation/tests.
- Update documentation when the current task changes documented behavior.
