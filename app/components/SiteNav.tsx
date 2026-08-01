"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", fr: "À Propos", en: "About" },
  { href: "#activities", fr: "Activités", en: "Activities" },
  { href: "#impact", fr: "Impact", en: "Impact" },
  { href: "#gallery", fr: "Galerie", en: "Gallery" },
  { href: "#actualites", fr: "Actualités", en: "News" },
  { href: "#partenaires", fr: "Partenaires", en: "Partners" },
  { href: "#reconnaissances", fr: "Reconnaissances", en: "Awards" },
  { href: "#contact", fr: "Contact", en: "Contact" },
];

function updatePlaceholders(lang: "fr" | "en") {
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(".lang-placeholder").forEach((el) => {
    const ph = el.dataset[lang === "fr" ? "placeholderFr" : "placeholderEn"];
    if (ph) el.placeholder = ph;
  });
}

export default function SiteNav({ logo }: { logo: string }) {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.remove("fr", "en");
    document.body.classList.add(lang);
    updatePlaceholders(lang);
  }, [lang]);

  return (
    <>
      {/* MENU MOBILE */}
      <div className={"mobile-menu" + (mobileOpen ? " open" : "")} id="mobileMenu">
        <span className="mobile-close" onClick={() => setMobileOpen(false)}>
          ✕
        </span>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>
            {lang === "fr" ? l.fr : l.en}
          </a>
        ))}
      </div>

      {/* NAV */}
      <nav id="navbar">
        <div className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="OFAC Logo" style={{ height: 48, width: "auto", objectFit: "contain" }} />
        </div>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{lang === "fr" ? l.fr : l.en}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <div style={{ display: "flex", gap: 6 }}>
            <button className={"lang-btn" + (lang === "fr" ? " active" : "")} onClick={() => setLang("fr")}>
              <span>FR</span>
            </button>
            <button className={"lang-btn" + (lang === "en" ? " active" : "")} onClick={() => setLang("en")}>
              <span>EN</span>
            </button>
          </div>
          <a href="#contact" className="nav-cta">
            {lang === "fr" ? "DEMANDER UN DEVIS" : "Contact Us"}
          </a>
          <div className="hamburger" onClick={() => setMobileOpen(true)}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>
    </>
  );
}
