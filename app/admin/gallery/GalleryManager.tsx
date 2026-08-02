"use client";

import { useState, useTransition } from "react";
import type { GalleryItem } from "@/lib/types";
import ImageUpload from "../ImageUpload";
import { addGalleryItem, deleteGalleryItem, updateGalleryItem, moveGalleryItem, seedDefaultGallery } from "../actions";

function ItemCard({ it, index, total }: { it: GalleryItem; index: number; total: number }) {
  const [fr, setFr] = useState(it.caption_fr || "");
  const [en, setEn] = useState(it.caption_en || "");
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  function saveCaption() {
    if (fr === (it.caption_fr || "") && en === (it.caption_en || "")) return;
    start(async () => {
      await updateGalleryItem(it.id, { caption_fr: fr, caption_en: en });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    });
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={it.image_url} alt={fr} className="w-full h-36 object-cover" />
      <div className="p-3 space-y-2 flex-1 flex flex-col">
        <input value={fr} onChange={(e) => setFr(e.target.value)} onBlur={saveCaption} placeholder="Légende (français)"
          className="w-full px-2 py-1.5 text-sm rounded-lg border border-zinc-300" />
        <input value={en} onChange={(e) => setEn(e.target.value)} onBlur={saveCaption} placeholder="Caption (English)"
          className="w-full px-2 py-1.5 text-sm rounded-lg border border-zinc-300" />
        <div className="flex items-center gap-1 mt-auto pt-1">
          <button onClick={() => start(() => moveGalleryItem(it.id, -1))} disabled={index === 0 || pending}
            className="px-2 py-1 rounded border border-zinc-200 text-zinc-500 hover:bg-zinc-50 disabled:opacity-30" title="Monter">▲</button>
          <button onClick={() => start(() => moveGalleryItem(it.id, 1))} disabled={index === total - 1 || pending}
            className="px-2 py-1 rounded border border-zinc-200 text-zinc-500 hover:bg-zinc-50 disabled:opacity-30" title="Descendre">▼</button>
          <span className="text-xs text-green-600 ml-1">{saved ? "enregistré ✓" : ""}</span>
          <button onClick={() => { if (confirm("Supprimer cette photo ?")) start(() => deleteGalleryItem(it.id)); }}
            className="ml-auto px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 text-xs" title="Supprimer">Supprimer</button>
        </div>
      </div>
    </div>
  );
}

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
      {/* Ajout d'une nouvelle photo */}
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

      {/* Galerie existante */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center">
          <p className="text-zinc-600 mb-1">La galerie affiche actuellement les <b>photos par défaut</b> du site.</p>
          <p className="text-zinc-500 text-sm mb-4">Importez-les dans la base pour pouvoir les modifier, réordonner ou supprimer une par une.</p>
          <button onClick={() => start(() => seedDefaultGallery())} disabled={pending}
            className="px-4 py-2 rounded-lg bg-[#c1121f] text-white hover:bg-[#9a0e18] disabled:opacity-60">
            {pending ? "Import..." : "Importer les photos existantes"}
          </button>
        </div>
      ) : (
        <>
          <h2 className="font-semibold text-zinc-900 mb-3">Photos en ligne ({items.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((it, i) => (
              <ItemCard key={it.id} it={it} index={i} total={items.length} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
