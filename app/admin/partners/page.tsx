import { getServerSupabase } from "@/lib/supabase/server";
import type { Partner } from "@/lib/types";
import PartnersManager from "./PartnersManager";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const sb = await getServerSupabase();
  let partners: Partner[] = [];
  if (sb) {
    const { data } = await sb.from("partners").select("*").order("sort_order", { ascending: true });
    partners = (data as Partner[]) || [];
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">Partenaires</h1>
      <p className="text-zinc-500 mb-6">Gérez les logos et noms des partenaires affichés sur le site.</p>
      <PartnersManager partners={partners} />
    </div>
  );
}
