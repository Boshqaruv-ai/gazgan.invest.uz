create table if not exists public.featured_products (
  id text primary key,
  title text not null,
  category text not null check (category in ('marble_slabs', 'granite_slabs', 'souvenirs', 'tiles', 'other')),
  price numeric(12, 2) not null check (price >= 0),
  currency text not null default 'USD',
  unit text not null,
  image text not null,
  description text,
  is_featured boolean not null default true,
  is_active boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists featured_products_active_sort_idx
on public.featured_products (is_active, is_featured, sort_order);

alter table public.featured_products enable row level security;

revoke all on table public.featured_products from anon, authenticated;

drop policy if exists "Deny anon featured products table access" on public.featured_products;

create policy "Deny anon featured products table access"
on public.featured_products
for all
to anon, authenticated
using (false)
with check (false);

insert into public.featured_products (
  id,
  title,
  category,
  price,
  currency,
  unit,
  image,
  description,
  sort_order
) values
(
  'white-marble-slab',
  'Oq marmar plita',
  'marble_slabs',
  85,
  'USD',
  'm²',
  'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80',
  'Premium interyer va fasad ishlari uchun sayqallangan marmar slab.',
  10
),
(
  'granite-counter-slab',
  'Granit stoleshnitsa slab',
  'granite_slabs',
  72,
  'USD',
  'm²',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=700&q=80',
  'Oshxona, lobby va tijorat obyektlari uchun mustahkam granit slab.',
  20
),
(
  'marble-tile-polished',
  'Sayqallangan marmar kafel',
  'tiles',
  48,
  'USD',
  'm²',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80',
  'Mehmonxona, ofis va xususiy interyerlar uchun marmar plitka.',
  30
),
(
  'stone-souvenir-set',
  'Marmar suvenir buyumlar',
  'souvenirs',
  35,
  'USD',
  'dona',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
  'Brend sovgalari va dekor uchun tabiiy toshdan ishlangan buyumlar.',
  40
)
on conflict (id) do update set
  title = excluded.title,
  category = excluded.category,
  price = excluded.price,
  currency = excluded.currency,
  unit = excluded.unit,
  image = excluded.image,
  description = excluded.description,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
