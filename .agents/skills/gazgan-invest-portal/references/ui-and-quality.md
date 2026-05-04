# UI And Quality Reference

Use this file for UI copy, theme tokens, and verification.

## Language

All user-visible text must be Uzbek. This includes button labels, field labels, placeholders, validation errors, empty states, titles, route-visible content, and notification text.

Code identifiers should stay English. Comments may be Uzbek or English; keep comments rare and useful.

## Theme Tokens

Prefer Tailwind config tokens from the target app.

Public frontend tokens include:

- `primary`, `secondary`, `accent`, `accentLight`
- `dark`, `card`, `line`, `copy`, `muted`
- `marble`, `granite`

MiniApp tokens include:

- `ink`, `panel`, `card`
- `gold`, `goldSoft`
- `copy`, `muted`, `line`
- shadows such as `premium` and `gold`
- iOS-style radii such as `ios-lg`, `ios-md`, `ios-sm`

Admin tokens must be read from `admin/tailwind.config.*` before use.

Avoid new inline colors unless there is a concrete reason and the app theme is updated deliberately.

## Telegram Mini App UI

Respect Telegram viewport CSS variables and existing initialization behavior in `miniapp/lib/telegram.ts`.

`BottomNav` is persistent in the MiniApp and navigation uses `useRouter`, not regular `Link`, when matching the established pattern. BackButton behavior is managed by `useTelegramWebApp`.

## Validation Commands

Run checks from the app that changed:

- `frontend`: `npm run lint`; `npm run build` when feasible.
- `miniapp`: `npm run lint`; `npm run build` when feasible.
- `admin`: `npm run lint`; `npm run build` when feasible.
- `backend`: inspect available requirements and run the nearest import, test, or server startup smoke check that does not require unavailable secrets.

If only docs or a skill changed, run the relevant validator instead of app builds.

## Dependency Discipline

Before adding packages, inspect the specific app's manifest. `frontend`, `miniapp`, and `admin` do not share dependencies. Add a dependency only to the app that needs it.
