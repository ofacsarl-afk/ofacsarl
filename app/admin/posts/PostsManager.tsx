"use client";

import { useState, useTransition } from "react";
import type { Post } from "@/lib/types";
import ImageUpload from "../ImageUpload";
import { savePost, deletePost } from "../actions";

type Draft = {
  id?: string;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  body_fr: string;
  body_en: string;
  cover_url: string;
  published: boolean;
};

const EMPTY: Draft = {
  title_fr: "", title_en: "", excerpt_fr: "", excerpt_en: "",
  body_fr: "", body_en: "", cover_url: "", published: false,
};

export default function PostsManager({ posts }: { posts: Post[] }) {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [pending, start] = useTransition();

  function edit(p: Post) {
    setDraft({
      id: p.id,
      title_fr: p.title_fr, title_en: p.title_en || "",
      excerpt_fr: p.excerpt_fr || "", excerpt_en: p.excerpt_en || "",
      body_fr: p.body_fr || "", body_en: p.body_en || "",
      cover_url: p.cover_url || "", published: p.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function save(publish: boolean) {
    if (!draft || !draft.title_fr) return;
    start(async () => {
      await savePost({ ...draft, published: publish });
      setDraft(null);
    });
  }

  const set = (k: keyof Draft, v: string | boolean) => setDraft((d) => (d ? { ...d, [k]: v } : d));

  return (
    <div>
      {draft ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-zinc-900">{draft.id ? "Modifier l'article" : "Nouvel article"}</h2>
            <button onClick={() => setDraft(null)} className="text-sm text-zinc-500 hover:underline">Annuler</button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <input value={draft.title_fr} onChange={(e) => set("title_fr", e.target.value)} placeholder="Titre (français) *"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 font-medium" />
              <textarea value={draft.excerpt_fr} onChange={(e) => set("excerpt_fr", e.target.value)} placeholder="Résumé court (français)"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 h-20" />
              <textarea value={draft.body_fr} onChange={(e) => set("body_fr", e.target.value)} placeholder="Contenu (français)"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 h-40" />
            </div>
            <div className="space-y-3">
              <input value={draft.title_en} onChange={(e) => set("title_en", e.target.value)} placeholder="Title (English)"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 font-medium" />
              <textarea value={draft.excerpt_en} onChange={(e) => set("excerpt_en", e.target.value)} placeholder="Short excerpt (English)"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 h-20" />
              <textarea value={draft.body_en} onChange={(e) => set("body_en", e.target.value)} placeholder="Content (English)"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 h-40" />
            </div>
          </div>
          <div className="mt-4">
            <ImageUpload value={draft.cover_url} onUploaded={(u) => set("cover_url", u)} label="Image de couverture" />
          </div>
          <div className="flex gap-2 mt-5">
            <button onClick={() => save(true)} disabled={!draft.title_fr || pending}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60">
              {pending ? "..." : "Publier"}
            </button>
            <button onClick={() => save(false)} disabled={!draft.title_fr || pending}
              className="px-4 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-50">Enregistrer en brouillon</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setDraft(EMPTY)} className="mb-6 px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800">
          + Nouvel article
        </button>
      )}

      {posts.length === 0 ? (
        <p className="text-zinc-500">Aucun article pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="rounded-2xl border border-zinc-200 bg-white p-4 flex items-center gap-4">
              {p.cover_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover_url} alt="" className="h-14 w-14 object-cover rounded-lg" />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-zinc-900 truncate">{p.title_fr}</div>
                <div className="text-xs mt-0.5">
                  <span className={p.published ? "text-green-600" : "text-zinc-400"}>
                    {p.published ? "● Publié" : "○ Brouillon"}
                  </span>
                </div>
              </div>
              <button onClick={() => edit(p)} className="text-sm px-3 py-1.5 rounded-lg border border-zinc-300 hover:bg-zinc-50">Modifier</button>
              <button onClick={() => { if (confirm("Supprimer cet article ?")) start(() => deletePost(p.id)); }}
                className="text-sm px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">Supprimer</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
