# Data And Auth Reference

Use this file for Supabase, Telegram auth, and backend data rules.

## MiniApp Supabase

Primary MiniApp tables currently documented:

- `users`: primary key `telegram_id`; includes `first_name`, `investor_level`, `last_seen_at`.
- `projects`: includes title, category, status, ROI, payback, amount, funding, location, trust, timeline, and ROI breakdown.
- `featured_products`: product cards with category, price, currency, image, and featured flag.
- `leads`: user/project lead submissions.
- `chat_messages`: assistant/user messages, optionally tied to a project.
- `saved_projects`: composite key by `telegram_id` and `project_id`.
- `project_documents`: project files and verification metadata.
- `notifications`: per-user notifications.
- `document_downloads`: document download tracking.

When changing this schema:

1. Add a SQL migration under `miniapp/supabase/migrations/`.
2. Update `miniapp/lib/supabase/types.ts`.
3. Update route handlers and services that read/write the changed table.
4. If the FastAPI backend also starts using the table, update backend models and schemas as a separate explicit change.

## Supabase Client Boundaries

Client-side MiniApp code uses anon/public Supabase configuration only. Server route handlers use `getSupabaseAdmin()` from `miniapp/lib/supabase/server` and may use `SUPABASE_SERVICE_ROLE_KEY`.

Never import server-only Supabase helpers into client components. Never expose service role values through `NEXT_PUBLIC_*`.

## Telegram Auth

Telegram SDK access is client-side only. Any code touching `window.Telegram` needs a client component or browser guard.

Expected user fallback for local preview is a stable local user such as `local_preview` with id `10001`, but inspect `miniapp/lib/telegram.ts` before relying on exact shape.

New protected MiniApp route handlers should validate Telegram `initData` server-side when possible. If validation is not implemented yet, keep the interface ready for it and avoid trusting arbitrary client user ids for sensitive actions.

## Backend Data/Auth

The backend database is separate from MiniApp Supabase unless a task explicitly unifies them. Existing SQLAlchemy models include users, quarries, products, workshops, investments, saved investments, and chat messages.

Use `Depends(get_db)` for sessions. Use settings from `app.config.settings`; never hardcode secrets. Prefer explicit response models for FastAPI docs.
