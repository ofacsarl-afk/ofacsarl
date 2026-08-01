"use client";

import { useState } from "react";
import { submitContact } from "@/app/actions/contact";

const WA = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "243971969157";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const isFr = document.body.classList.contains("fr");
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const typeSel = form.querySelector<HTMLSelectElement>("#cf-type");
    const typeLabel = typeSel ? typeSel.options[typeSel.selectedIndex].textContent?.trim() || "" : "";
    const type = String(data.get("type") || "");
    const message = String(data.get("message") || "").trim();

    setStatus("sending");
    const res = await submitContact({ name, email, type, message });

    if (!res.ok) {
      // Repli : envoi WhatsApp pré-rempli (aucun lead perdu)
      const text = isFr
        ? `Bonjour OFAC,\n\nNom : ${name}\nEmail : ${email}\nType de demande : ${typeLabel}\n\nMessage :\n${message}`
        : `Hello OFAC,\n\nName: ${name}\nEmail: ${email}\nRequest type: ${typeLabel}\n\nMessage:\n${message}`;
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank");
    }

    setStatus("sent");
    form.reset();
    setTimeout(() => setStatus("idle"), 3500);
  }

  const sent = status === "sent";

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label htmlFor="cf-name" className="sr-only" data-fr>Votre nom</label>
      <label htmlFor="cf-name" className="sr-only" data-en>Your name</label>
      <input id="cf-name" name="name" type="text" required autoComplete="name"
        className="lang-placeholder" data-placeholder-fr="Votre nom" data-placeholder-en="Your name" />

      <label htmlFor="cf-email" className="sr-only" data-fr>Votre email</label>
      <label htmlFor="cf-email" className="sr-only" data-en>Your email</label>
      <input id="cf-email" name="email" type="email" required autoComplete="email"
        className="lang-placeholder" data-placeholder-fr="Votre email" data-placeholder-en="Your email" />

      <label htmlFor="cf-type" className="sr-only" data-fr>Type de demande</label>
      <label htmlFor="cf-type" className="sr-only" data-en>Type of request</label>
      <select id="cf-type" name="type" required className="lang-placeholder">
        <option value="" data-fr>Type de demande</option>
        <option value="" data-en>Type of request</option>
        <option value="partner" data-fr>Partenariat</option>
        <option value="partner" data-en>Partnership</option>
        <option value="invest" data-fr>Investissement</option>
        <option value="invest" data-en>Investment</option>
        <option value="client" data-fr>Achat de pavés</option>
        <option value="client" data-en>Purchase paving stones</option>
        <option value="info" data-fr>Informations</option>
        <option value="info" data-en>Information</option>
      </select>

      <label htmlFor="cf-message" className="sr-only" data-fr>Votre message</label>
      <label htmlFor="cf-message" className="sr-only" data-en>Your message</label>
      <textarea id="cf-message" name="message" required
        className="lang-placeholder" data-placeholder-fr="Votre message..." data-placeholder-en="Your message..." />

      <button type="submit" data-fr style={sent ? { background: "#2d8a4e" } : undefined}>
        {sent ? "Envoyé ✓" : status === "sending" ? "Envoi..." : "Envoyer le message →"}
      </button>
      <button type="submit" data-en style={sent ? { background: "#2d8a4e" } : undefined}>
        {sent ? "Sent ✓" : status === "sending" ? "Sending..." : "Send message →"}
      </button>
    </form>
  );
}
