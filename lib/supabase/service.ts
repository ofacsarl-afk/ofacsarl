import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase avec la clé service_role — UNIQUEMENT côté serveur
 * (Server Actions / Route Handlers). Contourne la RLS : à n'utiliser que
 * pour des opérations de confiance (ex. insertion d'un message de contact).
 * Ne jamais l'importer dans du code client.
 */
export function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
