alter table public.users
  add column if not exists investor_level text not null default 'standard'
    check (investor_level in ('standard', 'gold', 'platinum')),
  add column if not exists member_since date not null default current_date;

alter table public.projects
  add column if not exists project_type text not null default 'other'
    check (project_type in ('construction', 'processing', 'other')),
  add column if not exists status text not null default 'ACTIVE'
    check (status in ('HOT', 'NEW', 'ACTIVE', 'FUNDED')),
  add column if not exists investment_required numeric(14, 2),
  add column if not exists investment_raised numeric(14, 2) not null default 0,
  add column if not exists spots_left integer check (spots_left is null or spots_left >= 0),
  add column if not exists investors_count integer not null default 0 check (investors_count >= 0),
  add column if not exists payback_years numeric(4, 1),
  add column if not exists expected_return integer,
  add column if not exists images text[] not null default '{}'::text[],
  add column if not exists gallery_images text[] not null default '{}'::text[],
  add column if not exists trust_level text not null default 'pending_verification'
    check (trust_level in ('verified_government', 'verified_private', 'pending_verification', 'unverified'));

update public.projects
set
  investment_required = coalesce(investment_required, amount),
  payback_years = coalesce(payback_years, payback::numeric),
  expected_return = coalesce(expected_return, roi),
  images = case when cardinality(images) = 0 then array[image] else images end,
  gallery_images = case when cardinality(gallery_images) = 0 then array[image] else gallery_images end;

alter table public.projects
  alter column investment_required set not null,
  alter column payback_years set not null,
  alter column expected_return set not null,
  add constraint projects_investment_required_nonnegative check (investment_required >= 0),
  add constraint projects_investment_raised_nonnegative check (investment_raised >= 0),
  add constraint projects_payback_years_positive check (payback_years > 0),
  add constraint projects_expected_return_nonnegative check (expected_return >= 0);

alter table public.projects
  add column if not exists funding_percentage integer generated always as (
    case
      when investment_required > 0
        then least(100, greatest(0, round((investment_raised / investment_required) * 100)::integer))
      else 0
    end
  ) stored;

update public.projects
set
  title = 'Marmar qayta ishlash zavodi',
  category = 'Marmar',
  roi = 26,
  payback = 4,
  amount = 2500000,
  investment_required = 2500000,
  investment_raised = 1750000,
  project_type = 'processing',
  status = 'HOT',
  spots_left = 3,
  investors_count = 150,
  payback_years = 4.2,
  expected_return = 26,
  location = 'G''ozg''on, Buxoro viloyati',
  description = 'Zamonaviy uskunalar bilan jihozlangan marmar qayta ishlash zavodi. Mahalliy va eksport bozorlariga yuqori sifatli mahsulot yetkazib berish maqsadida tashkil etiladi.',
  trust_level = 'pending_verification',
  timeline = '[
    {"quarter":"Yillik quvvat","title":"120,000 m²","description":"Slab va plitka ishlab chiqarish quvvati."},
    {"quarter":"Ish o''rinlari","title":"150+","description":"Ishga tushgandan keyingi doimiy ish o''rinlari."},
    {"quarter":"Boshlanish sanasi","title":"2024 Q2","description":"Qurilish va uskunalarni joylashtirish bosqichi."},
    {"quarter":"Tugash sanasi","title":"2026 Q1","description":"Ishlab chiqarishni to''liq ishga tushirish rejasi."}
  ]'::jsonb,
  roi_breakdown = '[
    {"year":"Optimistik","value":32},
    {"year":"O''rtacha","value":28},
    {"year":"Pessimistik","value":22}
  ]'::jsonb
where id = 'granite-processing';

update public.projects
set
  title = 'Marmar koni (oq marmar)',
  category = 'Marmar',
  roi = 24,
  payback = 4,
  amount = 1800000,
  investment_required = 1800000,
  investment_raised = 810000,
  project_type = 'construction',
  status = 'NEW',
  spots_left = 5,
  investors_count = 86,
  payback_years = 3.8,
  expected_return = 24,
  location = 'G''ozg''on, Buxoro viloyati',
  description = 'Oq marmar qazib olish, saralash va logistika infratuzilmasini kengaytirish loyihasi.',
  trust_level = 'pending_verification',
  roi_breakdown = '[
    {"year":"Optimistik","value":29},
    {"year":"O''rtacha","value":24},
    {"year":"Pessimistik","value":18}
  ]'::jsonb
where id = 'quarry-development';

update public.projects
set
  project_type = 'processing',
  status = 'ACTIVE',
  investment_required = amount,
  investment_raised = round(amount * 0.38),
  spots_left = null,
  investors_count = 64,
  payback_years = payback::numeric,
  expected_return = roi,
  trust_level = 'pending_verification'
where id = 'marble-line';

create table if not exists public.project_documents (
  id uuid primary key default gen_random_uuid(),
  project_id text not null references public.projects(id) on update cascade on delete cascade,
  title text not null,
  file_url text not null,
  document_type text not null check (document_type in ('pdf', 'certificate', 'legal', 'financial', 'other')),
  issuer text,
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_projects (
  telegram_id text not null references public.users(telegram_id) on update cascade on delete cascade,
  project_id text not null references public.projects(id) on update cascade on delete cascade,
  created_at timestamptz not null default now(),
  primary key (telegram_id, project_id)
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  telegram_id text not null references public.users(telegram_id) on update cascade on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  message text not null,
  project_id text references public.projects(id) on update cascade on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  telegram_id text not null references public.users(telegram_id) on update cascade on delete cascade,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.document_downloads (
  id uuid primary key default gen_random_uuid(),
  telegram_id text not null references public.users(telegram_id) on update cascade on delete cascade,
  document_id uuid not null references public.project_documents(id) on update cascade on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists project_documents_project_id_idx on public.project_documents (project_id);
create index if not exists saved_projects_telegram_id_idx on public.saved_projects (telegram_id);
create index if not exists chat_messages_telegram_id_created_at_idx on public.chat_messages (telegram_id, created_at desc);
create index if not exists notifications_telegram_id_created_at_idx on public.notifications (telegram_id, created_at desc);
create index if not exists document_downloads_telegram_id_idx on public.document_downloads (telegram_id);

alter table public.project_documents enable row level security;
alter table public.saved_projects enable row level security;
alter table public.chat_messages enable row level security;
alter table public.notifications enable row level security;
alter table public.document_downloads enable row level security;

revoke all on table public.project_documents from anon, authenticated;
revoke all on table public.saved_projects from anon, authenticated;
revoke all on table public.chat_messages from anon, authenticated;
revoke all on table public.notifications from anon, authenticated;
revoke all on table public.document_downloads from anon, authenticated;

drop policy if exists "Deny anon project documents table access" on public.project_documents;
drop policy if exists "Deny anon saved projects table access" on public.saved_projects;
drop policy if exists "Deny anon chat messages table access" on public.chat_messages;
drop policy if exists "Deny anon notifications table access" on public.notifications;
drop policy if exists "Deny anon document downloads table access" on public.document_downloads;

create policy "Deny anon project documents table access"
on public.project_documents
for all
to anon, authenticated
using (false)
with check (false);

create policy "Deny anon saved projects table access"
on public.saved_projects
for all
to anon, authenticated
using (false)
with check (false);

create policy "Deny anon chat messages table access"
on public.chat_messages
for all
to anon, authenticated
using (false)
with check (false);

create policy "Deny anon notifications table access"
on public.notifications
for all
to anon, authenticated
using (false)
with check (false);

create policy "Deny anon document downloads table access"
on public.document_downloads
for all
to anon, authenticated
using (false)
with check (false);
