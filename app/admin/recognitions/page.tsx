import { getRecognitions } from "@/lib/content";
import RecognitionsManager from "./RecognitionsManager";

export const dynamic = "force-dynamic";

export default async function RecognitionsPage() {
  const items = await getRecognitions();
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">Reconnaissances &amp; Certifications</h1>
      <p className="text-zinc-500 mb-6">Gérez les distinctions, prix et certifications affichés sur le site.</p>
      <RecognitionsManager items={items} />
    </div>
  );
}
