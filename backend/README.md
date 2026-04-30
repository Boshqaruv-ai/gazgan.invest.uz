# Backend Status

This folder is experimental and is not part of the production MVP.

The production MVP runs from `frontend/` only:

- static typed data in the Next.js app
- `/api/chat` as a Next.js API route
- no database
- no Python service
- no auth

Keep this backend out of deployment until the product needs real persistence, admin content editing, user accounts, or server-side integrations that cannot live in Next.js API routes.

If a backend becomes necessary later, prefer a small FastAPI service with Supabase Postgres over self-managed EC2/RDS.
