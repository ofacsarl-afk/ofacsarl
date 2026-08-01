import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";
import { getServiceSupabase } from "@/lib/supabase/service";

export const runtime = "nodejs";

/**
 * Upload d'image réservé à l'admin connecté.
 * Vérifie la session (cookies) puis écrit dans le bucket "media" via la
 * clé service_role — évite d'avoir à configurer des politiques Storage.
 */
export async function POST(request: Request) {
  const auth = await getServerSupabase();
  const { data } = auth ? await auth.auth.getUser() : { data: { user: null } };
  if (!data?.user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 10 Mo)" }, { status: 400 });
  }

  const svc = getServiceSupabase();
  if (!svc) return NextResponse.json({ error: "Supabase non configuré" }, { status: 500 });

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await svc.storage.from("media").upload(path, buffer, {
    contentType: file.type || "image/jpeg",
    cacheControl: "3600",
    upsert: false,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: pub } = svc.storage.from("media").getPublicUrl(path);
  return NextResponse.json({ url: pub.publicUrl });
}
