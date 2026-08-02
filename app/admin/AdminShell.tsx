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

export default function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const name = email.split("@")[0] || "admin";
  const initials = name.slice(0, 2).toUpperCase();
  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  async function signOut() {
    const sb = getBrowserSupabase();
    if (sb) await sb.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] text-[#1d2327] [font-family:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
      {/* ===== Barre d'administration (haut) ===== */}
      <header className="fixed top-0 inset-x-0 z-50 h-10 bg-[#1d2327] text-[#f0f0f1] flex items-center justify-between pl-2 pr-3 text-[13px]">
        <div className="flex items-center gap-1">
          <button className="md:hidden px-2 py-1 text-[#c3c4c7] hover:text-white" onClick={() => setOpen(!open)} aria-label="Menu">
            <Icon name="menu" size={20} />
          </button>
          <Link href="/" target="_blank" className="flex items-center gap-2 px-2 py-1.5 hover:text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white">
              <Image src="/images/logo_ofac.jpg" alt="OFAC" width={22} height={22} className="object-contain rounded-sm" />
            </span>
            <span className="font-semibold">OFAC</span>
            <span className="text-[#a7aaad] hidden sm:inline">— voir le site</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#c3c4c7] hidden sm:inline">Bonjour, <b className="text-white font-medium">{name}</b></span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c1121f] text-white text-[11px] font-bold">{initials}</span>
          <button onClick={signOut} className="ml-1 text-[#c3c4c7] hover:text-white flex items-center gap-1">
            <Icon name="logout" size={15} /> <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <div className="pt-10 flex">
        {/* ===== Menu latéral ===== */}
        <aside
          className={`fixed md:sticky z-40 top-10 md:self-start h-[calc(100vh-2.5rem)] w-40 shrink-0 bg-[#1d2327] transition-transform ${
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <nav className="py-1 text-[14px]">
            {NAV.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 transition ${
                    active
                      ? "bg-[#c1121f] text-white font-medium"
                      : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-white"
                  }`}
                >
                  <Icon name={n.icon} size={18} className={active ? "text-white" : "text-[#a7aaad]"} />
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* overlay mobile */}
        {open && <div className="md:hidden fixed inset-0 top-10 z-30 bg-black/40" onClick={() => setOpen(false)} />}

        {/* ===== Contenu ===== */}
        <main className="flex-1 min-w-0 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
