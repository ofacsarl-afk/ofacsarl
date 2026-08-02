import "@/app/ofac.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteNav from "@/app/components/SiteNav";
import { getPostBySlug, getSectionImages } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article — OFAC" };
  return {
    title: `${post.title_fr} — OFAC`,
    description: post.excerpt_fr || undefined,
    openGraph: {
      title: post.title_fr,
      description: post.excerpt_fr || undefined,
      images: post.cover_url ? [post.cover_url] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, images] = await Promise.all([getPostBySlug(slug), getSectionImages()]);
  if (!post) notFound();

  return (
    <>
      <SiteNav logo={images.logo} />
      <article style={{ maxWidth: 820, margin: "0 auto", padding: "140px 24px 80px" }}>
        <Link href="/#actualites" style={{ color: "var(--red)", fontWeight: 700, textDecoration: "none" }}>← Retour</Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.05, margin: "20px 0 8px", color: "var(--white)" }}>
          <span data-fr>{post.title_fr}</span>
          <span data-en>{post.title_en || post.title_fr}</span>
        </h1>
        {post.published_at && (
          <p style={{ color: "var(--gray)", marginBottom: 24 }}>
            {new Date(post.published_at).toLocaleDateString("fr-FR", { dateStyle: "long" })}
          </p>
        )}
        {post.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_url} alt={post.title_fr} style={{ width: "100%", borderRadius: 16, marginBottom: 28 }} />
        )}
        <div style={{ color: "var(--light-gray)", fontSize: 18, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
          <div data-fr>{post.body_fr}</div>
          <div data-en>{post.body_en || post.body_fr}</div>
        </div>
      </article>
    </>
  );
}
