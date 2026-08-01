import { getServerSupabase } from "@/lib/supabase/server";
import type { GalleryItem } from "@/lib/types";
import GalleryManager from "./GalleryManager";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const sb = await getServerSupabase();
  let items: GalleryItem[] = [];
  if (sb) {
    const { data } = await sb.from("gallery_items").select("*").order("sort_order", { ascending: true });
    items = (data as GalleryItem[]) || [];
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">Galerie photos</h1>
      <p className="text-zinc-500 mb-6">Ajoutez ou supprimez les photos affichées dans la section « Terrain &amp; Projets ».</p>
      <GalleryManager items={items} />
    </div>
  );
}
