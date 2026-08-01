import type { Metadata } from "next";
import "./ofac.css";

const SITE_URL = "https://www.ofac-rdc.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "OFAC — Once For All Company | Recyclage plastique & pavés écologiques",
  description:
    "OFAC recycle les déchets plastiques pour produire des pavés écologiques durables à Bukavu, RDC. Impact environnemental, création d'emplois et économie verte en Afrique.",
  keywords: [
    "OFAC", "recyclage plastique", "pavés écologiques", "environnement",
    "Afrique", "RDC", "Bukavu", "plastic recycling", "eco-paving",
  ],
  authors: [{ name: "ONCE FOR ALL COMPANY SARL" }],
  icons: { icon: "/images/logo_ofac.jpg", apple: "/images/logo_ofac.jpg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "OFAC — Once For All Company",
    title: "OFAC — Transformer les déchets plastiques en pavés écologiques",
    description:
      "OFAC recycle le plastique pour produire des pavés écologiques durables à Bukavu, RDC.",
    images: ["/images/about_main.jpg"],
    url: SITE_URL,
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "OFAC — Transformer les déchets plastiques en pavés écologiques",
    description: "OFAC recycle le plastique pour produire des pavés écologiques durables à Bukavu, RDC.",
    images: ["/images/about_main.jpg"],
  },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ONCE FOR ALL COMPANY SARL",
  alternateName: "OFAC",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo_ofac.jpg`,
  description: "OFAC recycle les déchets plastiques pour produire des pavés écologiques durables à Bukavu, en RDC.",
  email: "onceforallcompanysarl@gmail.com",
  founder: { "@type": "Person", name: "Baraka Biringanine Joëlle" },
  foundingDate: "2020",
  address: { "@type": "PostalAddress", addressLocality: "Bukavu", addressRegion: "Sud-Kivu", addressCountry: "CD" },
  areaServed: "CD",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61559867910546",
    "https://www.instagram.com/__onceforallcompany",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#c1121f" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,600;0,700;1,300&family=Barlow+Condensed:wght@400;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }} />
      </head>
      <body className="fr">{children}</body>
    </html>
  );
}
