import { getSupabaseAdmin } from "@/lib/supabase/server";

export type { BookmarkRow } from "./bookmarks/types";
import type { BookmarkRow } from "./bookmarks/types";

export async function listBookmarks(userId: string): Promise<BookmarkRow[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data, error } = await sb
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as BookmarkRow[];
}

export async function addBookmark(
  userId: string,
  input: {
    target_type: "concept" | "company" | "scenario";
    target_id: string;
    title: string;
    description?: string | null;
    href: string;
  }
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { ok: false, error: "no_db" };
  const { data, error } = await sb
    .from("bookmarks")
    .upsert(
      {
        user_id: userId,
        target_type: input.target_type,
        target_id: input.target_id,
        title: input.title.slice(0, 200),
        description: input.description?.slice(0, 500) ?? null,
        href: input.href.slice(0, 500),
      },
      { onConflict: "user_id,target_type,target_id" }
    )
    .select("id")
    .maybeSingle();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: String(data?.id ?? "") };
}

export async function removeBookmark(
  userId: string,
  id: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { ok: false, error: "no_db" };
  const { error } = await sb
    .from("bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function removeBookmarkByTarget(
  userId: string,
  targetType: "concept" | "company" | "scenario",
  targetId: string
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { ok: false, error: "no_db" };
  const { error } = await sb
    .from("bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("target_type", targetType)
    .eq("target_id", targetId);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function isBookmarked(
  userId: string,
  targetType: "concept" | "company" | "scenario",
  targetId: string
): Promise<boolean> {
  const sb = getSupabaseAdmin();
  if (!sb) return false;
  const { data } = await sb
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .maybeSingle();
  return Boolean(data);
}
