// Crée le compte admin OFAC + vérifie l'état des données.
// Le mot de passe est généré aléatoirement à l'exécution (jamais stocké dans le code).
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n").filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const ADMIN_EMAIL = process.argv[2] || "onceforallcompanysarl@gmail.com";

// mot de passe fort aléatoire
const raw = randomBytes(9).toString("base64").replace(/[^a-zA-Z0-9]/g, "");
const password = "Ofac-" + raw + "9!";

// 1) Créer / vérifier le compte admin
const { data: existing } = await sb.auth.admin.listUsers();
const already = existing?.users?.find((u) => u.email === ADMIN_EMAIL);
if (already) {
  console.log(`ℹ️ Compte déjà existant: ${ADMIN_EMAIL} (aucun changement)`);
} else {
  const { error } = await sb.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password,
    email_confirm: true,
  });
  if (error) console.log("❌ createUser:", error.message);
  else {
    console.log("✅ Compte admin créé !");
    console.log("   Email    :", ADMIN_EMAIL);
    console.log("   Password :", password);
  }
}

// 2) Vérifier l'accès aux données (cache de schéma PostgREST)
const { error: readErr, count } = await sb.from("site_settings").select("*", { count: "exact", head: true });
console.log(readErr ? `❌ Lecture données: ${readErr.message}` : `✅ Lecture données OK (site_settings)`);

// 3) Test insertion + lecture d'un message
const { error: insErr } = await sb.from("messages").insert({ name: "Test système", email: "systeme@ofac.test", type: "info", message: "Vérification automatique du pipeline." });
if (insErr) console.log("❌ Insertion message:", insErr.message);
else {
  const { data, error } = await sb.from("messages").select("name,created_at").order("created_at", { ascending: false }).limit(1);
  console.log(error ? `❌ Lecture message: ${error.message}` : `✅ Pipeline message OK (dernier: ${data[0]?.name})`);
}
