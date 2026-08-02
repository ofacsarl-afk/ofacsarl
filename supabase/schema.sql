-- ============================================================
-- OFAC — Schéma Supabase (tables + sécurité)
-- À exécuter dans : Supabase Dashboard → SQL Editor → New query → Run
-- (Version sans la section Storage : le bucket "media" est déjà créé
--  et les uploads passent par une route serveur — aucune policy Storage requise.)
-- ============================================================

-- ---------- 1. MESSAGES (formulaire de contact) ----------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  type        text,
  message     text not null,
  is_read     boolean not null default false,
  is_archived boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ---------- 2. POSTS (actualités / blog) ----------
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title_fr     text not null,
  title_en     text,
  excerpt_fr   text,
  excerpt_en   text,
  body_fr      text,
  body_en      text,
  cover_url    text,
  published    boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------- 3. GALLERY (galerie photos) ----------
create table if not exists public.gallery_items (
  id          uuid primary key default gen_random_uuid(),
  image_url   text not null,
  caption_fr  text,
  caption_en  text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ---------- 4. PARTNERS (partenaires) ----------
create table if not exists public.partners (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  logo_url    text,
  url         text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ---------- 5. SITE_SETTINGS (chiffres + images + reconnaissances) ----------
create table if not exists public.site_settings (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

insert into public.site_settings (key, value) values
  ('impact_stats', '[
    {"key":"plastic","value":10,"unit":"T+","label_fr":"Plastique recyclé","label_en":"Plastic recycled"},
    {"key":"jobs","value":26,"unit":"","label_fr":"Emplois créés","label_en":"Jobs created"},
    {"key":"pavers","value":10700,"unit":"","label_fr":"Pavés produits","label_en":"Paving stones produced"},
    {"key":"revenue","value":9000,"unit":"$","label_fr":"USD générés","label_en":"USD generated"}
  ]'::jsonb),
  ('section_images', '{
    "logo":"/images/logo_ofac.jpg",
    "hero":"/images/about_main.jpg",
    "about_main":"/images/about_main.jpg",
    "about_overlay":"/images/about_overlay.jpg",
    "founder":"/images/Founder.jpg"
  }'::jsonb)
on conflict (key) do nothing;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.messages       enable row level security;
alter table public.posts          enable row level security;
alter table public.gallery_items  enable row level security;
alter table public.partners       enable row level security;
alter table public.site_settings  enable row level security;

-- MESSAGES : le public peut ENVOYER ; seul l'admin lit/gère.
drop policy if exists "messages_insert_public" on public.messages;
drop policy if exists "messages_select_admin"  on public.messages;
drop policy if exists "messages_update_admin"  on public.messages;
drop policy if exists "messages_delete_admin"  on public.messages;
create policy "messages_insert_public" on public.messages for insert to anon, authenticated with check (true);
create policy "messages_select_admin"  on public.messages for select to authenticated using (true);
create policy "messages_update_admin"  on public.messages for update to authenticated using (true) with check (true);
create policy "messages_delete_admin"  on public.messages for delete to authenticated using (true);

-- POSTS : public voit les publiés ; admin gère tout.
drop policy if exists "posts_select_public" on public.posts;
drop policy if exists "posts_all_admin"     on public.posts;
create policy "posts_select_public" on public.posts for select to anon using (published = true);
create policy "posts_all_admin"     on public.posts for all to authenticated using (true) with check (true);

-- GALLERY : lecture publique, gestion admin.
drop policy if exists "gallery_select_public" on public.gallery_items;
drop policy if exists "gallery_all_admin"     on public.gallery_items;
create policy "gallery_select_public" on public.gallery_items for select to anon, authenticated using (true);
create policy "gallery_all_admin"     on public.gallery_items for all to authenticated using (true) with check (true);

-- PARTNERS : lecture publique, gestion admin.
drop policy if exists "partners_select_public" on public.partners;
drop policy if exists "partners_all_admin"     on public.partners;
create policy "partners_select_public" on public.partners for select to anon, authenticated using (true);
create policy "partners_all_admin"     on public.partners for all to authenticated using (true) with check (true);

-- SITE_SETTINGS : lecture publique, gestion admin.
drop policy if exists "settings_select_public" on public.site_settings;
drop policy if exists "settings_all_admin"     on public.site_settings;
create policy "settings_select_public" on public.site_settings for select to anon, authenticated using (true);
create policy "settings_all_admin"     on public.site_settings for all to authenticated using (true) with check (true);

-- Recharge le cache de l'API pour que les tables soient visibles immédiatement
notify pgrst, 'reload schema';
