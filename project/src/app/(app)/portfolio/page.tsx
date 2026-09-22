import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { buildPortfolioView } from "@/lib/practice/api";
import { getKenyaIndex } from "@/lib/market/mcp";
import PracticeClient from "./PracticeClient";
import "./practice.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Portfolio" };

export default async function PortfolioPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);

  if (!userId) {
    
    redirect("/login?next=/portfolio");
  }

  const [view, index] = await Promise.all([
    buildPortfolioView(userId).catch(() => null),
    getKenyaIndex().catch(() => null),
  ]);

  
  if (!view) {
    redirect("/portfolio/setup");
  }

  return <PracticeClient initialView={view} nasiChangePct={index?.changePct ?? null} />;
}
