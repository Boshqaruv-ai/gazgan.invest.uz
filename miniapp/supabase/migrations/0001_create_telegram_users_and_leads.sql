create extension if not exists pgcrypto;

create table if not exists public.users (
  telegram_id text primary key,
  first_name text,
  last_name text,
  username text,
  language_code text,
  photo_url text,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  telegram_id text not null references public.users(telegram_id) on update cascade on delete restrict,
  project_id text not null,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists leads_telegram_id_idx on public.leads (telegram_id);
create index if not exists leads_project_id_idx on public.leads (project_id);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.users enable row level security;
alter table public.leads enable row level security;

drop policy if exists "Deny anon users table access" on public.users;
drop policy if exists "Deny anon leads table access" on public.leads;

create policy "Deny anon users table access"
on public.users
for all
to anon, authenticated
using (false)
with check (false);

create policy "Deny anon leads table access"
on public.leads
for all
to anon, authenticated
using (false)
with check (false);
