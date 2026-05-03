create table if not exists public.hero_images (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  image_url text not null,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table public.hero_images enable row level security;

create policy "Public can read hero images" on public.hero_images
  for select using (is_active = true);

grant select on public.hero_images to anon, authenticated;