# Gozgon Invest Platform

Production frontend for the Gozgon marble and granite investment platform. The Python backend is not required for deployment.

## Tech

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Local typed datasets for products, quarries, production, and investment scenarios
- Next.js API routes for chat and lead capture
- No database or auth

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
