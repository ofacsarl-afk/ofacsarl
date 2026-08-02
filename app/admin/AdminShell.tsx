"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";
import Icon, { type IconName } from "./Icons";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin", label: "Tableau de bord", icon: "dashboard" },
  { href: "/admin/messages", label: "Messages", icon: "inbox" },
  { href: "/admin/posts", label: "Actualités", icon: "news" },
  { href: "/admin/gallery", label: "Galerie", icon: "image" },
  { href: "/admin/partners", label: "Partenaires", icon: "users" },
  { href: "/admin/settings", label: "Images & chiffres", icon: "settings" },
];

const RED = "#c1121f";

export default function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    const sb = getBrowserSupabase();
    if (sb) await sb.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const Sidebar = (
    <div className="flex h-full flex-col bg-[#0d0d0d] text-zinc-200">
      {/* Marque */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1">
          <Image src="/images/logo_ofac.jpg" alt="OFAC" width={40} height={40} className="object-contain rounded-lg" />
        </span>
        <div className="leading-tight">
          <div className="font-extrabold tracking-tight text-white">OFAC</div>
          <div className="text-[11px] uppercase tracking-[0.15em] text-zinc-400">Administration</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV.map((n) => {
          const active = isActive(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-[#c1121f] text-white shadow-sm" : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon name={n.icon} size={19} className={active ? "text-white" : "text-zinc-400 group-hover:text-white"} />
              {n.label}
            </Link>
          );
        })}
      </nav>

      {/* Utilisateur + déconnexion */}
      <div className="p-3 border-t border-white/10">
        <div className="px-2 pb-2 text-xs text-zinc-400 truncate" title={email}>
          {email}
        </div>
        <button
          onClick={signOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 transition"
        >
          <Icon name="logout" size={17} />
          Se déconnecter
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f4] text-zinc-900">
      {/* Barre supérieure mobile */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-[#0d0d0d] px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-0.5">
            <Image src="/images/logo_ofac.jpg" alt="OFAC" width={28} height={28} className="object-contain rounded-md" />
          </span>
          <span className="font-bold">OFAC Admin</span>
        </div>
        <button onClick={() => setOpen(true)} aria-label="Menu" className="p-1.5">
          <Icon name="menu" size={24} />
        </button>
      </header>

      <div className="flex">
        {/* Sidebar fixe (desktop) */}
        <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0">{Sidebar}</aside>

        {/* Drawer mobile */}
        {open && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div className="w-72 max-w-[80%] h-full shadow-2xl relative">
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="absolute right-3 top-4 z-10 text-zinc-300 hover:text-white">
                <Icon name="close" size={22} />
              </button>
              {Sidebar}
            </div>
            <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
          </div>
        )}

        {/* Contenu */}
        <main className="flex-1 min-w-0">
          {/* Barre de marque supérieure (desktop) */}
          <div className="hidden md:block h-1" style={{ background: `linear-gradient(90deg, ${RED}, #f7b500 60%, #0d0d0d)` }} />
          <div className="p-5 md:p-8 max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
