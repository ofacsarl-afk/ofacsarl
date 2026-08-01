import { getServerSupabase } from "@/lib/supabase/server";
import type { Message } from "@/lib/types";
import MessageRow from "./MessageRow";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const sb = await getServerSupabase();
  let messages: Message[] = [];
  if (sb) {
    const { data } = await sb
      .from("messages")
      .select("*")
      .eq("is_archived", false)
      .order("created_at", { ascending: false });
    messages = (data as Message[]) || [];
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">Messages reçus</h1>
      <p className="text-zinc-500 mb-6">Demandes envoyées depuis le formulaire de contact du site.</p>

      {messages.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500">
          Aucun message pour le moment.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <MessageRow key={m.id} m={m} />
          ))}
        </div>
      )}
    </div>
  );
}
