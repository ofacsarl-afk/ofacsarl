"use server";

import { revalidatePath } from "next/cache";
import { getServerSupabase } from "@/lib/supabase/server";
import type { ImpactStat, Recognition, SectionImages } from "@/lib/types";

async function db() {
  const sb = await getServerSupabase();
  if (!sb) throw new Error("Supabase non configuré");
  const { data } = await sb.auth.getUser();
  if (!data?.user) throw new Error("Non authentifié");
  return sb;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // supprime les accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

/* ------------------------- MESSAGES ------------------------- */
export async function setMessageRead(id: string, is_read: boolean) {
  const sb = await db();
  await sb.from("messages").update({ is_read }).eq("id", id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function setMessageArchived(id: string, is_archived: boolean) {
  const sb = await db();
  await sb.from("messages").update({ is_archived }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const sb = await db();
  await sb.from("messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

/* ------------------------- POSTS ------------------------- */
export async function savePost(input: {
  id?: string;
  title_fr: string;
  title_en?: string;
  excerpt_fr?: string;
  excerpt_en?: string;
  body_fr?: string;
  body_en?: string;
  cover_url?: string;
  published: boolean;
}) {
  const sb = await db();
  const slug = slugify(input.title_fr || "article") + "-" + Math.random().toString(36).slice(2, 6);
  const payload = {
    title_fr: input.title_fr,
    title_en: input.title_en || null,
    excerpt_fr: input.excerpt_fr || null,
    excerpt_en: input.excerpt_en || null,
    body_fr: input.body_fr || null,
    body_en: input.body_en || null,
    cover_url: input.cover_url || null,
    published: input.published,
    published_at: input.published ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  if (input.id) {
    await sb.from("posts").update(payload).eq("id", input.id);
  } else {
    await sb.from("posts").insert({ ...payload, slug });
  }
  revalidatePath("/");
  revalidatePath("/admin/posts");
}

export async function deletePost(id: string) {
  const sb = await db();
  await sb.from("posts").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/posts");
}

/* ------------------------- GALLERY ------------------------- */
export async function addGalleryItem(input: { image_url: string; caption_fr?: string; caption_en?: string }) {
  const sb = await db();
  await sb.from("gallery_items").insert({
    image_url: input.image_url,
    caption_fr: input.caption_fr || null,
    caption_en: input.caption_en || null,
    sort_order: Date.now() % 100000,
  });
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryItem(id: string) {
  const sb = await db();
  await sb.from("gallery_items").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

/* ------------------------- PARTNERS ------------------------- */
export async function savePartner(input: { id?: string; name: string; logo_url?: string; url?: string }) {
  const sb = await db();
  const payload = { name: input.name, logo_url: input.logo_url || null, url: input.url || null };
  if (input.id) await sb.from("partners").update(payload).eq("id", input.id);
  else await sb.from("partners").insert({ ...payload, sort_order: Date.now() % 100000 });
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

export async function deletePartner(id: string) {
  const sb = await db();
  await sb.from("partners").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

/* ------------------------- SETTINGS ------------------------- */
export async function saveImpactStats(stats: ImpactStat[]) {
  const sb = await db();
  await sb.from("site_settings").upsert({ key: "impact_stats", value: stats, updated_at: new Date().toISOString() });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function saveSectionImages(images: SectionImages) {
  const sb = await db();
  await sb.from("site_settings").upsert({ key: "section_images", value: images, updated_at: new Date().toISOString() });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function saveRecognitions(items: Recognition[]) {
  const sb = await db();
  await sb.from("site_settings").upsert({ key: "recognitions", value: items, updated_at: new Date().toISOString() });
  revalidatePath("/");
  revalidatePath("/admin/recognitions");
}
