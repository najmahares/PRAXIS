import { getSupabaseAdmin } from "@/lib/supabase/server";

export type NotificationKind =
  | "mentor"
  | "community"
  | "practice"
  | "achievement"
  | "system";

export type AppNotification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  href: string | null;
  read: boolean;
  createdAt: number;
};

type NotificationRow = {
  id: string;
  user_id: string;
  kind: NotificationKind;
  title: string;
  body: string | null;
  href: string | null;
  read: boolean;
  created_at: string;
};

function rowToNotification(row: NotificationRow): AppNotification {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    body: row.body ?? "",
    href: row.href,
    read: row.read,
    createdAt: new Date(row.created_at).getTime(),
  };
}

export async function listNotifications(
  userId: string,
  limit = 50
): Promise<AppNotification[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data, error } = await sb
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return (data as NotificationRow[]).map(rowToNotification);
}

export async function unreadCount(userId: string): Promise<number> {
  const sb = getSupabaseAdmin();
  if (!sb) return 0;
  const { count } = await sb
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false);
  return count ?? 0;
}

export async function markAllRead(userId: string): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("read", false);
}

export async function markOneRead(
  userId: string,
  id: string
): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("id", id);
}

export async function createNotification(
  userId: string,
  input: {
    kind: NotificationKind;
    title: string;
    body?: string;
    href?: string;
  }
): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb.from("notifications").insert({
    user_id: userId,
    kind: input.kind,
    title: input.title.slice(0, 200),
    body: input.body?.slice(0, 600) ?? null,
    href: input.href?.slice(0, 500) ?? null,
  });
}
