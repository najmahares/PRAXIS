import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAuthUserCached } from "@/lib/auth/userCache";
import type {
  CommunityPost,
  CommunityReply,
  ReactionKind,
} from "./types";

function colorFor(userId: string): string {
  const COLORS = ["#2563eb", "#0d9488", "#7c3aed", "#d97706", "#dc2626", "#15803d", "#0ea5e9", "#a855f7"];
  let h = 0;
  for (let i = 0; i < userId.length; i++) h = (h * 31 + userId.charCodeAt(i)) | 0;
  return COLORS[Math.abs(h) % COLORS.length];
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "PU";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return h;
}

export async function getAuthorForUser(userId: string) {
  const sb = getSupabaseAdmin();
  if (!sb) {
    return { name: "Praxis User", initials: "PU", color: colorFor(userId) };
  }

  
  try {
    const { data } = await sb
      .from("community_profiles")
      .select("display_name")
      .eq("user_id", userId)
      .maybeSingle();
    if (data?.display_name) {
      const name = String(data.display_name).trim();
      return { name, initials: initialsOf(name), color: colorFor(userId) };
    }
  } catch {
    
  }

  
  try {
    const { data } = await sb.auth.admin.getUserById(userId);
    const user = data?.user;
    const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
    const metaName =
      (meta.name as string | undefined) ||
      (meta.full_name as string | undefined) ||
      (meta.display_name as string | undefined);
    if (metaName && metaName.trim()) {
      const name = metaName.trim();
      return { name, initials: initialsOf(name), color: colorFor(userId) };
    }
    const email = user?.email;
    if (email) {
      const handle = email.split("@")[0];
      return {
        name: handle,
        initials: handle.slice(0, 2).toUpperCase(),
        color: colorFor(userId),
      };
    }
  } catch {
    
  }

  
  const suffix = Math.abs(hash(userId)).toString(36).toUpperCase().slice(0, 4).padStart(4, "0");
  const name = "Praxis User " + suffix;
  return { name, initials: "PU", color: colorFor(userId) };
}

function rowToPost(row: Record<string, unknown>, myReactions: ReactionKind[]): CommunityPost {
  return {
    id: String(row.id),
    author: {
      userId: String(row.user_id),
      name: String(row.author_name ?? "Unknown"),
      initials: String(row.author_initials ?? "?"),
      color: String(row.author_color ?? "#2563eb"),
      isOfficial: Boolean(row.is_official),
    },
    kind: row.kind as CommunityPost["kind"],
    title: String(row.title),
    body: String(row.body),
    tags: (row.tags as string[]) ?? [],
    isPinned: Boolean(row.is_pinned),
    replyCount: Number(row.reply_count ?? 0),
    helpfulCount: Number(row.helpful_count ?? 0),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    myReactions,
  };
}

function rowToReply(row: Record<string, unknown>, myReactions: ReactionKind[]): CommunityReply {
  return {
    id: String(row.id),
    postId: String(row.post_id),
    parentReplyId: row.parent_reply_id ? String(row.parent_reply_id) : null,
    author: {
      userId: String(row.user_id),
      name: String(row.author_name ?? "Unknown"),
      initials: String(row.author_initials ?? "?"),
      color: String(row.author_color ?? "#2563eb"),
      isOfficial: false,
    },
    body: String(row.body),
    helpfulCount: Number(row.helpful_count ?? 0),
    createdAt: String(row.created_at),
    myReactions,
  };
}

export async function listPosts(kind: string | null, userId: string | null): Promise<CommunityPost[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];

  let query = sb
    .from("community_posts")
    .select("*")
    .eq("flagged", false)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

  if (kind && kind !== "all") query = query.eq("kind", kind);

  const { data, error } = await query;
  if (error || !data) {
    console.error("[community] listPosts error:", error?.message);
    return [];
  }

  const myReactionsByTarget = new Map<string, ReactionKind[]>();
  if (userId) {
    const ids = (data as Array<{ id: string }>).map((r) => r.id);
    if (ids.length > 0) {
      const { data: reactions } = await sb
        .from("community_reactions")
        .select("target_id, kind")
        .eq("user_id", userId)
        .eq("target_type", "post")
        .in("target_id", ids);
      if (reactions) {
        for (const r of reactions as Array<{ target_id: string; kind: ReactionKind }>) {
          const arr = myReactionsByTarget.get(r.target_id) ?? [];
          arr.push(r.kind);
          myReactionsByTarget.set(r.target_id, arr);
        }
      }
    }
  }

  return (data as Array<Record<string, unknown>>).map((row) =>
    rowToPost(row, myReactionsByTarget.get(String(row.id)) ?? [])
  );
}

export async function getPost(postId: string, userId: string | null): Promise<CommunityPost | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data } = await sb
    .from("community_posts")
    .select("*")
    .eq("id", postId)
    .eq("flagged", false)
    .maybeSingle();
  if (!data) return null;

  let myReactions: ReactionKind[] = [];
  if (userId) {
    const { data: rs } = await sb
      .from("community_reactions")
      .select("kind")
      .eq("user_id", userId)
      .eq("target_type", "post")
      .eq("target_id", postId);
    if (rs) myReactions = (rs as Array<{ kind: ReactionKind }>).map((r) => r.kind);
  }
  return rowToPost(data as Record<string, unknown>, myReactions);
}

export async function listReplies(postId: string, userId: string | null): Promise<CommunityReply[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data } = await sb
    .from("community_replies")
    .select("*")
    .eq("post_id", postId)
    .eq("flagged", false)
    .order("created_at", { ascending: true })
    .limit(200);
  if (!data) return [];

  const myByTarget = new Map<string, ReactionKind[]>();
  if (userId) {
    const ids = (data as Array<{ id: string }>).map((r) => r.id);
    if (ids.length > 0) {
      const { data: rs } = await sb
        .from("community_reactions")
        .select("target_id, kind")
        .eq("user_id", userId)
        .eq("target_type", "reply")
        .in("target_id", ids);
      if (rs) {
        for (const r of rs as Array<{ target_id: string; kind: ReactionKind }>) {
          const arr = myByTarget.get(r.target_id) ?? [];
          arr.push(r.kind);
          myByTarget.set(r.target_id, arr);
        }
      }
    }
  }

  return (data as Array<Record<string, unknown>>).map((row) =>
    rowToReply(row, myByTarget.get(String(row.id)) ?? [])
  );
}
