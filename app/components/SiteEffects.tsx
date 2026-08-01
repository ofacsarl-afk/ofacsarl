"use client";

import { useEffect } from "react";

/**
 * Reproduit les interactions du site statique d'origine :
 * curseur personnalisé, classe "scrolled" de la nav, apparition au scroll,
 * compteurs animés et barres de progression d'impact.
 */
export default function SiteEffects() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const cursorRing = document.getElementById("cursorRing");

    const onMove = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;
      if (cursor) cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
      if (cursorRing) cursorRing.style.transform = `translate(${mx - 18}px, ${my - 18}px)`;
    };
    document.addEventListener("mousemove", onMove);

    const hoverEls = document.querySelectorAll(
      "a, button, .activity-card, .gallery-item, .contact-item"
    );
    const enter = () => {
      if (cursorRing) {
        cursorRing.style.width = "54px";
        cursorRing.style.height = "54px";
      }
    };
    const leave = () => {
      if (cursorRing) {
        cursorRing.style.width = "36px";
        cursorRing.style.height = "36px";
      }
    };
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    // Nav scrolled
    const navbar = document.getElementById("navbar");
    const onScroll = () => navbar?.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll);

    // Compteurs
    const startCounter = (el: HTMLElement) => {
      if (el.dataset.done) return;
      el.dataset.done = "true";
      const target = +(el.dataset.target || "0");
      const duration = 2000;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // Apparition au scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            e.target.querySelectorAll<HTMLElement>(".counter").forEach(startCounter);
            e.target
              .querySelectorAll<HTMLElement>(".impact-bar-fill")
              .forEach((bar) => {
                bar.style.width = (bar.dataset.width || "0") + "%";
              });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .impact-bar-section, .impact-stats")
      .forEach((el) => observer.observe(el));

    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
    </>
  );
}
