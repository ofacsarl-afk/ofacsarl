import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function count(table: string, filter?: (q: any) => any) {
  const sb = await getServerSupabase();
  if (!sb) return 0;
  let q = sb.from(table).select("*", { count: "exact", head: true });
  if (filter) q = filter(q);
  const { count } = await q;
  return count || 0;
}

export default async function AdminHome() {
  const [unread, totalMsg, posts, gallery, partners] = await Promise.all([
    count("messages", (q) => q.eq("is_read", false).eq("is_archived", false)),
    count("messages"),
    count("posts"),
    count("gallery_items"),
    count("partners"),
  ]);

  const cards = [
    { label: "Messages non lus", value: unread, href: "/admin/messages", accent: "bg-red-50 text-red-700 border-red-200" },
    { label: "Total messages", value: totalMsg, href: "/admin/messages", accent: "bg-zinc-50 text-zinc-700 border-zinc-200" },
    { label: "Actualités", value: posts, href: "/admin/posts", accent: "bg-zinc-50 text-zinc-700 border-zinc-200" },
    { label: "Photos galerie", value: gallery, href: "/admin/gallery", accent: "bg-zinc-50 text-zinc-700 border-zinc-200" },
    { label: "Partenaires", value: partners, href: "/admin/partners", accent: "bg-zinc-50 text-zinc-700 border-zinc-200" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">Tableau de bord</h1>
      <p className="text-zinc-500 mb-6">Bienvenue dans l&apos;espace d&apos;administration OFAC.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className={`rounded-2xl border p-5 hover:shadow-sm transition ${c.accent}`}>
            <div className="text-3xl font-bold">{c.value}</div>
            <div className="text-sm mt-1">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Link href="/admin/posts" className="rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-sm transition">
          <div className="font-semibold text-zinc-900">📰 Publier une actualité</div>
          <p className="text-sm text-zinc-500 mt-1">Ajoutez un article ou une nouvelle avec photo, visible sur le site.</p>
        </Link>
        <Link href="/admin/gallery" className="rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-sm transition">
          <div className="font-semibold text-zinc-900">🖼️ Ajouter des photos</div>
          <p className="text-sm text-zinc-500 mt-1">Enrichissez la galerie « Terrain & Projets » sans code.</p>
        </Link>
      </div>
    </div>
  );
}
