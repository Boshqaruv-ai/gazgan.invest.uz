---
name: gazgan-invest-portal
description: Work safely in the G'ozg'on/Gazgan Invest portal monorepo. Use when Codex is changing, reviewing, debugging, or planning work in this project, including the public frontend, Telegram Mini App, admin app, FastAPI backend, Supabase schema/auth/data flows, Uzbek UI copy, Tailwind theme tokens, and repo-specific architecture rules.
---

# Gazgan Invest Portal

## Core Workflow

Start from repo truth, not memory. Inspect the relevant app root, manifests, routes, schemas, and nearby files before changing behavior. Treat `AGENTS.md` as the high-level source of truth, but verify the current file layout because the repo can drift.

Keep the apps independent:

- `frontend/` is the public Next.js portal with `@/* -> src/*`.
- `miniapp/` is the Telegram Mini App with `@/* -> ./*`.
- `admin/` is a separate Next.js admin app if present.
- `backend/` is the FastAPI service.

Do not import code across `frontend/`, `miniapp`, and `admin`. If logic must be shared, duplicate the small piece or ask before introducing a shared package.

## When Working

- Use Uzbek for all user-visible UI copy, labels, placeholders, titles, errors, and empty states.
- Prefer existing dependencies and local helpers. Add a package only after checking the app-specific `package.json` or `requirements.txt`.
- Use each app's Tailwind tokens instead of ad hoc colors. Read the target app's `tailwind.config.*` before adding new colors.
- Keep secrets server-side. Never expose `SUPABASE_SERVICE_ROLE_KEY`; only `NEXT_PUBLIC_*` values may reach clients.
- For Supabase schema changes in `miniapp/`, add a migration and update `miniapp/lib/supabase/types.ts`.
- For Telegram Mini App client code, guard `window`/`document`, initialize Telegram only client-side, and respect Telegram viewport, BackButton, BottomNav, and haptic helper patterns.
- For backend work, use FastAPI dependencies, typed Pydantic schemas, SQLAlchemy sessions from `get_db`, and settings from `app.config.settings`.

## References

Load only the reference needed for the current task:

- `references/architecture.md` for app boundaries, routing, path aliases, and current repo shape.
- `references/data-and-auth.md` for Supabase tables, Telegram auth, service-role boundaries, and backend data/auth patterns.
- `references/ui-and-quality.md` for UI language, Tailwind tokens, validation commands, and quality checks.

## Verification

Run checks from the app directory that changed:

- Next.js apps: `npm run lint` and `npm run build` when feasible.
- Backend: run the available FastAPI/Python checks or import smoke tests based on the current backend setup.

If a command cannot run because dependencies, env vars, or network access are missing, report that explicitly and still do the highest-signal static checks available.
