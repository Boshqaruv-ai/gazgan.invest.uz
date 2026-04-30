# Gozgon Invest Platform Docs

This project is organized around a low-cost production frontend deployment.

## Current Production Architecture

- Production app: `frontend/`
- Framework: Next.js 16 App Router
- Runtime server logic: Next.js API routes only
- Chat endpoint: `frontend/src/app/api/chat/route.ts`
- Lead endpoint: `frontend/src/app/api/lead/route.ts`
- Data source: typed local files in `frontend/src/lib/`
- Database: none
- Python backend: experimental, not deployed

## Run Locally

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
cd frontend
npm run lint
npm run build
```

## Deploy

Deploy only the `frontend/` directory to Vercel.

Optional environment variable:

```bash
GEMINI_API_KEY=
```

If the key is not set, chat uses deterministic fallback replies.

## Production Scope

- Public pages: home, products, quarries, production, investment, about/contact, chat
- Investment calculator is local and indicative
- Contact requests are sent through `/api/lead`
- Dashboard is demo-only

## Do Not Build Yet

- Full Python backend
- PostgreSQL or migrations
- Auth/JWT
- Admin CMS
- Telegram Mini App
- Advanced maps or 360 tours
- AWS EC2/RDS deployment

Older files in this docs folder may contain pre-production backend plans. Treat this README and `frontend/README.md` as the current source of truth.
