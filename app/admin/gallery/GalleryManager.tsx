"use client";

import { useState, useTransition } from "react";
import type { GalleryItem } from "@/lib/types";
import ImageUpload from "../ImageUpload";
import { addGalleryItem, deleteGalleryItem } from "../actions";

export default function GalleryManager({ items }: { items: GalleryItem[] }) {
  const [url, setUrl] = useState("");
  const [capFr, setCapFr] = useState("");
  const [capEn, setCapEn] = useState("");
  const [pending, start] = useTransition();

  function add() {
    if (!url) return;
    start(async () => {
      await addGalleryItem({ image_url: url, caption_fr: capFr, caption_en: capEn });
      setUrl("");
      setCapFr("");
      setCapEn("");
    });
  }

  return (
    <div>
      {/* Ajout */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 mb-6">
        <h2 className="font-semibold text-zinc-900 mb-4">Ajouter une photo</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ImageUpload value={url} onUploaded={setUrl} label="Photo" />
          <div className="space-y-3">
            <input value={capFr} onChange={(e) => setCapFr(e.target.value)} placeholder="Légende (français)"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            <input value={capEn} onChange={(e) => setCapEn(e.target.value)} placeholder="Caption (English)"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            <button onClick={add} disabled={!url || pending}
              className="px-4 py-2 rounded-lg bg-[#c1121f] text-white hover:bg-[#9a0e18] disabled:opacity-60">
              {pending ? "Ajout..." : "Ajouter à la galerie"}
            </button>
          </div>
        </div>
      </div>

      {/* Liste */}
      {items.length === 0 ? (
        <p className="text-zinc-500">Aucune photo. La galerie affiche les photos par défaut du site.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.id} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.image_url} alt={it.caption_fr || ""} className="w-full h-36 object-cover" />
              <div className="p-3">
                <p className="text-xs text-zinc-600 line-clamp-2">{it.caption_fr}</p>
                <button onClick={() => { if (confirm("Supprimer cette photo ?")) start(() => deleteGalleryItem(it.id)); }}
                  className="mt-2 text-xs text-red-600 hover:underline">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
