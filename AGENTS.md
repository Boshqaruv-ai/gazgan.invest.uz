# G'ozg'on Investitsion Portali — Agent Ko'rsatmalari (AGENTS.md)

## 1. Loyiha Tavsifi (Project Overview)

**Loyiha nomi:** G'ozg'on (Gazgan) Investitsion Portali  
**Maqsad:** Marmar va granit investitsiyalari uchun interaktiv veb-portal + Telegram Mini App. Investorlarga loyihalar, konlar, mahsulotlar va AI konsultant orqali yordam ko'rsatadi.  
**Asosiy til:** O'zbekcha (UI matnlari, URL sluglar va content). Inglizcha va ruscha qo'llab-quvvatlash rejalashtirilgan.  

**Platformalar:**
1. **Asosiy veb-portal** (`frontend/`): Next.js 16 App Router, Vercel-ga deploy qilinadi.
2. **Telegram Mini App** (`miniapp/`): Next.js 16 App Router, Telegram WebApp SDK bilan, Vercel-ga deploy qilinadi.
3. **Backend API** (`backend/`): Python FastAPI, SQLAlchemy + Pydantic, keyinchalik AWS deploy.

## 2. Monorepo Tuzilishi

```
gazgan.invest.uz/
├── frontend/              # Asosiy veb-portal (Next.js 16)
│   ├── src/app/           # Sahifalar (App Router)
│   ├── src/components/    # UI komponentlar
│   ├── src/features/      # Business feature modullar
│   ├── src/lib/           # Utils va data
│   └── src/types/         # TS types
├── miniapp/               # Telegram Mini App (Next.js 16)
│   ├── app/               # Sahifalar (App Router)
│   ├── screens/           # Screen komponentlar (Tab 1: HomeScreen, etc.)
│   ├── components/        # UI va layout komponentlar
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service funksiyalar
│   ├── lib/               # Utils, Telegram SDK, Supabase
│   └── supabase/migrations/ # SQL migratsiyalar
├── backend/               # Python FastAPI
│   ├── app/main.py        # FastAPI entry point
│   ├── app/models.py      # SQLAlchemy ORM modellar
│   ├── app/schemas.py     # Pydantic schemalar
│   ├── app/routers/       # API endpoint routerlari
│   ├── app/database.py    # DB engine & session
│   └── app/config.py      # Settings (.env dan)
└── docs/                  # Qo'shimcha hujjatlar
```

## 3. Texnologiyalar Stacklari

### 3.1. Frontend (Veb-portal)
- **Next.js:** 16.2.4 (App Router, `src/` papkali tuzilma)
- **React:** 18.3.1
- **TypeScript:** 5.4.5 (strict mode)
- **Tailwind CSS:** 3.4.3
- **State Management:** Zustand 4.5.2
- **Auth:** Next-Auth 4.22.1
- **Icons:** Lucide React 0.378.0
- **Animatsiyalar:** Framer Motion 12.38.0
- **Database:** Supabase (`@supabase/supabase-js`)
- **Utils:** clsx, tailwind-merge

