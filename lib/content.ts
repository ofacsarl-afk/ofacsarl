import { getServerSupabase } from "@/lib/supabase/server";
import type {
  GalleryItem,
  ImpactStat,
  Partner,
  Post,
  SectionImages,
} from "@/lib/types";

/* ---------------------------------------------------------------
   Valeurs par défaut = contenu du site statique d'origine.
   Utilisées tant que Supabase n'est pas configuré / vide, pour que
   le site reste identique et fonctionnel.
---------------------------------------------------------------- */

export const DEFAULT_IMPACT: ImpactStat[] = [
  { key: "plastic", value: 10, unit: "T+", label_fr: "Plastique recyclé", label_en: "Plastic recycled" },
  { key: "jobs", value: 26, unit: "", label_fr: "Emplois créés", label_en: "Jobs created" },
  { key: "pavers", value: 10700, unit: "", label_fr: "Pavés produits", label_en: "Paving stones produced" },
  { key: "revenue", value: 9000, unit: "$", label_fr: "USD générés", label_en: "USD generated" },
];

export const DEFAULT_SECTION_IMAGES: SectionImages = {
  logo: "/images/logo_ofac.jpg",
  hero: "/images/about_main.jpg",
  about_main: "/images/about_main.jpg",
  about_overlay: "/images/about_overlay.jpg",
  founder: "/images/Founder.jpg",
};

export const DEFAULT_GALLERY: Pick<GalleryItem, "image_url" | "caption_fr" | "caption_en">[] = [
  { image_url: "/images/terrain3.jpg", caption_fr: "L'équipe OFAC réunie lors d'une séance pratique de transformation des déchets plastiques", caption_en: "OFAC team gathered during a hands-on plastic waste transformation session" },
  { image_url: "/images/terrain_2.jpg", caption_fr: "Fusion des bouteilles plastiques dans un fût chauffé pour la production de pavés", caption_en: "Melting plastic bottles in a heated drum for paving stone production" },
  { image_url: "/images/terrain_1.jpg", caption_fr: "Inspection des pavés écologiques fraîchement produits à partir de plastique recyclé", caption_en: "Inspection of freshly produced eco-paving stones made from recycled plastic" },
  { image_url: "/images/FABRICATION_1.jpg", caption_fr: "Visite de terrain — les membres de l'équipe portent les casques OFAC lors d'une démonstration", caption_en: "Field visit — team members wearing OFAC helmets during a live demonstration" },
  { image_url: "/images/gallery5.jpg", caption_fr: "Brassage du plastique en fusion — un technicien OFAC guide les participants au processus", caption_en: "Stirring molten plastic — an OFAC technician guides participants through the process" },
  { image_url: "/images/gallery6.jpg", caption_fr: "Un formateur OFAC démontre le brassage du plastique en fusion devant les participants", caption_en: "An OFAC trainer demonstrates stirring molten plastic in front of participants" },
  { image_url: "/images/gallery7.jpg", caption_fr: "Supervision technique par l'équipe OFAC en gilets fluorescents et casques de sécurité", caption_en: "Technical supervision by the OFAC team in high-vis vests and safety helmets" },
  { image_url: "/images/gallery8.jpg", caption_fr: "Vue d'ensemble du processus de fonte — un groupe observe attentivement la cuisson des plastiques", caption_en: "Overview of the melting process — a group closely observes the heating of plastics" },
  { image_url: "/images/gallery9.jpg", caption_fr: "Allumage du feu de chauffe — étape initiale du processus de recyclage des plastiques en pavés", caption_en: "Lighting the heating fire — the initial step in recycling plastics into paving stones" },
];

export const DEFAULT_PARTNERS: Pick<Partner, "name" | "logo_url" | "url">[] = [
  { name: "Fondation Femmes Sublimées", logo_url: "/images/fondation.jpg", url: null },
  { name: "CYNESA RDC", logo_url: "/images/cynesa.webp", url: null },
  { name: "FabLab Eco Déchets UEA", logo_url: "/images/FABLABECODECHETUEA.jpg", url: null },
  { name: "Congolese Discovery", logo_url: "/images/congolesediscovery.jpg", url: null },
  { name: "Solidarité Juridique", logo_url: "/images/logo-sol.jpg", url: null },
  { name: "Wakisha Connect", logo_url: null, url: null },
  { name: "Club ESE", logo_url: "/images/club-ses.jpg", url: null },
];

/* ---------------------------------------------------------------
   Fetchers — Supabase si disponible, sinon valeurs par défaut.
---------------------------------------------------------------- */

export async function getImpactStats(): Promise<ImpactStat[]> {
  const sb = await getServerSupabase();
  if (!sb) return DEFAULT_IMPACT;
  const { data } = await sb.from("site_settings").select("value").eq("key", "impact_stats").single();
  const arr = data?.value as ImpactStat[] | undefined;
  return Array.isArray(arr) && arr.length ? arr : DEFAULT_IMPACT;
}

export async function getSectionImages(): Promise<SectionImages> {
  const sb = await getServerSupabase();
  if (!sb) return DEFAULT_SECTION_IMAGES;
  const { data } = await sb.from("site_settings").select("value").eq("key", "section_images").single();
  const obj = data?.value as SectionImages | undefined;
  return { ...DEFAULT_SECTION_IMAGES, ...(obj || {}) };
}

export async function getGallery() {
  const sb = await getServerSupabase();
  if (!sb) return DEFAULT_GALLERY;
  const { data } = await sb.from("gallery_items").select("*").order("sort_order", { ascending: true });
  return data && data.length ? (data as GalleryItem[]) : DEFAULT_GALLERY;
}

export async function getPartners() {
  const sb = await getServerSupabase();
  if (!sb) return DEFAULT_PARTNERS;
  const { data } = await sb.from("partners").select("*").order("sort_order", { ascending: true });
  return data && data.length ? (data as Partner[]) : DEFAULT_PARTNERS;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const sb = await getServerSupabase();
  if (!sb) return [];
  const { data } = await sb
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });
  return (data as Post[]) || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const sb = await getServerSupabase();
  if (!sb) return null;
  const { data } = await sb.from("posts").select("*").eq("slug", slug).eq("published", true).single();
  return (data as Post) || null;
}
