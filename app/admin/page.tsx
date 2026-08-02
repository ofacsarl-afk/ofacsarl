import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import Icon, { type IconName } from "./Icons";

export const dynamic = "force-dynamic";

async function count(table: string, filter?: (q: any) => any) {
  const sb = await getServerSupabase();
  if (!sb) return 0;
  try {
    let q = sb.from(table).select("*", { count: "exact", head: true });
    if (filter) q = filter(q);
    const { count } = await q;
    return count || 0;
  } catch {
    return 0;
  }
}

async function recentMessages() {
  const sb = await getServerSupabase();
  if (!sb) return [] as { id: string; name: string; type: string | null; created_at: string }[];
  try {
    const { data } = await sb
      .from("messages")
      .select("id,name,type,created_at")
      .eq("is_archived", false)
      .order("created_at", { ascending: false })
      .limit(6);
    return data || [];
  } catch {
    return [];
  }
}

const INDICATORS = [
  { label: "Collecte plastique", value: 87 },
  { label: "Production de pavés", value: 74 },
  { label: "Zones sensibilisées", value: 91 },
  { label: "Création d'emplois", value: 62 },
];

export default async function AdminHome() {
  const [unread, totalMsg, posts, gallery, partners, recents] = await Promise.all([
    count("messages", (q) => q.eq("is_read", false).eq("is_archived", false)),
    count("messages"),
    count("posts"),
    count("gallery_items"),
    count("partners"),
    recentMessages(),
  ]);

  const cards: { label: string; value: number; sub: string; icon: IconName; href: string }[] = [
    { label: "Messages", value: totalMsg, sub: unread > 0 ? `${unread} non lu(s)` : "à jour", icon: "inbox", href: "/admin/messages" },
    { label: "Actualités", value: posts, sub: "articles publiés", icon: "news", href: "/admin/posts" },
    { label: "Photos galerie", value: gallery, sub: "images en ligne", icon: "image", href: "/admin/gallery" },
    { label: "Partenaires", value: partners, sub: "organisations", icon: "users", href: "/admin/partners" },
  ];

  return (
    <div>
      {/* Fil d'Ariane */}
      <nav className="text-sm text-zinc-500 mb-5">
        <span>Accueil</span> <span className="mx-1.5 text-zinc-300">/</span>{" "}
        <span className="text-zinc-700 font-medium">Tableau de bord</span>
      </nav>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5 flex items-center justify-between gap-3 hover:shadow-md transition">
            <div className="min-w-0">
              <div className="text-sm text-zinc-500">{c.label}</div>
              <div className="text-3xl font-extrabold text-zinc-900 mt-1 leading-none">{c.value}</div>
              <div className="text-xs text-zinc-400 mt-1.5 truncate">{c.sub}</div>
            </div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full shrink-0" style={{ background: "#fdecef", color: "#c1121f" }}>
              <Icon name={c.icon} size={24} />
            </span>
          </Link>
        ))}
      </div>

      {/* Panneaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 mt-5">
        {/* Activité récente */}
        <section className="bg-white rounded-xl shadow-sm border border-zinc-100">
          <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="font-bold text-zinc-900">Messages récents</h2>
            <Link href="/admin/messages" className="text-sm font-medium hover:underline" style={{ color: "#c1121f" }}>Tout voir</Link>
          </div>
          <div className="p-2">
            {recents.length === 0 ? (
              <p className="text-sm text-zinc-500 p-4">Aucun message pour le moment.</p>
            ) : (
              <ul>
                {recents.map((m) => (
                  <li key={m.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-50">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white text-xs font-bold shrink-0" style={{ background: "#0e1a33" }}>
                      {m.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-zinc-800 truncate">{m.name}</div>
                      {m.type && <div className="text-xs text-zinc-400">{m.type}</div>}
                    </div>
                    <span className="text-xs text-zinc-400 whitespace-nowrap">
                      {new Date(m.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Indicateurs d'impact */}
        <section className="bg-white rounded-xl shadow-sm border border-zinc-100">
          <div className="px-5 py-4 border-b border-zinc-100">
            <h2 className="font-bold text-zinc-900">Indicateurs d&apos;impact</h2>
          </div>
          <div className="p-5 space-y-4">
            {INDICATORS.map((ind) => (
              <div key={ind.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-zinc-600">{ind.label}</span>
                  <span className="font-semibold text-zinc-800">{ind.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-zinc-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${ind.value}%`, background: "#c1121f" }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mt-5">
        {[
          { label: "Publier une actualité", href: "/admin/posts", icon: "news" as IconName },
          { label: "Ajouter des photos", href: "/admin/gallery", icon: "image" as IconName },
          { label: "Images & chiffres", href: "/admin/settings", icon: "settings" as IconName },
        ].map((a) => (
          <Link key={a.href} href={a.href} className="bg-white rounded-xl shadow-sm border border-zinc-100 p-4 flex items-center gap-3 hover:shadow-md transition">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white shrink-0" style={{ background: "#c1121f" }}>
              <Icon name={a.icon} size={18} />
            </span>
            <span className="font-medium text-zinc-800">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
