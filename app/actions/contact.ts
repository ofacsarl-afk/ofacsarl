"use server";

import { getServiceSupabase } from "@/lib/supabase/service";

export type ContactResult = { ok: boolean; error?: string };

/**
 * Enregistre un message du formulaire de contact dans Supabase.
 * Si Supabase n'est pas configuré, renvoie ok:false (le formulaire
 * bascule alors sur l'envoi WhatsApp côté client).
 */
export async function submitContact(input: {
  name: string;
  email: string;
  type: string;
  message: string;
}): Promise<ContactResult> {
  const name = input.name?.trim();
  const email = input.email?.trim();
  const message = input.message?.trim();
  const type = input.type?.trim() || null;

  if (!name || !email || !message) {
    return { ok: false, error: "missing_fields" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid_email" };
  }

  const sb = getServiceSupabase();
  if (!sb) return { ok: false, error: "not_configured" };

  const { error } = await sb.from("messages").insert({ name, email, type, message });
  if (error) return { ok: false, error: error.message };

  return { ok: true };
}
