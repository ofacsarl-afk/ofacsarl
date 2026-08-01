import { getServerSupabase } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";
import PostsManager from "./PostsManager";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const sb = await getServerSupabase();
  let posts: Post[] = [];
  if (sb) {
    const { data } = await sb.from("posts").select("*").order("created_at", { ascending: false });
    posts = (data as Post[]) || [];
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 mb-1">Actualités &amp; Blog</h1>
      <p className="text-zinc-500 mb-6">Créez et publiez des articles. Les articles publiés apparaissent sur le site public.</p>
      <PostsManager posts={posts} />
    </div>
  );
}
