"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-zinc-900">OFAC Admin</div>
          <p className="text-sm text-zinc-500 mt-1">Connexion à l&apos;espace d&apos;administration</p>
        </div>
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
        <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        <label className="block text-sm font-medium text-zinc-700 mb-1">Mot de passe</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900" />
        <button type="submit" disabled={loading}
          className="w-full py-2.5 rounded-lg bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60">
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
