import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import Icon, { type IconName } from "./Icons";

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

  const stats: { label: string; value: number; href: string; icon: IconName; highlight?: boolean }[] = [
    { label: "Messages non lus", value: unread, href: "/admin/messages", icon: "inbox", highlight: true },
    { label: "Total messages", value: totalMsg, href: "/admin/messages", icon: "inbox" },
    { label: "Actualités", value: posts, href: "/admin/posts", icon: "news" },
    { label: "Photos galerie", value: gallery, href: "/admin/gallery", icon: "image" },
    { label: "Partenaires", value: partners, href: "/admin/partners", icon: "users" },
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">Tableau de bord</h1>
      <p className="text-zinc-500 mt-1 mb-7">Bienvenue dans l&apos;espace d&apos;administration OFAC.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`relative overflow-hidden rounded-2xl border bg-white p-5 transition hover:shadow-md ${
              c.highlight && c.value > 0 ? "border-[#c1121f]/40" : "border-zinc-200"
            }`}
          >
            <span
              className="absolute left-0 top-0 h-full w-1"
              style={{ background: c.highlight ? "#c1121f" : "#e4e4e7" }}
            />
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-zinc-900">{c.value}</span>
              <span className={c.highlight && c.value > 0 ? "text-[#c1121f]" : "text-zinc-300"}>
                <Icon name={c.icon} size={22} />
              </span>
            </div>
            <div className="text-sm text-zinc-500 mt-1">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Link href="/admin/posts" className="group rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-md transition flex items-start gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shrink-0" style={{ background: "#c1121f" }}>
            <Icon name="news" size={20} />
          </span>
          <div>
            <div className="font-semibold text-zinc-900">Publier une actualité</div>
            <p className="text-sm text-zinc-500 mt-0.5">Ajoutez un article ou une nouvelle avec photo, visible sur le site.</p>
          </div>
        </Link>
        <Link href="/admin/gallery" className="group rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-md transition flex items-start gap-4">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shrink-0" style={{ background: "#0d0d0d" }}>
            <Icon name="image" size={20} />
          </span>
          <div>
            <div className="font-semibold text-zinc-900">Ajouter des photos</div>
            <p className="text-sm text-zinc-500 mt-0.5">Enrichissez la galerie « Terrain &amp; Projets » sans code.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
