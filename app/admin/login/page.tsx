"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";
import Icon from "../Icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const sb = getBrowserSupabase();
    if (!sb) {
      setError("Supabase n'est pas configuré (variables d'environnement manquantes).");
      setLoading(false);
      return;
    }
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] p-4 relative overflow-hidden">
      {/* halo de marque */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-25 blur-3xl" style={{ background: "#c1121f" }} />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "#f7b500" }} />

      <form onSubmit={onSubmit} className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
            <Image src="/images/logo_ofac.jpg" alt="OFAC" width={72} height={72} className="object-contain rounded-xl" priority />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white">OFAC Admin</h1>
          <p className="text-sm text-zinc-400 mt-1">Espace d&apos;administration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-7">
          {/* filet de marque */}
          <div className="h-1 -mt-7 -mx-7 mb-6 rounded-t-2xl" style={{ background: "linear-gradient(90deg,#c1121f,#f7b500 60%,#1a1a1a)" }} />

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
          )}

          <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
            className="w-full mb-4 px-3 py-2.5 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#c1121f]/50 focus:border-[#c1121f]"
          />

          <label className="block text-sm font-medium text-zinc-700 mb-1">Mot de passe</label>
          <div className="relative mb-6">
            <input
              type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"
              className="w-full px-3 py-2.5 pr-11 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#c1121f]/50 focus:border-[#c1121f]"
            />
            <button
              type="button" onClick={() => setShow((s) => !s)}
              aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-zinc-700"
            >
              <Icon name={show ? "eyeOff" : "eye"} size={20} />
            </button>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-2.5 rounded-lg text-white font-semibold transition disabled:opacity-60 hover:brightness-110"
            style={{ background: "#c1121f" }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-6">© 2026 OFAC — Once For All Company</p>
      </form>
    </div>
  );
}
