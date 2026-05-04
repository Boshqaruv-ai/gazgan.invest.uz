# Architecture Reference

Use this file for app boundaries and repo orientation.

## Monorepo Shape

The repo root is `gazgan.invest.uz/`. Expected major areas:

- `frontend/`: public investment portal, Next.js App Router under `src/app`.
- `miniapp/`: Telegram Mini App, Next.js App Router at the app root, plus `screens/`, `components/`, `hooks/`, `services/`, `lib/`, and `supabase/migrations/`.
- `admin/`: separate Next.js admin app when present. Treat it like its own app, not as shared code for `frontend/`.
- `backend/`: FastAPI service with `app/main.py`, routers, models, schemas, database, and config. The repo may also contain `backend/app.py`; inspect current entrypoints before editing.
- `docs/`: supporting docs that may be stale; use as references, not unquestioned truth.

Generated directories such as `.next/`, `node_modules/`, `venv/`, and `.vercel/` are not architecture sources.

## App Boundaries

`frontend/`, `miniapp/`, and `admin/` are separate Next.js projects with separate dependencies and build commands. Do not cross-import between them.

Path alias expectations:

- `frontend`: `@/*` maps to `src/*`.
- `miniapp`: `@/*` maps to the app root.
- `admin`: inspect `admin/tsconfig.json`; do not assume it matches `frontend`.

Auth expectations:

- `frontend`: NextAuth session/cookie patterns.
- `miniapp`: Telegram `initData` and backend route validation.
- `admin`: inspect local auth setup before changes; likely NextAuth/Supabase based on dependencies.

## Backend Pattern

FastAPI routers are mounted from `backend/app/main.py` with `/api/...` prefixes. Use:

- `backend/app/config.py` for settings from env.
- `backend/app/database.py` for engine/session and `get_db`.
- `backend/app/models.py` for SQLAlchemy ORM.
- `backend/app/schemas.py` for Pydantic v2 schemas using `from_attributes = True`.
- `backend/app/routers/` for endpoint modules.

Always inspect the existing route and schema before adding or changing endpoint behavior.
