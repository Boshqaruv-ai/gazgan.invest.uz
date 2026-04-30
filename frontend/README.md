# G'ozg'on Invest Portal MVP

Production MVP is the Next.js app in this folder. The Python backend is not required for production.

## Tech

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Local typed datasets for products, quarries, production, and investment scenarios
- Next.js API route for chat: `src/app/api/chat/route.ts` using Gemini Flash-Lite with fallback replies
- No database or auth in MVP

## Environment

Copy `.env.example` to `.env.local` for local development.

```bash
GEMINI_API_KEY=
```

`GEMINI_API_KEY` is optional. Without it, chat returns deterministic fallback answers.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run lint
npm run build
```

## Deploy

Deploy this `frontend/` directory to Vercel.

Vercel settings:

- Framework: Next.js
- Build command: `npm run build`
- Output directory: `.next`
- Optional environment variable: `GEMINI_API_KEY`

## MVP Boundaries

- Dashboard is demo-only.
- Investment calculator is local and indicative.
- Product/quarry data is static.
- Leads are captured through email/contact form.
- Do not add PostgreSQL, auth, CMS, or a separate backend until real persistence is needed.
