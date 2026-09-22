import { cookies } from "next/headers";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { PRACTICE_CARDS, type PracticeCard } from "@/lib/practice/cards";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import PracticeLibrary from "./PracticeLibrary";
import "./practice.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Practice" };

export default async function PracticePage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);
  const sb = getSupabaseAdmin();

  let completedIds: string[] = [];
  let generated: PracticeCard[] = [];

  if (userId && sb) {
    const [completedRes, generatedRes] = await Promise.all([
      sb.from("practice_completed").select("card_id").eq("user_id", userId),
      sb.from("practice_generated_cards")
        .select("payload")
        .eq("user_id", userId)
        .order("created_at", { ascending: true }),
    ]);
    if (completedRes.data) {
      completedIds = (completedRes.data as Array<{ card_id: string }>).map((r) => r.card_id);
    }
    if (generatedRes.data) {
      generated = (generatedRes.data as Array<{ payload: PracticeCard }>).map((r) => r.payload);
    }
  }

  const allCards = [...PRACTICE_CARDS, ...generated];

  return <PracticeLibrary cards={allCards} completedIds={completedIds} />;
}
