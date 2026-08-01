"use client";

import { useState, useTransition } from "react";
import type { Message } from "@/lib/types";
import { setMessageRead, setMessageArchived, deleteMessage } from "../actions";

export default function MessageRow({ m }: { m: Message }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();

  const date = new Date(m.created_at).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className={`rounded-2xl border bg-white p-4 ${m.is_read ? "border-zinc-200" : "border-red-300"}`}>
      <div className="flex items-start justify-between gap-4">
        <button className="text-left flex-1" onClick={() => { setOpen(!open); if (!m.is_read) start(() => setMessageRead(m.id, true)); }}>
          <div className="flex items-center gap-2">
            {!m.is_read && <span className="inline-block h-2 w-2 rounded-full bg-red-500" />}
            <span className="font-semibold text-zinc-900">{m.name}</span>
            {m.type && <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">{m.type}</span>}
          </div>
          <div className="text-sm text-zinc-500 mt-0.5">{m.email} · {date}</div>
          {!open && <div className="text-sm text-zinc-600 mt-1 line-clamp-1">{m.message}</div>}
        </button>
      </div>

      {open && (
        <div className="mt-3">
          <p className="text-sm text-zinc-800 whitespace-pre-wrap bg-zinc-50 rounded-lg p-3 border border-zinc-100">{m.message}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <a href={`mailto:${m.email}`} className="text-sm px-3 py-1.5 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800">Répondre par email</a>
            <button disabled={pending} onClick={() => start(() => setMessageRead(m.id, !m.is_read))}
              className="text-sm px-3 py-1.5 rounded-lg border border-zinc-300 hover:bg-zinc-50">
              Marquer comme {m.is_read ? "non lu" : "lu"}
            </button>
            <button disabled={pending} onClick={() => start(() => setMessageArchived(m.id, true))}
              className="text-sm px-3 py-1.5 rounded-lg border border-zinc-300 hover:bg-zinc-50">Archiver</button>
            <button disabled={pending} onClick={() => { if (confirm("Supprimer ce message ?")) start(() => deleteMessage(m.id)); }}
              className="text-sm px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">Supprimer</button>
          </div>
        </div>
      )}
    </div>
  );
}
