"use client";

import { useState } from "react";

/**
 * Upload d'une image via la route serveur /api/upload (bucket "media").
 * Renvoie l'URL publique via onUploaded.
 */
export default function ImageUpload({
  value,
  onUploaded,
  label = "Image",
}: {
  value?: string;
  onUploaded: (url: string) => void;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Échec de l'envoi.");
        return;
      }
      onUploaded(json.url);
    } catch {
      setError("Échec de l'envoi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-1">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-16 w-16 object-cover rounded-lg border border-zinc-200" />
        ) : (
          <div className="h-16 w-16 rounded-lg border border-dashed border-zinc-300 flex items-center justify-center text-zinc-400 text-xs">
            vide
          </div>
        )}
        <label className="cursor-pointer text-sm px-3 py-2 rounded-lg bg-[#c1121f] text-white hover:bg-[#9a0e18] transition">
          {busy ? "Envoi..." : "Choisir un fichier"}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={busy} />
        </label>
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
