import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { isAdminUser } from "@/lib/community/admin";
import { getCachedUser } from "@/lib/auth/server";
import AdminSidebar from "./AdminSidebar";
import "./admin-shell.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin · PRAXIS" };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);

  if (!userId) redirect("/login?next=/admin");
  if (!(await isAdminUser(userId))) redirect("/dashboard");

  const admin = await getCachedUser(userId).catch(() => null);
  const name = admin?.name ?? "";
  const email = admin?.email ?? "";

  return (
    <div className="praxis-adminshell">
      <AdminSidebar adminName={name} adminEmail={email} />
      <main className="praxis-adminmain">
        <div className="praxis-admincontent">{children}</div>
      </main>
    </div>
  );
}
