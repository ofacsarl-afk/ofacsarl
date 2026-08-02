import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Racine du projet (évite l'avertissement « multiple lockfiles »)
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    // Autorise l'optimisation des images uploadées dans Supabase Storage
    remotePatterns: [{ protocol: "https", hostname: "**.supabase.co" }],
  },
};

export default nextConfig;
