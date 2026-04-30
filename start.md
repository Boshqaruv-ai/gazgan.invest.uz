# Start Here

The production app is the Next.js frontend in `frontend/`.

## Local Run

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

Deploy `frontend/` to Vercel.

Optional environment variable:

```bash
GEMINI_API_KEY=
```

Without `GEMINI_API_KEY`, `/api/chat` uses built-in fallback answers.

## Backend

`backend/` is experimental and is not required for production deployment.
