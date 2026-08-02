import "../globals.css";
import { getServerSupabase } from "@/lib/supabase/server";
import AdminShell from "./AdminShell";

export const metadata = { title: "Admin — OFAC" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const sb = await getServerSupabase();
  const { data } = sb ? await sb.auth.getUser() : { data: { user: null } };
  const user = data?.user;

  // Page de login : rendue sans le cadre admin.
  if (!user) {
    return <div className="min-h-screen bg-[#f5f5f4]">{children}</div>;
  }

  return <AdminShell email={user.email || ""}>{children}</AdminShell>;
}
