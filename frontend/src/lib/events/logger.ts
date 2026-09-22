import { getSupabaseAdmin } from "@/lib/supabase/server";



export type EventType =
  
  | "auth.signup"
  | "auth.login.success"
  | "auth.login.failed"
  | "auth.logout"
  | "auth.password_change"
  | "auth.password_reset_request"
  | "auth.email_change"
  | "auth.google_start"
  | "auth.google_callback"
  | "auth.session_revoked"
  
  | "account.delete_requested"
  | "account.delete"
  
  | "data.progress_reset"
  | "data.portfolio_reset"
  | "data.memories_cleared"
  | "data.bookmarks_exported"
  
  | "rate_limit.hit"
  | "community.report_created"
  | "community.report_threshold_reached"
  | "admin.action"
  
  | "cron.events_pruned"
  | "system.error";

export type Severity = "info" | "warn" | "critical";

const SEVERITY_BY_TYPE: Partial<Record<EventType, Severity>> = {
  "auth.signup": "critical",
  "auth.login.success": "critical",
  "auth.login.failed": "warn",
  "auth.logout": "info",
  "auth.password_change": "critical",
  "auth.password_reset_request": "critical",
  "auth.email_change": "critical",
  "auth.google_start": "info",
  "auth.google_callback": "critical",
  "auth.session_revoked": "warn",
  "account.delete_requested": "critical",
  "account.delete": "critical",
  "data.progress_reset": "info",
  "data.portfolio_reset": "info",
  "data.memories_cleared": "info",
  "data.bookmarks_exported": "warn",
  "rate_limit.hit": "warn",
  "community.report_created": "warn",
  "community.report_threshold_reached": "critical",
  "admin.action": "critical",
  "cron.events_pruned": "info",
  "system.error": "warn",
};


const ALWAYS_RETAIN: EventType[] = [
  "auth.signup",
  "auth.password_change",
  "auth.email_change",
  "account.delete",
  "admin.action",
];

export type LogPayload = {
  userId?: string | null;
  eventType: EventType;
  severity?: Severity;
  metadata?: Record<string, unknown>;
  request?: Request;
};

function ipFromRequest(request?: Request): string | null {
  if (!request) return null;
  const h = request.headers;
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 64);
  return (h.get("x-real-ip") ?? h.get("cf-connecting-ip") ?? "").slice(0, 64) || null;
}

function uaFromRequest(request?: Request): string | null {
  if (!request) return null;
  return (request.headers.get("user-agent") ?? "").slice(0, 200) || null;
}


export function logEvent(payload: LogPayload): void {
  void (async () => {
    try {
      const sb = getSupabaseAdmin();
      if (!sb) return;

      const severity = payload.severity ?? SEVERITY_BY_TYPE[payload.eventType] ?? "info";
      const retainForever = ALWAYS_RETAIN.includes(payload.eventType);

      await sb.from("platform_events").insert({
        user_id: payload.userId ?? null,
        event_type: payload.eventType,
        severity,
        ip: ipFromRequest(payload.request),
        user_agent: uaFromRequest(payload.request),
        metadata: payload.metadata ?? null,
        retain_forever: retainForever,
      });
    } catch {
      
    }
  })();
}



export async function logEventSync(payload: LogPayload): Promise<void> {
  try {
    const sb = getSupabaseAdmin();
    if (!sb) return;
    const severity = payload.severity ?? SEVERITY_BY_TYPE[payload.eventType] ?? "info";
    const retainForever = ALWAYS_RETAIN.includes(payload.eventType);
    await sb.from("platform_events").insert({
      user_id: payload.userId ?? null,
      event_type: payload.eventType,
      severity,
      ip: ipFromRequest(payload.request),
      user_agent: uaFromRequest(payload.request),
      metadata: payload.metadata ?? null,
      retain_forever: retainForever,
    });
  } catch {
    
  }
}

export function severityFor(type: EventType): Severity {
  return SEVERITY_BY_TYPE[type] ?? "info";
}
