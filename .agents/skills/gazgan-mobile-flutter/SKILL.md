---
name: gazgan-mobile-flutter
description: Work on the Gazgan native Flutter mobile app in the `mobil/` folder. Use when Codex is asked about Gazgan Mobile, the mobile/native app, Flutter, Dart, Android/iOS, Supabase mobile integration, mobile reports/status/roadmaps, or implementing/reviewing/debugging anything under `mobil/`.
---

# Gazgan Mobile Flutter

## Core Context

Treat `mobil/` as a standalone Flutter app. Do not import code from `frontend/`, `miniapp/`, `admin/`, or `backend/`; share behavior through Supabase data contracts or duplicate small client-side models when needed.

Do not confuse:

- `mobil/`: native Flutter app for Android/iOS.
- `miniapp/`: Next.js Telegram Mini App running inside Telegram.

Use Uzbek for every user-visible label, title, placeholder, error, empty state, and button. Keep code identifiers in English.

## First Files To Read

For any mobile task, inspect current repo truth before answering or editing:

- `mobil/AGENTS.md`
- `mobil/pubspec.yaml`
- `mobil/docs/full-mobile-report.md`
- `mobil/docs/architecture.md`
- `mobil/docs/supabase-backend.md` when data/auth/Supabase is involved
- Relevant files under `mobil/lib/`

For a compact current snapshot, read `references/current-mobile-context.md`.

## Current App Shape

The app currently uses Flutter 3.x/Dart 3.x, `go_router`, `supabase_flutter`, Material 3 dark theme, mock data, and 5 bottom tabs:

- `/` -> Home
- `/projects` -> Projects
- `/products` -> Products
- `/calculator` -> Calculator
- `/profile` -> Profile

Supabase is optional at startup and initialized only when both `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` are provided via `--dart-define`.

## Working Rules

- Keep service role keys, DB passwords, AI provider keys, and access tokens out of Flutter.
- Use only Supabase publishable/anon keys in the app bundle.
- For public catalog data, require explicit RLS and grant checks.
- For user-specific flows, prefer `auth.uid()`-based policies once the mobile auth model is selected.
- Add real data through repository/service layers instead of querying Supabase directly from large UI widgets.
- When adding schema-dependent behavior, update Supabase migration/contracts, `miniapp/lib/supabase/types.ts` if shared schema changed, and Dart models in `mobil/`.
- Keep the premium Gazgan visual direction: graphite/ink surfaces, marble/granite imagery, gold accents, restrained investor-focused UI.

## AI Chat (Groq)

The floating AI button (`_FloatingAiButton` in `home_screen.dart`) opens `AiChatSheet` — a bottom sheet chat UI connecting to:
- **Endpoint:** `https://gazgan-invest.vercel.app/api/chat`
- **Provider:** Groq (llama-3.3-70b-versatile)
- **Protocol:** POST `{ message, history }` via `dart:io` HttpClient
- **UI features:** Quick question chips (ActionChip), typing indicator (animated dots), message bubbles, autoscroll

## Pull-to-Refresh

All main screens have `RefreshIndicator` with `AlwaysScrollableScrollPhysics`:
- **Home:** `home_screen.dart` — `_reloadAsync()` reloads projects + products
- **Projects:** `projects_screen.dart` — `_reloadAsync()` + filter chips
- **Products:** `products_screen.dart` — `_reloadAsync()`

## APK Build & Saqlash

Build komandasi (compile-time Supabase credentials):
```powershell
cd mobil
flutter build apk --release `
  --dart-define "SUPABASE_URL=https://ynkzcezrohjwirapxkeq.supabase.co" `
  --dart-define "SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlua3pjZXpyb2hqd2lyYXB4a2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4MjczMDQsImV4cCI6MjA5MzQwMzMwNH0.f_YlJEFOnU0Td4FtQkTwcVVGSzTLwqxaKy9j9HsJqcc"
```

**APK har doim shu yerga saqlansin:**
```powershell
cp mobil/build/app/outputs/flutter-apk/app-release.apk "apk_builds/Gazgan Invest.apk"
```

## Verification

Run checks from `mobil/` after code changes:

```powershell
flutter analyze
flutter test
```

If changing Android/iOS platform behavior, run the relevant emulator/device smoke test when toolchain support is available. If a check cannot run, state the blocker clearly.
