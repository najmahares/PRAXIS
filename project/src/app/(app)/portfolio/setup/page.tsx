import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { getPortfolio } from "@/lib/practice/api";
import SetupClient from "./SetupClient";
import "../practice.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Set up portfolio" };

export default async function SetupPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);

  if (!userId) {
    redirect("/login?next=/portfolio/setup");
  }

  const existing = await getPortfolio(userId).catch(() => null);
  if (existing) {
    redirect("/portfolio");
  }

  return <SetupClient />;
}
