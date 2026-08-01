-- ============================================================
-- OFAC — Schéma Supabase (Phase B)
-- À exécuter dans : Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ---------- 1. MESSAGES (formulaire de contact) ----------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  type        text,                       -- partenariat / investissement / achat / info
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

-- ---------- 5. SITE_SETTINGS (images de section + chiffres + textes éditables) ----------
-- Modèle clé/valeur JSON : ex. key='impact_stats', key='hero_image', key='logo'...
create table if not exists public.site_settings (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

-- Valeurs de départ (chiffres d'impact + slots d'images)
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
-- Lecture publique du contenu publié ; écriture réservée aux
-- utilisateurs authentifiés (l'équipe admin).
-- ============================================================
alter table public.messages       enable row level security;
alter table public.posts          enable row level security;
alter table public.gallery_items  enable row level security;
alter table public.partners       enable row level security;
alter table public.site_settings  enable row level security;

-- MESSAGES : le public peut ENVOYER (insert) ; seul l'admin peut lire/gérer.
create policy "messages_insert_public"  on public.messages for insert to anon, authenticated with check (true);
create policy "messages_select_admin"   on public.messages for select to authenticated using (true);
create policy "messages_update_admin"   on public.messages for update to authenticated using (true) with check (true);
create policy "messages_delete_admin"   on public.messages for delete to authenticated using (true);

-- POSTS : public voit les publiés ; admin voit/gère tout.
create policy "posts_select_public"     on public.posts for select to anon using (published = true);
create policy "posts_all_admin"         on public.posts for all to authenticated using (true) with check (true);

-- GALLERY : lecture publique, gestion admin.
create policy "gallery_select_public"   on public.gallery_items for select to anon, authenticated using (true);
create policy "gallery_all_admin"       on public.gallery_items for all to authenticated using (true) with check (true);

-- PARTNERS : lecture publique, gestion admin.
create policy "partners_select_public"  on public.partners for select to anon, authenticated using (true);
create policy "partners_all_admin"      on public.partners for all to authenticated using (true) with check (true);

-- SITE_SETTINGS : lecture publique, gestion admin.
create policy "settings_select_public"  on public.site_settings for select to anon, authenticated using (true);
create policy "settings_all_admin"      on public.site_settings for all to authenticated using (true) with check (true);

-- ============================================================
-- STORAGE : bucket public pour les images gérées depuis l'admin
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Lecture publique des fichiers ; upload/suppression réservés à l'admin.
create policy "media_read_public"   on storage.objects for select to anon, authenticated using (bucket_id = 'media');
create policy "media_insert_admin"  on storage.objects for insert to authenticated with check (bucket_id = 'media');
create policy "media_update_admin"  on storage.objects for update to authenticated using (bucket_id = 'media');
create policy "media_delete_admin"  on storage.objects for delete to authenticated using (bucket_id = 'media');
