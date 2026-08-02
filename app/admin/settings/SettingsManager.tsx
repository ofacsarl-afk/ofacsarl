"use client";

import { useState, useTransition } from "react";
import type { ImpactStat, SectionImages } from "@/lib/types";
import ImageUpload from "../ImageUpload";
import { saveImpactStats, saveSectionImages } from "../actions";

const IMAGE_SLOTS: { key: string; label: string }[] = [
  { key: "logo", label: "Logo OFAC" },
  { key: "about_main", label: "À propos — image principale" },
  { key: "about_overlay", label: "À propos — image secondaire" },
  { key: "founder", label: "Fondatrice" },
];

export default function SettingsManager({ impact, images }: { impact: ImpactStat[]; images: SectionImages }) {
  const [stats, setStats] = useState<ImpactStat[]>(impact);
  const [imgs, setImgs] = useState<SectionImages>(images);
  const [pending, start] = useTransition();
  const [savedMsg, setSavedMsg] = useState("");

  function setStat(i: number, k: keyof ImpactStat, v: string) {
    setStats((s) => s.map((st, idx) => (idx === i ? { ...st, [k]: k === "value" ? Number(v) || 0 : v } : st)));
  }

  function saveStats() {
    start(async () => {
      await saveImpactStats(stats);
      setSavedMsg("Chiffres enregistrés ✓");
      setTimeout(() => setSavedMsg(""), 2500);
    });
  }
  function saveImgs(next: SectionImages) {
    setImgs(next);
    start(async () => {
      await saveSectionImages(next);
      setSavedMsg("Image mise à jour ✓");
      setTimeout(() => setSavedMsg(""), 2500);
    });
  }

  return (
    <div className="space-y-8">
      {savedMsg && <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{savedMsg}</div>}

      {/* CHIFFRES */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-5">
        <h2 className="font-semibold text-zinc-900 mb-4">Chiffres d&apos;impact</h2>
        <div className="grid gap-4">
          {stats.map((s, i) => (
            <div key={s.key} className="grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
              <input value={s.label_fr} onChange={(e) => setStat(i, "label_fr", e.target.value)} placeholder="Libellé FR"
                className="px-3 py-2 rounded-lg border border-zinc-300" />
              <input value={s.label_en} onChange={(e) => setStat(i, "label_en", e.target.value)} placeholder="Label EN"
                className="px-3 py-2 rounded-lg border border-zinc-300" />
              <input type="number" value={s.value} onChange={(e) => setStat(i, "value", e.target.value)} placeholder="Valeur"
                className="px-3 py-2 rounded-lg border border-zinc-300" />
              <input value={s.unit} onChange={(e) => setStat(i, "unit", e.target.value)} placeholder="Unité (T+, $...)"
                className="px-3 py-2 rounded-lg border border-zinc-300" />
            </div>
          ))}
        </div>
        <button onClick={saveStats} disabled={pending}
          className="mt-4 px-4 py-2 rounded-lg bg-[#c1121f] text-white hover:bg-[#9a0e18] disabled:opacity-60">
          {pending ? "..." : "Enregistrer les chiffres"}
        </button>
      </section>

      {/* IMAGES */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-5">
        <h2 className="font-semibold text-zinc-900 mb-4">Images des sections</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {IMAGE_SLOTS.map((slot) => (
            <ImageUpload
              key={slot.key}
              label={slot.label}
              value={imgs[slot.key]}
              onUploaded={(u) => saveImgs({ ...imgs, [slot.key]: u })}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-400 mt-3">La modification d&apos;une image est enregistrée automatiquement.</p>
      </section>
    </div>
  );
}
