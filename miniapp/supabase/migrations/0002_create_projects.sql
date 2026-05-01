create table if not exists public.projects (
  id text primary key,
  title text not null,
  category text not null check (category in ('Marmar', 'Granit', 'Boshqa')),
  roi integer not null check (roi >= 0),
  payback integer not null check (payback > 0),
  amount numeric(14, 2) not null check (amount >= 0),
  image text not null,
  highlight boolean not null default false,
  description text not null,
  location text not null,
  risk_level text not null check (risk_level in ('Low', 'Medium', 'High')),
  timeline jsonb not null default '[]'::jsonb,
  roi_breakdown jsonb not null default '[]'::jsonb,
  sort_order integer not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_active_sort_idx on public.projects (is_active, sort_order, roi desc);

alter table public.projects enable row level security;

drop policy if exists "Deny anon projects table access" on public.projects;

create policy "Deny anon projects table access"
on public.projects
for all
to anon, authenticated
using (false)
with check (false);

insert into public.projects (
  id,
  title,
  category,
  roi,
  payback,
  amount,
  image,
  highlight,
  description,
  location,
  risk_level,
  timeline,
  roi_breakdown,
  sort_order,
  is_active
) values
(
  'quarry-development',
  'G''ozg''on kon rivojlantirish loyihasi',
  'Marmar',
  30,
  3,
  8000000,
  'https://images.unsplash.com/photo-1573156667488-5c0cec674762?auto=format&fit=crop&w=900&q=80',
  true,
  'Texnika, qazib olish va logistika infratuzilmasi bilan yuqori qaytimli kon yo''nalishi.',
  'Navoiy viloyati, G''ozg''on hududi',
  'Medium',
  '[
    {"quarter":"1-bosqich","title":"Geologiya va litsenziya","description":"Kon hujjatlari, zaxira bahosi va ishga tushirish rejasi yakunlanadi."},
    {"quarter":"2-bosqich","title":"Texnika xaridi","description":"Qazib olish texnikasi, kesish uskunalari va logistika liniyasi joylashtiriladi."},
    {"quarter":"3-bosqich","title":"Eksport oqimi","description":"Blok va slab yetkazib berish shartnomalari bozor bilan ulanadi."}
  ]'::jsonb,
  '[
    {"year":"1-yil","value":12},
    {"year":"2-yil","value":21},
    {"year":"3-yil","value":30},
    {"year":"4-yil","value":32}
  ]'::jsonb,
  10,
  true
),
(
  'granite-processing',
  'Granit qayta ishlash kompleksi',
  'Granit',
  25,
  4,
  5000000,
  'https://images.unsplash.com/photo-1584294273740-0ecc6df9f9f0?auto=format&fit=crop&w=900&q=80',
  true,
  'Eksportga tayyor plitka va blok formatlari uchun ishlab chiqarish liniyasi.',
  'G''ozg''on sanoat zonasi',
  'Low',
  '[
    {"quarter":"1-bosqich","title":"Uskuna tanlash","description":"Kesish, jilolash va qadoqlash liniyasi uchun yetkazib beruvchilar tanlanadi."},
    {"quarter":"2-bosqich","title":"Ishlab chiqarish","description":"Mahalliy xom ashyo asosida eksportga tayyor mahsulotlar chiqariladi."},
    {"quarter":"3-bosqich","title":"Savdo kanallari","description":"B2B xaridorlar, qurilish kompaniyalari va eksport hamkorlari bilan shartnomalar tuziladi."}
  ]'::jsonb,
  '[
    {"year":"1-yil","value":9},
    {"year":"2-yil","value":17},
    {"year":"3-yil","value":25},
    {"year":"4-yil","value":27}
  ]'::jsonb,
  20,
  true
),
(
  'marble-line',
  'Marmar slab va plitka liniyasi',
  'Marmar',
  22,
  5,
  4000000,
  'https://images.unsplash.com/photo-1749212387838-c4c4e6e58348?auto=format&fit=crop&w=900&q=80',
  false,
  'Premium interyer va fasad segmenti uchun marmar mahsulotlar ishlab chiqarish.',
  'Navoiy viloyati, G''ozg''on shahri',
  'Medium',
  '[
    {"quarter":"1-bosqich","title":"Dizayn va quvvat rejasi","description":"Slab, plitka va dekorativ formatlar uchun ishlab chiqarish quvvati rejalashtiriladi."},
    {"quarter":"2-bosqich","title":"Liniyani ishga tushirish","description":"Kesish, silliqlash va sifat nazorati jarayoni bir oqimga ulanadi."},
    {"quarter":"3-bosqich","title":"Premium segment","description":"Mehmonxona, lobby va fasad loyihalari uchun yetkazib berish boshlanadi."}
  ]'::jsonb,
  '[
    {"year":"1-yil","value":8},
    {"year":"2-yil","value":15},
    {"year":"3-yil","value":22},
    {"year":"4-yil","value":24}
  ]'::jsonb,
  30,
  true
)
on conflict (id) do update set
  title = excluded.title,
  category = excluded.category,
  roi = excluded.roi,
  payback = excluded.payback,
  amount = excluded.amount,
  image = excluded.image,
  highlight = excluded.highlight,
  description = excluded.description,
  location = excluded.location,
  risk_level = excluded.risk_level,
  timeline = excluded.timeline,
  roi_breakdown = excluded.roi_breakdown,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();
