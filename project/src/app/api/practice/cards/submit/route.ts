import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getCard } from "@/lib/practice/cards";
import { writeMemory } from "@/lib/practice/api";
import { createNotification } from "@/lib/notifications/server";

export const runtime = "nodejs";

type Body = {
  cardId?: string;
  choiceId?: string;
  response?: string;
};

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const cardId = typeof body.cardId === "string" ? body.cardId : "";
  if (!cardId) {
    return NextResponse.json({ ok: false, error: "missing_card_id" }, { status: 400 });
  }

  
  const seed = getCard(cardId);
  const cardType = seed?.type ?? "drill";
  const cardLevel = seed?.level ?? 0;
  const cardTitle = seed?.title ?? "generated card";

  let passed = false;
  if (cardType === "scenario") {
    const choice = seed?.choices?.find((c) => c.id === body.choiceId);
    passed = Boolean(choice?.best);
  } else if (cardType === "drill") {
    passed = Boolean(body.response && body.response.trim().length >= 20);
  } else {
    passed = true; 
  }

  
  try {
    const sb = getSupabaseAdmin();
    if (sb) {
      const { error } = await sb.from("practice_completed").upsert(
        {
          user_id: userId,
          card_id: cardId,
          card_type: cardType,
          response: body.response ?? null,
          choice_id: body.choiceId ?? null,
          passed,
        },
        { onConflict: "user_id,card_id" }
      );
      if (error) {
        console.error("[practice/cards/submit] upsert error:", error.message);
      }
    }
  } catch (err) {
    console.error("[practice/cards/submit] unexpected:", err);
  }

  
  try {
    const fact =
      "Completed a practice " +
      cardType +
      " for Level " +
      cardLevel +
      ": " +
      cardTitle +
      (passed ? ", passed." : ", reviewed.");
    await writeMemory(userId, fact, "practice");
  } catch {
    
  }

  
  try {
    if (cardType === "mission" && passed) {
      await createNotification(userId, {
        kind: "practice",
        title: "Mission complete",
        body: cardTitle + " is done. Well held.",
        href: "/practice",
      });
    }

    
    const sb = getSupabaseAdmin();
    if (sb) {
      const { count } = await sb
        .from("practice_completed")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);
      const n = count ?? 0;
      if (n === 1) {
        await createNotification(userId, {
          kind: "achievement",
          title: "First practice card complete",
          body: "You have started. Consistency matters more than the first card.",
          href: "/practice",
        });
      } else if (n === 25) {
        await createNotification(userId, {
          kind: "achievement",
          title: "25 practice cards complete",
          body: "You are building a habit. Open Progress to see your concept signals.",
          href: "/progress",
        });
      } else if (n === 100) {
        await createNotification(userId, {
          kind: "achievement",
          title: "100 practice cards complete",
          body: "That is a serious body of work. Check your dashboard.",
          href: "/dashboard",
        });
      }
    }
  } catch {
    
  }

  return NextResponse.json({ ok: true, passed });
}
