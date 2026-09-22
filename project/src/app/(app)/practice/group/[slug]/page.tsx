import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { PRACTICE_CARDS, type PracticeCard, type CardType } from "@/lib/practice/cards";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import GroupClient from "./GroupClient";
import "../../practice.css";

export const dynamic = "force-dynamic";

function parseSlug(slug: string): { level: number; type: CardType } | null {
  const m = slug.match(/^(\d+)-(scenario|drill|mission)$/);
  if (!m) return null;
  return { level: parseInt(m[1], 10), type: m[2] as CardType };
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { level, type } = parsed;

  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);
  const sb = getSupabaseAdmin();

  const seed = PRACTICE_CARDS.filter((c) => c.level === level && c.type === type);
  let generated: PracticeCard[] = [];
  const completed = new Set<string>();

  if (userId && sb) {
    const [genRes, compRes] = await Promise.all([
      sb.from("practice_generated_cards")
        .select("payload")
        .eq("user_id", userId)
        .eq("level", level)
        .eq("card_type", type)
        .order("created_at", { ascending: true }),
      sb.from("practice_completed").select("card_id").eq("user_id", userId),
    ]);
    if (genRes.data) {
      generated = (genRes.data as Array<{ payload: PracticeCard }>).map((r) => r.payload);
    }
    if (compRes.data) {
      for (const r of compRes.data as Array<{ card_id: string }>) completed.add(r.card_id);
    }
  }

  const items = [...seed, ...generated];

  return (
    <GroupClient
      level={level}
      type={type}
      seed={seed}
      generatedCount={generated.length}
      initialItems={items}
      initialCompletedIds={[...completed]}
      isAuthed={Boolean(userId)}
    />
  );
}
