"use client";

import { useState } from "react";
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
      setError("Supabase n'est pas configuré.");
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
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(60% 60% at 15% 20%, #e9a17c 0%, transparent 60%)," +
          "radial-gradient(55% 55% at 85% 15%, #2a9d8f 0%, transparent 55%)," +
          "radial-gradient(65% 65% at 80% 85%, #264653 0%, transparent 60%)," +
          "radial-gradient(60% 60% at 20% 90%, #1d3557 0%, transparent 60%)," +
          "linear-gradient(135deg, #3a7d7b, #21455c)",
      }}
    >
      {/* voile de flou coloré */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/10" />

      <form onSubmit={onSubmit} className="relative w-full max-w-[380px]">
        {/* Pastille rouge avec cadenas */}
        <div className="flex justify-center">
          <span className="relative z-10 -mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e01e37] shadow-lg ring-4 ring-white/20">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
        </div>

        {/* Carte givrée */}
        <div className="rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 shadow-2xl pt-12 pb-7 px-6">
          <div className="text-center mb-5">
            <div className="text-white font-bold tracking-wide text-lg drop-shadow">OFAC ADMIN</div>
            <div className="text-white/70 text-xs mt-0.5">Espace d&apos;administration</div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-white bg-red-600/80 rounded-lg px-3 py-2 text-center">{error}</div>
          )}

          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email" autoComplete="email"
            className="w-full mb-3 px-4 py-3 rounded-lg bg-white text-[#1d2327] placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e01e37]"
          />

          <div className="relative mb-5">
            <input
              type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="mot de passe" autoComplete="current-password"
              className="w-full px-4 py-3 pr-11 rounded-lg bg-white text-[#1d2327] placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e01e37]"
            />
            <button
              type="button" onClick={() => setShow((s) => !s)}
              aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700"
            >
              <Icon name={show ? "eyeOff" : "eye"} size={20} />
            </button>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3 rounded-lg bg-[#e01e37] text-white font-bold tracking-wide uppercase shadow-md transition hover:bg-[#c1121f] disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <p className="text-center text-white/80 text-[13px] mt-4">
            Mot de passe oublié ?{" "}
            <a href="mailto:onceforallcompanysarl@gmail.com?subject=Réinitialisation%20mot%20de%20passe%20admin%20OFAC" className="underline hover:text-white">
              Cliquez ici
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
