import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OFAC — Once For All Company",
    short_name: "OFAC",
    description:
      "OFAC recycle les déchets plastiques en pavés écologiques durables à Bukavu, RDC.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#c1121f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
