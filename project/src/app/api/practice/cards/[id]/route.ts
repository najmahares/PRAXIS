import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getCard, type PracticeCard } from "@/lib/practice/cards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  
  const seed = getCard(id);
  if (seed) return NextResponse.json({ ok: true, card: seed });

  
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  const { data } = await sb
    .from("practice_generated_cards")
    .select("payload")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (!data?.payload) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, card: data.payload as PracticeCard });
}
