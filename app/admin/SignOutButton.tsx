"use client";

import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    const sb = getBrowserSupabase();
    if (sb) await sb.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button onClick={signOut} className="w-full text-sm px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition">
      Se déconnecter
    </button>
  );
}
