import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getCard as getSeedCard, PRACTICE_CARDS, type PracticeCard } from "@/lib/practice/cards";
import CardRunner from "./CardRunner";
import "../practice.css";

export const dynamic = "force-dynamic";

async function resolveCard(id: string, userId: string | null): Promise<PracticeCard | null> {
  const seed = getSeedCard(id);
  if (seed) return seed;
  if (!userId) return null;
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data } = await sb
    .from("practice_generated_cards")
    .select("payload")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();
  if (!data?.payload) return null;
  return data.payload as PracticeCard;
}

export default async function CardPage({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const { cardId } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);

  const card = await resolveCard(cardId, userId);
  if (!card) notFound();

  
  const sb = getSupabaseAdmin();
  let generated: PracticeCard[] = [];
  if (userId && sb) {
    const { data } = await sb
      .from("practice_generated_cards")
      .select("payload")
      .eq("user_id", userId)
      .eq("level", card.level)
      .eq("card_type", card.type)
      .order("created_at", { ascending: true });
    if (data) {
      generated = (data as Array<{ payload: PracticeCard }>).map((r) => r.payload);
    }
  }
  const seedGroup = PRACTICE_CARDS.filter((c) => c.level === card.level && c.type === card.type);
  const all = [...seedGroup, ...generated];
  const idx = all.findIndex((c) => c.id === cardId);
  const next = idx >= 0 ? all[idx + 1] ?? null : null;

  let existing: { passed: boolean; response: string | null; choiceId: string | null } | null = null;
  if (userId && sb) {
    const { data } = await sb
      .from("practice_completed")
      .select("passed, response, choice_id")
      .eq("user_id", userId)
      .eq("card_id", cardId)
      .maybeSingle();
    if (data) {
      existing = {
        passed: Boolean(data.passed),
        response: (data.response as string | null) ?? null,
        choiceId: (data.choice_id as string | null) ?? null,
      };
    }
  }

  return (
    <CardRunner
      card={card}
      existing={existing}
      nextCardId={next?.id ?? null}
      nextCardTitle={next?.title ?? null}
    />
  );
}
