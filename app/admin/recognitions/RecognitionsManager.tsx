"use client";

import { useState, useTransition } from "react";
import type { Recognition } from "@/lib/types";
import { saveRecognitions } from "../actions";

const ICONS: { value: string; label: string }[] = [
  { value: "fa-award", label: "Prix / Distinction" },
  { value: "fa-trophy", label: "Trophée" },
  { value: "fa-medal", label: "Médaille" },
  { value: "fa-certificate", label: "Certificat" },
  { value: "fa-leaf", label: "Environnement" },
  { value: "fa-handshake", label: "Partenariat" },
  { value: "fa-globe-africa", label: "Label régional" },
  { value: "fa-star", label: "Étoile" },
  { value: "fa-shield-halved", label: "Officiel" },
  { value: "fa-building", label: "Institution" },
];

const EMPTY: Recognition = {
  icon: "fa-award", year: "", title_fr: "", title_en: "", desc_fr: "", desc_en: "",
};

export default function RecognitionsManager({ items }: { items: Recognition[] }) {
  const [list, setList] = useState<Recognition[]>(items.length ? items : [EMPTY]);
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  const update = (i: number, k: keyof Recognition, v: string) =>
    setList((l) => l.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)));
  const add = () => setList((l) => [...l, { ...EMPTY }]);
  const remove = (i: number) => setList((l) => l.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) =>
    setList((l) => {
      const j = i + dir;
      if (j < 0 || j >= l.length) return l;
      const copy = [...l];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  function save() {
    start(async () => {
      await saveRecognitions(list.filter((r) => r.title_fr.trim()));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <div>
      {saved && <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">Enregistré ✓</div>}

      <div className="space-y-4">
        {list.map((r, i) => (
          <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-4">
            <div className="flex items-start gap-4">
              {/* Aperçu icône */}
              <div className="shrink-0 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full text-white text-lg" style={{ background: "#c1121f" }}>
                  <i className={`fa-solid ${r.icon}`} />
                </span>
              </div>

              <div className="flex-1 min-w-0 grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Icône</label>
                  <select value={r.icon} onChange={(e) => update(i, "icon", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300">
                    {ICONS.map((ic) => <option key={ic.value} value={ic.value}>{ic.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Année</label>
                  <input value={r.year} onChange={(e) => update(i, "year", e.target.value)} placeholder="2024 / À venir"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300" />
                </div>
                <input value={r.title_fr} onChange={(e) => update(i, "title_fr", e.target.value)} placeholder="Titre (français) *"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 font-medium" />
                <input value={r.title_en} onChange={(e) => update(i, "title_en", e.target.value)} placeholder="Title (English)"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 font-medium" />
                <textarea value={r.desc_fr} onChange={(e) => update(i, "desc_fr", e.target.value)} placeholder="Description (français)"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 h-16" />
                <textarea value={r.desc_en} onChange={(e) => update(i, "desc_en", e.target.value)} placeholder="Description (English)"
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 h-16" />
              </div>

              <div className="shrink-0 flex flex-col gap-1">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="px-2 py-1 rounded border border-zinc-200 text-zinc-500 hover:bg-zinc-50 disabled:opacity-30" title="Monter">▲</button>
                <button onClick={() => move(i, 1)} disabled={i === list.length - 1} className="px-2 py-1 rounded border border-zinc-200 text-zinc-500 hover:bg-zinc-50 disabled:opacity-30" title="Descendre">▼</button>
                <button onClick={() => remove(i)} className="px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50" title="Supprimer">✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        <button onClick={add} className="px-4 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-50">+ Ajouter une reconnaissance</button>
        <button onClick={save} disabled={pending} className="px-4 py-2 rounded-lg bg-[#c1121f] text-white hover:bg-[#9a0e18] disabled:opacity-60">
          {pending ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}
