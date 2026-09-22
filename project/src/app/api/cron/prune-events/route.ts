import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { logEventSync } from "@/lib/events/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";



const RETENTION = {
  info: 90,      
  warn: 365,     
  critical: 1095 
};

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  const header = request.headers.get("authorization") ?? "";
  if (!secret || header !== "Bearer " + secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  const results: Record<string, number> = { info: 0, warn: 0, critical: 0 };
  const now = Date.now();

  for (const [severity, days] of Object.entries(RETENTION)) {
    const cutoff = new Date(now - days * 86400000).toISOString();
    const { count } = await sb
      .from("platform_events")
      .delete({ count: "exact" })
      .eq("severity", severity)
      .eq("retain_forever", false)
      .lt("created_at", cutoff);
    results[severity] = count ?? 0;
  }

  const totalPruned = results.info + results.warn + results.critical;

  await logEventSync({
    eventType: "cron.events_pruned",
    metadata: { ...results, total: totalPruned },
  });

  return NextResponse.json({ ok: true, pruned: results, total: totalPruned });
}
