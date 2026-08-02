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
  if (!sb) return [] as { id: string; name: string; created_at: string }[];
  try {
    const { data } = await sb
      .from("messages")
      .select("id,name,created_at")
      .eq("is_archived", false)
      .order("created_at", { ascending: false })
      .limit(5);
    return data || [];
  } catch {
    return [];
  }
}

function Metabox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-[#c3c4c7] rounded-[3px]">
      <div className="px-3 py-2.5 border-b border-[#c3c4c7]">
        <h2 className="text-[14px] font-semibold text-[#1d2327]">{title}</h2>
      </div>
      <div className="p-3">{children}</div>
    </section>
  );
}

export default async function AdminHome() {
  const [unread, totalMsg, posts, gallery, partners, recents] = await Promise.all([
    count("messages", (q) => q.eq("is_read", false).eq("is_archived", false)),
    count("messages"),
    count("posts"),
    count("gallery_items"),
    count("partners"),
    recentMessages(),
  ]);

  const glance: { icon: IconName; label: string; value: number; href: string }[] = [
    { icon: "inbox", label: "Messages", value: totalMsg, href: "/admin/messages" },
    { icon: "news", label: "Actualités", value: posts, href: "/admin/posts" },
    { icon: "image", label: "Photos", value: gallery, href: "/admin/gallery" },
    { icon: "users", label: "Partenaires", value: partners, href: "/admin/partners" },
  ];

  return (
    <div>
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Tableau de bord</h1>

      {/* ===== Panneau de bienvenue ===== */}
      <div className="relative bg-white border border-[#c3c4c7] rounded-[3px] p-5 md:p-7 mb-5 overflow-hidden">
        <span className="absolute left-0 top-0 h-full w-1 bg-[#c1121f]" />
        <h2 className="text-[21px] font-normal text-[#1d2327]">Bienvenue sur l&apos;espace OFAC !</h2>
        <p className="text-[#50575e] mt-1 mb-5 text-[14px]">Gérez le contenu de votre site sans écrire de code.</p>
        <div className="grid md:grid-cols-3 gap-6 text-[14px]">
          <div>
            <h3 className="text-[16px] font-semibold mb-3">Démarrer</h3>
            <Link href="/" target="_blank" className="inline-block px-4 py-2 rounded-[3px] bg-[#c1121f] text-white font-medium hover:bg-[#9a0e18]">
              Voir le site en ligne
            </Link>
            <p className="text-[#50575e] mt-3">ou <Link href="/admin/posts" className="text-[#c1121f] hover:underline">publier une actualité</Link></p>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold mb-3">Étapes suivantes</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Icon name="news" size={16} className="text-[#c1121f]" /><Link href="/admin/posts" className="text-[#c1121f] hover:underline">Écrire un article</Link></li>
              <li className="flex items-center gap-2"><Icon name="image" size={16} className="text-[#c1121f]" /><Link href="/admin/gallery" className="text-[#c1121f] hover:underline">Ajouter des photos</Link></li>
              <li className="flex items-center gap-2"><Icon name="users" size={16} className="text-[#c1121f]" /><Link href="/admin/partners" className="text-[#c1121f] hover:underline">Ajouter un partenaire</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold mb-3">Plus d&apos;actions</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Icon name="inbox" size={16} className="text-[#50575e]" /><Link href="/admin/messages" className="text-[#c1121f] hover:underline">Consulter les messages</Link></li>
              <li className="flex items-center gap-2"><Icon name="settings" size={16} className="text-[#50575e]" /><Link href="/admin/settings" className="text-[#c1121f] hover:underline">Modifier images &amp; chiffres</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Metaboxes ===== */}
      <div className="grid md:grid-cols-2 gap-5">
        <Metabox title="En un coup d'œil">
          {unread > 0 && (
            <Link href="/admin/messages" className="flex items-center gap-2 mb-3 text-[14px] font-medium text-[#c1121f] hover:underline">
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#c1121f] text-white text-[11px] font-bold">{unread}</span>
              message(s) non lu(s)
            </Link>
          )}
          <ul className="grid grid-cols-2 gap-y-2 text-[14px]">
            {glance.map((g) => (
              <li key={g.label}>
                <Link href={g.href} className="flex items-center gap-2 text-[#2c3338] hover:text-[#c1121f]">
                  <Icon name={g.icon} size={16} className="text-[#787c82]" />
                  <span className="font-semibold">{g.value}</span> {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </Metabox>

        <Metabox title="Activité récente">
          {recents.length === 0 ? (
            <p className="text-[14px] text-[#50575e]">Aucun message récent.</p>
          ) : (
            <ul className="divide-y divide-[#f0f0f1] text-[14px]">
              {recents.map((m) => (
                <li key={m.id} className="py-2 flex items-center justify-between gap-3">
                  <span className="text-[#1d2327]">{m.name}</span>
                  <span className="text-[#787c82] text-[12px] whitespace-nowrap">
                    {new Date(m.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/admin/messages" className="inline-block mt-3 text-[13px] text-[#c1121f] hover:underline">Voir tous les messages →</Link>
        </Metabox>
      </div>
    </div>
  );
}
