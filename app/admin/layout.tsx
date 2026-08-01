import "../globals.css";
import Link from "next/link";
import { getServerSupabase } from "@/lib/supabase/server";
import SignOutButton from "./SignOutButton";

export const metadata = { title: "Admin — OFAC" };

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: "📊" },
  { href: "/admin/messages", label: "Messages", icon: "📥" },
  { href: "/admin/posts", label: "Actualités", icon: "📰" },
  { href: "/admin/gallery", label: "Galerie", icon: "🖼️" },
  { href: "/admin/partners", label: "Partenaires", icon: "🤝" },
  { href: "/admin/settings", label: "Images & chiffres", icon: "⚙️" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sb = await getServerSupabase();
  const { data } = sb ? await sb.auth.getUser() : { data: { user: null } };
  const user = data?.user;

  // La page de login n'a pas de session : on la rend sans le cadre admin.
  if (!user) {
    return <div className="min-h-screen bg-zinc-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 flex">
      <aside className="w-60 shrink-0 bg-zinc-900 text-zinc-100 flex flex-col">
        <div className="px-5 py-5 border-b border-zinc-800">
          <div className="text-lg font-bold tracking-tight">OFAC Admin</div>
          <div className="text-xs text-zinc-400 mt-1 truncate">{user.email}</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-zinc-800 transition">
              <span>{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-6 md:p-8">{children}</main>
    </div>
  );
}
