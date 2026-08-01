// Diagnostic de connexion Supabase (lecture de .env.local)
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const service = env.SUPABASE_SERVICE_ROLE_KEY;
console.log("URL:", url);

const sb = createClient(url, service, { auth: { persistSession: false } });

const tables = ["messages", "posts", "gallery_items", "partners", "site_settings"];
for (const t of tables) {
  const { error, count } = await sb.from(t).select("*", { count: "exact", head: true });
  console.log(error ? `❌ ${t}: ${error.message}` : `✅ ${t}: OK (${count} lignes)`);
}

// Bucket storage
const { data: buckets, error: bErr } = await sb.storage.listBuckets();
console.log(bErr ? `❌ storage: ${bErr.message}` : `📦 buckets: ${buckets.map((b) => b.id).join(", ") || "(aucun)"}`);

// Utilisateurs admin
const { data: users, error: uErr } = await sb.auth.admin.listUsers();
if (uErr) console.log(`❌ auth: ${uErr.message}`);
else console.log(`👤 comptes admin: ${users.users.length} → ${users.users.map((u) => u.email).join(", ") || "(aucun)"}`);
