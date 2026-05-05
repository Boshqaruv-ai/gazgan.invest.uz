---
name: gazgan-portal
description: Work on the Gazgan Invest portal monorepo. Use when changing, reviewing, or debugging anything in frontend/, admin/, miniapp/, Supabase schema, Uzbek UI, or Vercel deploys. Also use for AI chat API changes, admin panel fixes, or database migrations.
allowed-tools: Bash(git *) Bash(npm *) Bash(npx *) Bash(cd *) Bash(mkdir *) Bash(python *) Read Edit Glob Grep
---

# Gazgan Invest Portal

Monorepo with 5 platforms sharing one Supabase database.

## Platform Map

| Platform | Directory | Deploy | Key Env Vars |
|---|---|---|---|
| Frontend | frontend/ | gazgan-invest.vercel.app | GROQ_API_KEY, NEXT_PUBLIC_SUPABASE_* |
| Admin | admin/ | gazgan-invest-admin.vercel.app | SUPABASE_SERVICE_ROLE_KEY, NEXTAUTH_SECRET |
| MiniApp | miniapp/ | gazgan-invest-miniapp-*.vercel.app | SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_* |
| Mobile | mobil/ | APK file | SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY |
| Backend | backend/ | Not deployed | Python FastAPI |

## Do Not Share Code Between Platforms

frontend/, miniapp/, and admin/ are independent Next.js apps. Each has its own node_modules and tsconfig paths.

## AI Chat (Groq)

- Endpoint: frontend/src/app/api/chat/route.ts
- Provider: Groq, model: llama-3.3-70b-versatile
- Returns: { response: string, source: 'groq' | 'fallback' }
- Mobile connects to: https://gazgan-invest.vercel.app/api/chat
- Fallback: keyword-matching if GROQ_API_KEY is unset or API fails

## Database (Supabase)

- users: PK=telegram_id (text), NOT id
- projects: PK=id (uuid), status: HOT|NEW|ACTIVE|FUNDED
- featured_products: PK=id (uuid), category: marble_slabs|granite_slabs|souvenirs|tiles|other
- leads: telegram_id and project_id are nullable (migration 20260505)

## Admin Panel

- /api/admin/stats: queries users(telegram_id), projects(status,investment_raised), featured_products(is_active)
- /api/admin/products: CRUD on featured_products
- /api/admin/projects: CRUD on projects with image upload
- /api/admin/upload: File upload to Supabase products bucket

## Verification

    cd admin && npm run build
    cd frontend && npm run build
    cd miniapp && npm run build