### 3.2. Telegram Mini App (`miniapp/`)
- **Next.js:** 16.2.4 (App Router, `src/` **yo'q**, bevosita root)
- **React:** 18.3.1
- **TypeScript:** 5.7.2 (strict mode)
- **Tailwind CSS:** 3.4.16 (o'ziga xos ranglar va spacing)
- **Auth:** Telegram WebApp `initData` orqali (bekent, bot orqali)
- **Database:** Supabase (`@supabase/ssr` va `@supabase/supabase-js`)
- **Icons:** Lucide React 0.468.0
- **Animatsiyalar:** Framer Motion 12.38.0
- **Charts:** Recharts 2.15.0
- **HTTP:** Axios 1.7.9 (agar kerak bo'lsa)
- **Telegram SDK:** `https://telegram.org/js/telegram-web-app.js` (Script orqali yuklanadi)

### 3.3. Backend API (`backend/`)
- **Python:** 3.11+
- **Framework:** FastAPI
- **ORM:** SQLAlchemy 2.0+
- **Validation:** Pydantic 2.0+ (schemas.py), pydantic-settings (config.py)
- **Database:** SQLite (dev), PostgreSQL (prod)
- **CORS:** FastAPI CORSMiddleware
- **Auth:** JWT (rejalashtirilgan, hozirgi config'da SECRET_KEY va ACCESS_TOKEN_EXPIRE_MINUTES bor)

## 4. Muhim Arxitekturaviy Qoidalar

### 4.1. Ikkita alohida Next.js Ilova (Frontend vs MiniApp)
**Eng muhim narsa:** `frontend/` va `miniapp/` ikkita **mustaqil** Next.js loyihadir. Ularning o'rtasida dependency (paketlar) sharing yo'q.

| Xususiyat | `frontend/` | `miniapp/` |
|-----------|-------------|------------|
| Tsconfig paths | `@/*` -> `src/*` | `@/*` -> `./*` |
| Auth | Next-Auth (session/cookie) | Telegram initData (header orqali) |
| Supabase client | `@supabase/supabase-js` | `@supabase/ssr` + server-only admin |
| Routing | Next.js App Router sahifalari | Next.js App Router + `screens/` pattern |
| Style tokens | `primary`, `secondary`, `accent` | `ink`, `panel`, `card`, `gold` |

**HECH QACHON** `frontend/` va `miniapp/` kodlarini bir-biriga bog'lamang (shared library sifatida). Agar shared logic kerak bo'lsa, ikkisiga nusxa ko'chiring yoki umumiy `packages/` papkasi yaratishdan oldin maslahatlashing.

### 4.2. Telegram Mini App Constraints
- **Telegram WebApp SDK** faqat client-side ishlaydi (`'use client'`). Server tomonida `window` yo'q.
- Tasodifiy foydalanuvchi fallback: `local_preview` username bilan `id: 10001`. Telefonda esa `window.Telegram.WebApp.initDataUnsafe.user` bo'ladi.
- **Viewport:** Telegram own viewport'idan foydalanadi. CSS variables: `--tg-viewport-height`, `--tg-stable-height`. `100dvh` emas, balki `h-[calc(var(--tg-viewport-height))]` kabi ishlatiladi.
- **Scroll:** `overscroll-behavior: none` va `overflow: hidden` bilan boshqariladi (`lib/telegram.ts` -> `initializeTelegramApp`).
- **Header/Background/BottomBar colors:** `#0B0F1A` ga o'rnatilgan. Yangi rang kiritishdan oldin `lib/telegram.ts` ni tekshiring.
- **Haptic Feedback:** `triggerTelegramHaptic()` funksiyasi orqali chaqiriladi. Muvaffaqiyatsiz bo'lsa error throw qilmaydi (catch ichida).
- **BottomNav:** `miniapp/components/layout/BottomNav.tsx` doimiy ravishda ko'rinadi. Navigatsiya `useRouter` orqali Next.js `Link` bilan emas.
- **BackButton:** `useTelegramWebApp` hook'i avtomatik ravishda BackButton'ni boshqaradi (home'da hide, boshqa sahifalarda show + `router.back()`).

### 4.3. Supabase Ulanish Patternlari

#### Frontend (`frontend/src/lib/supabase/`)
- `createClient` Supabase'dan odatdagi `createBrowserClient` / `createServerClient` (agar `@supabase/ssr` ishlatilsa).

#### MiniApp (`miniapp/lib/supabase/`)
- **Client-side:** `createClient` from `@supabase/supabase-js` (`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- **Server-side (Route Handlers):** `getSupabaseAdmin()` from `@/lib/supabase/server` (uses `server-only`). Bu `SUPABASE_SERVICE_ROLE_KEY` bilan ishlaydi va RLS'dan chetda.
- **Types:** `lib/supabase/types.ts` da barcha jadvallar uchun to'liq TypeScript Database interfeysi bor. YANGI TABLE yoki COLUMN qo'shganda ushbu faylni yangilang.

### 4.4. Backend API Patternlari (FastAPI)
- **Entry:** `backend/app/main.py` barcha routerlarni `prefix="/api/..."` bilan ulaydi.
- **Settings:** `backend/app/config.py` da `pydantic_settings.BaseSettings` ishlatiladi. `.env` ni o'qiydi.
- **Database:** SQLAlchemy `declarative_base()`. SQLite uchun `check_same_thread=False`. Session `get_db()` dependency orqali beriladi.
- **Models:** `models.py` da aloqalar (`relationship`) hali ko'p ishlatilmagan, lekin `ForeignKey` bor.
- **Schemas:** `schemas.py` da `from_attributes = True` (Pydantic v2) ishlatiladi.
- **CORS:** `settings.CORS_ORIGINS` listini o'qiydi.

## 5. Ma'lumotlar Bazasi Schemalari

### 5.1. Supabase (`miniapp/lib/supabase/types.ts`)
Asosiy jadvallar va ularning kalit xususiyatlari:

| Table | Primary Key | Asosiy maydonlar |
|-------|-------------|------------------|
| `users` | `telegram_id` (text) | `first_name`, `investor_level` ('standard'\|'gold'\|'platinum'), `last_seen_at` |
| `projects` | `id` (text) | `title`, `category`, `status` ('HOT'\|'NEW'\|'ACTIVE'\|'FUNDED'), `roi`, `payback_years`, `amount`, `investment_required`, `investment_raised`, `funding_percentage`, `location`, `trust_level`, `timeline`, `roi_breakdown` |
| `featured_products` | `id` (text) | `title`, `category` ('marble_slabs'\|...), `price`, `currency`, `image`, `is_featured` |
| `leads` | `id` (text, uuid) | `telegram_id` -> users, `project_id` -> projects, `message` |
| `chat_messages` | `id` (text, uuid) | `telegram_id` -> users, `role` ('user'\|'assistant'), `message`, `project_id` |
| `saved_projects` | PK: (`telegram_id`, `project_id`) | `created_at` |
| `project_documents` | `id` (text, uuid) | `project_id` -> projects, `title`, `file_url`, `document_type` ('pdf'\|'certificate'\|...), `is_verified` |
| `notifications` | `id` (text, uuid) | `telegram_id` -> users, `title`, `body`, `is_read` |
| `document_downloads` | `id` (text, uuid) | `telegram_id`, `document_id` -> project_documents |

### 5.2. FastAPI/SQLAlchemy (`backend/app/models.py`)
| Model | Table | Primary Key | Eslatma |
|-------|-------|-------------|---------|
| `User` | `users` | `id` (int) | `email`, `password_hash`, `role` default `"investor"` |
| `Quarry` | `quarries` | `id` (int) | `slug` unique, `name_uz`, `colors` ARRAY, `reserves`, `density` |
| `Product` | `products` | `id` (int) | `slug` unique, FK `quarry_id`, `dimensions`, `thickness`, `finish_type`, `price_per_unit` |
| `Workshop` | `workshops` | `id` (int) | `annual_capacity`, `equipment` ARRAY |
| `Investment` | `investments` | `id` (int) | `slug` unique, `min_amount`, `expected_roi`, `payback_years`, `requirements` |
| `SavedInvestment` | `saved_investments` | `id` (int) | FK `user_id`, `investment_id` |
| `ChatMessage` | `chat_messages` | `id` (int) | FK `user_id` nullable, `role`, `content` |

**Diqqat:** Backend va MiniAppning ma'lumotlar bazalari hozircha alohida. Backend local SQLite yoki kelajakda PostgreSQL. MiniApp Supabase. Agar ikkisini birlashtirish kerak bo'lsa, Supabase'ni FastAPI uchun ham source qilish kerak.

## 6. API Endpointlar (Asosiy)

### 6.1. MiniApp Internal API Routes (`miniapp/app/api/`)
Barcha API endpointlar `app/api/.../route.ts` ko'rinishida Next.js Route Handler sifatida yozilgan.

|Mantiq|Route|Method|Notes|
|---|---|---|---|
|Lid yuborish|`/api/leads/route.ts`|POST||
|Chat|`/api/chat/...`|POST/GET||
|Mahsulotlar|`/api/products/...`|GET||
|Profile|`/api/profile/...`|GET/POST||
|Loyihalar|`/api/projects/...`|GET||
|Hisoblagich|`/api/calculator/...`|POST||
|Saqlangan loyihalar|`/api/saved-projects/...`|GET/POST/DELETE||
|Supabase webhook/aggr|`/api/supabase/...`|||
|Telegram auth|`/api/telegram/...`|||

### 6.2. Backend FastAPI Routes (`backend/app/routers/`)
Barcha endpointlar `main.py` da `/api/` prefix bilan ulangan.

|Router|Prefix|Methodlar|
|---|---|---|
|auth|`/api/auth`|register, login, me|
|quarries|`/api/quarries`|GET list, GET detail|
|products|`/api/products`|GET list, GET detail|
|investments|`/api/investments`|GET list, GET detail, calculate (POST)|
|chat|`/api/chat`|POST message|

**Response Format (ixtiyoriy convention):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

## 7. Tailwind Theme Tokens

### 7.1. Frontend (`frontend/tailwind.config.js`)
```js
colors: {
  primary: '#0B0F1A',
  secondary: '#111827',
  accent: '#F5C044',
  accentLight: '#FFE29A',
  dark: '#0B0F1A',
  card: 'rgba(255,255,255,0.03)',
  line: 'rgba(255,255,255,0.08)',
  copy: '#EAEAF0',
  muted: '#A0A4B8',
  marble: '#f5f0e8',
  granite: '#4a4a5a',
}
```

### 7.2. MiniApp (`miniapp/tailwind.config.js`)
```js
colors: {
  ink: '#0B0F1A',
  panel: '#101522',
  card: '#121826',
  gold: '#C9A84C',
  goldSoft: '#F1C94F',
  copy: '#FFFFFF',
  muted: '#A0AEC0',
  line: 'rgba(255,255,255,0.1)',
}
boxShadow: {
  premium: '0 24px 70px rgba(0,0,0,0.38)',
  gold: '0 14px 34px rgba(201,168,76,0.22)',
}
fontSize: {
  'title-lg': ['30px', { lineHeight: '1.35', fontWeight: '700' }],
  // ...
}
borderRadius: {
  'ios-lg': '16px',
  'ios-md': '14px',
  'ios-sm': '12px',
}
```

**Qoida:** Ilova ichida doim mavjud theme tokenlardan foydalaning (masalan, `bg-ink`, `text-gold`, `shadow-premium`). Inline ranglar (`#fff`) yoki yangi rang classlarini qo'shishdan oldin `tailwind.config.js` ga qo'shing.

## 8. Coding Conventions

### 8.1. TypeScript / React (General)
- **Strict mode:** `true` (tsconfig'da). `any` t ifodalashdan saqlaning.
- **Function components:** React functional components + hooks. Class component YOZMAYMAN.
- **Client components:** Faqat kerakli joyda `'use client';` ishlating. Layout, metadata, server data fetching Server Component bo'lishi kerak.
- **Path aliases:** `@/components/...`, `@/lib/...`, `@/hooks/...` dan foydalaning.
- **Type safety:** Interface va type'larni aniq yozing. `unknown` bo'lsa avval validate qiling.

### 8.2. Backend (Python)
- **Import tartibi:** stdlib -> third-party -> local (`app.models` etc.)
- **Type hints:** FastAPI dependency va function parametrlarida type hint ishlating.
- **Settings:** `app.config.settings` orqali `.env` qiymatlarini oling. HECH QACHON secret'larni koddan qattiq (hardcode) yozmang.
- **Database session:** Faqat `Depends(get_db)` orqali.

### 8.3. UI/Content Language
- **Barcha foydalanuvchi ko'radigan matnlar O'zbekcha bo'lishi kerak.**
- Inline comments va commit message'lar **Uzbek tilida** qabul qilingan. Ammo kod nomlari (variable, function, component) **inglizcha** bo'lishi kerak.

## 9. Xavfsizlik va Auth

### 9.1. MiniApp Auth
- Telegram `initData` ni backend (Next.js Route Handler) da validate qilish kerak (hali implement qilinmaganmi? Yo'q bo'lsa, yangisi qo'shilganda shuni inobatga oling).
- `SUPABASE_SERVICE_ROLE_KEY` faqat server-side Route Handler'larda ishlatiladi va HECH QACHON client'ga chiqmaydi.
- `NEXT_PUBLIC_` prefiksi faqat public (anon) kalitlar uchun.

### 9.2. Frontend Auth
- Next-Auth ishlatiladi. Provider sozlamalari `lib/auth.ts` da.
- Middleware (`middleware.ts`) orqali himoyalangan routelar (dashboard/admin) tekshiriladi.

## 10. Muhim Fayllar va Ularning Vazifasi

| Fayl | Vazifa |
|---|---|
| `miniapp/lib/telegram.ts` | Telegram WebApp SDK wrapping: user, viewport, haptic, init logic. |
| `miniapp/hooks/useTelegramWebApp.ts` | BackButton boshqaruvi, init chaqiruvi. |
| `miniapp/lib/supabase/types.ts` | Barcha Supabase jadvallarining TS types. Yangi table -> yangilash MAJBURIY. |
| `miniapp/lib/supabase/server.ts` | Server-only admin Supabase client. |
| `frontend/src/lib/data.ts` | Static content (hero stats, categories). CMS ishlaguncha. |
| `backend/app/config.py` | `.env` orqali sozlamalar (DB URL, secret, AI keys). |
| `backend/app/models.py` | SQLAlchemy ORM. |
| `backend/app/schemas.py` | Pydantic request/response modellar. |
| `docs/...` | Qo'shimcha hujjatlar (eskirgan bo'lishi mumkin, lekin referens sifatida). |

## 11. Agentlar Uchun Qo'shimcha Ko'rsatmalar (Rules)

1. **Yangi package qo'shishdan oldin** mavjud dependency bilan ishlab ko'ring. Agar mutlaqo zarur bo'lsa, faqat kerakli loyihaga (`frontend` yoki `miniapp` yoki `backend`) qo'shing.
2. **MiniApp'da** `window`/`document` ga to'g'ridan-to'g'ri ulanishdan oldin `typeof window !== 'undefined'` tekshiruvini qo'shing.
3. **Supabase schema o'zgartirish** (yangi table, column) bo'lsa:
   - `supabase/migrations/` ga yangi `.sql` fayl yozing.
   - `lib/supabase/types.ts` ni yangilang.
   - Agar backend FastAPI ham shu jadvaldan foydalansa, `models.py` va `schemas.py` ni yangilang.
4. **Route Handler** (`app/api/.../route.ts`) yozayotganda so'rov va javob turlarini aniq yozing. `NextRequest` va `NextResponse.json()` dan foydalaning.
5. **Backend endpoint** yozayotganda tag description va response model bering. FastAPI auto-docs (`/docs`) uchun.
6. **Uzbek tili:** UI'da barcha label, placeholder, error message, title'lar O'zbekcha (`Sarlavha`, `Hisoblash`, `Loyihalar`, `Tasdiqlash`).
7. **Git:** `git commit` faqat foydalanuvchi so'raganda. README/AGENTS.md o'zgarishlarini alohida commit qilmang, agar foydalanuvchi so'ramagan bo'lsa.
8. **`frontend/` va `miniapp/` alohida Next.js ilovalar.** Ularni bir-biriga import qilmang.

## 12. Kengaytirish Rejalari (Kelajakda Agentlar Uchun Context)

- **i18n:** `next-i18next` yoki Next.js i18n routing orqali Eng/Rus tillarini qo'shish.
- **AI Chat:** Hozirgi chat endpoint'ini OpenAI/Google Cloud API ga ulash.
- **Strapi CMS:** Hozirgi static data (`data.ts`) ni CMS'dan olish.
- **Advanced Auth:** Backend'da JWT login/register + Frontend/MiniApp'da integratsiya.
- **Real Map:** SVG o'rniga Leaflet yoki Google Maps integratsiyasi.

---

**Oxirgi yangilanish:** 2026-05-03  
**Maintainer:** AI Agent / Developer
