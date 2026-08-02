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

const NAVY = "#0e1a33";

export default function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const name = email.split("@")[0] || "admin";
  const initials = name.slice(0, 2).toUpperCase();
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));
  const title = NAV.find((n) => isActive(n.href))?.label || "Tableau de bord";

  async function signOut() {
    const sb = getBrowserSupabase();
    if (sb) await sb.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const SidebarInner = (
    <div className="flex h-full flex-col text-[#c7d0e0]" style={{ background: NAVY }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1 shrink-0">
          <Image src="/images/logo_ofac.jpg" alt="OFAC" width={30} height={30} className="object-contain rounded" />
        </span>
        <div className="leading-tight min-w-0">
          <div className="font-extrabold text-white tracking-tight">OFAC</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#7d8aa5]">Administration</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV.map((n) => {
          const active = isActive(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active ? "text-white shadow" : "text-[#a9b4cc] hover:bg-white/5 hover:text-white"
              }`}
              style={active ? { background: "#c1121f" } : undefined}
            >
              <Icon name={n.icon} size={18} />
              <span className="truncate">{n.label}</span>
            </Link>
          );
        })}

        <div className="my-3 border-t border-white/5" />
        <Link href="/" target="_blank" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#a9b4cc] hover:bg-white/5 hover:text-white transition">
          <Icon name="image" size={18} /> <span className="truncate">Voir le site</span>
        </Link>
      </nav>

      <div className="p-3 border-t border-white/5">
        <button onClick={signOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#a9b4cc] hover:bg-white/5 hover:text-white transition">
          <Icon name="logout" size={18} /> Se déconnecter
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f4f6fb] text-[#1f2a44] overflow-x-hidden [font-family:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
      {/* Sidebar desktop (dans le flux → aucun décalage) */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">{SidebarInner}</aside>

      {/* Drawer mobile */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 max-w-[80%] h-full shadow-2xl">{SidebarInner}</div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Colonne principale */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Barre supérieure */}
        <header className="sticky top-0 z-30 bg-white border-b border-zinc-200 h-16 flex items-center gap-3 px-4 md:px-6">
          <button className="lg:hidden text-zinc-600 hover:text-zinc-900 -ml-1 p-1" onClick={() => setOpen(true)} aria-label="Menu">
            <Icon name="menu" size={24} />
          </button>
          <h1 className="text-lg font-bold text-zinc-900 truncate">{title}</h1>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex items-center gap-2 bg-zinc-100 rounded-lg px-3 py-2 text-zinc-500">
              <Icon name="search" size={16} />
              <input placeholder="Rechercher…" className="bg-transparent outline-none text-sm text-zinc-700 w-36 lg:w-48" />
            </div>
            <Link href="/admin/messages" className="relative p-2 rounded-lg text-zinc-500 hover:bg-zinc-100" aria-label="Messages">
              <Icon name="bell" size={20} />
            </Link>
            <div className="flex items-center gap-2 pl-1">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white text-xs font-bold" style={{ background: "#c1121f" }}>
                {initials}
              </span>
              <span className="hidden sm:block text-sm text-zinc-600 max-w-[140px] truncate">{name}</span>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 min-w-0 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
