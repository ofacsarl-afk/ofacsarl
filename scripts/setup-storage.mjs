import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n").filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const { data, error } = await sb.storage.createBucket("media", {
  public: true,
  fileSizeLimit: "10MB",
});
if (error && !/already exists/i.test(error.message)) {
  console.log("❌ createBucket:", error.message);
} else {
  console.log("✅ bucket 'media' prêt (public).");
}
const { data: buckets } = await sb.storage.listBuckets();
console.log("📦 buckets:", buckets.map((b) => `${b.id}${b.public ? " (public)" : ""}`).join(", "));
