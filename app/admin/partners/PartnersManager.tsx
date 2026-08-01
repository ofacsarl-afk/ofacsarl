"use client";

import { useState, useTransition } from "react";
import type { Partner } from "@/lib/types";
import ImageUpload from "../ImageUpload";
import { savePartner, deletePartner } from "../actions";

export default function PartnersManager({ partners }: { partners: Partner[] }) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [url, setUrl] = useState("");
  const [pending, start] = useTransition();

  function add() {
    if (!name) return;
    start(async () => {
      await savePartner({ name, logo_url: logo, url });
      setName("");
      setLogo("");
      setUrl("");
    });
  }

  return (
    <div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 mb-6">
        <h2 className="font-semibold text-zinc-900 mb-4">Ajouter un partenaire</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ImageUpload value={logo} onUploaded={setLogo} label="Logo" />
          <div className="space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du partenaire"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Site web (optionnel)"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
            <button onClick={add} disabled={!name || pending}
              className="px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-60">
              {pending ? "Ajout..." : "Ajouter"}
            </button>
          </div>
        </div>
      </div>

      {partners.length === 0 ? (
        <p className="text-zinc-500">Aucun partenaire enregistré. Le site affiche les partenaires par défaut.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p.id} className="rounded-2xl border border-zinc-200 bg-white p-4 text-center">
              {p.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logo_url} alt={p.name} className="h-16 mx-auto object-contain mb-2" />
              ) : (
                <div className="h-16 flex items-center justify-center text-zinc-400 mb-2">—</div>
              )}
              <div className="text-sm font-medium text-zinc-800">{p.name}</div>
              <button onClick={() => { if (confirm("Supprimer ce partenaire ?")) start(() => deletePartner(p.id)); }}
                className="mt-2 text-xs text-red-600 hover:underline">Supprimer</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
