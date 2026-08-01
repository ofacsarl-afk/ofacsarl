import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Racine du projet (évite l'avertissement « multiple lockfiles »)
  turbopack: { root: __dirname },
};

export default nextConfig;
