export type Message = {
  id: string;
  name: string;
  email: string;
  type: string | null;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  created_at: string;
};

export type Post = {
  id: string;
  slug: string;
  title_fr: string;
  title_en: string | null;
  excerpt_fr: string | null;
  excerpt_en: string | null;
  body_fr: string | null;
  body_en: string | null;
  cover_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type GalleryItem = {
  id: string;
  image_url: string;
  caption_fr: string | null;
  caption_en: string | null;
  sort_order: number;
  created_at: string;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  url: string | null;
  sort_order: number;
  created_at: string;
};

export type ImpactStat = {
  key: string;
  value: number;
  unit: string;
  label_fr: string;
  label_en: string;
};

export type SectionImages = Record<string, string>;

export type Recognition = {
  icon: string; // classe FontAwesome, ex. "fa-award"
  year: string;
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
};
