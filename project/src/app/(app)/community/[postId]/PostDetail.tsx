"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CommunityPost, CommunityReply, ReactionKind } from "@/lib/community/types";
import { KIND_LABELS, KIND_ICONS, REACTION_ICONS, REACTION_LABELS } from "@/lib/community/types";
import ReportDialog from "../ReportDialog";
import PostMenu, { type MenuAction } from "../PostMenu";
import EditPostDialog from "../EditPostDialog";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import "../community.css";
import Arrow from "@/components/ui/Arrow";

export default function PostDetail({
  post,
  initialReplies,
  isAuthed,
  currentUserId,
}: {
  post: CommunityPost;
  initialReplies: CommunityReply[];
  isAuthed: boolean;
  currentUserId: string | null;
}) {
  const router = useRouter();
  const [replies, setReplies] = useState<CommunityReply[]>(initialReplies);
  const [reportTarget, setReportTarget] = useState<{ type: "post" | "reply"; id: string; label: string } | null>(null);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editingReply, setEditingReply] = useState<CommunityReply | null>(null);
  const [deletingReply, setDeletingReply] = useState<CommunityReply | null>(null);
  const [postReactions, setPostReactions] = useState<ReactionKind[]>(post.myReactions);
  const [helpfulCount, setHelpfulCount] = useState(post.helpfulCount);

  const isOwnPost = currentUserId !== null && post.author.userId === currentUserId;
  const postDisplayName = isOwnPost ? "You" : post.author.name;

  const topLevel = replies.filter((r) => !r.parentReplyId);
  const childrenOf = (id: string) => replies.filter((r) => r.parentReplyId === id);

  function handlePostMenu(action: MenuAction) {
    if (action === "edit") setEditing(true);
    else if (action === "delete") setDeleting(true);
    else setReportTarget({ type: "post", id: post.id, label: post.title });
  }

  function handleReplyMenu(reply: CommunityReply, action: MenuAction) {
    if (action === "edit") setEditingReply(reply);
    else if (action === "delete") setDeletingReply(reply);
    else setReportTarget({ type: "reply", id: reply.id, label: reply.body.slice(0, 60) });
  }

  async function performReplyDelete() {
    if (!deletingReply) return;
    await fetch("/api/community/replies/" + deletingReply.id, { method: "DELETE" });
    setReplies((prev) => prev.filter((r) => r.id !== deletingReply.id));
    setDeletingReply(null);
  }

  async function performReplyEdit(replyId: string, newBody: string) {
    const res = await fetch("/api/community/replies/" + replyId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: newBody }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error ?? "Could not save");
    setReplies((prev) =>
      prev.map((r) => (r.id === replyId ? { ...r, body: newBody } : r))
    );
    setEditingReply(null);
  }

  async function performDelete() {
    await fetch("/api/community/posts/" + post.id, { method: "DELETE" });
    router.push("/community");
    router.refresh();
  }

  async function togglePostReaction(kind: ReactionKind) {
    if (!isAuthed) return;
    const had = postReactions.includes(kind);
    setPostReactions(had ? postReactions.filter((k) => k !== kind) : [...postReactions, kind]);
    if (kind === "helpful") setHelpfulCount((h) => Math.max(0, h + (had ? -1 : 1)));
    try {
      await fetch("/api/community/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType: "post", targetId: post.id, kind }),
      });
    } catch {  }
  }

  return (
    <div className="praxis-community-detail">
      <Link href="/community" className="praxis-community-back">
        <Arrow size={14} direction="left" />
        <span>Back to community</span>
      </Link>

      <article className="praxis-community-detail-post">
        <div className="praxis-community-post-topline">
          <div className="praxis-community-post-head">
            <span className="praxis-community-avatar" style={{ background: post.author.color }} aria-hidden="true">
              {post.author.initials}
            </span>
            <div className="praxis-community-post-meta">
              <span className="praxis-community-post-author">
                {postDisplayName}
                {post.author.isOfficial ? <span className="praxis-community-post-official">PRAXIS</span> : null}
              </span>
              <span className="praxis-community-post-time">{new Date(post.createdAt).toLocaleString("en-KE")}</span>
            </div>
            <span className={"praxis-community-post-kind is-" + post.kind}>
              <span aria-hidden="true">{KIND_ICONS[post.kind]}</span>
              <span>{KIND_LABELS[post.kind]}</span>
            </span>
          </div>
          {isAuthed ? <PostMenu isOwn={isOwnPost} onAction={handlePostMenu} /> : null}
        </div>

        <h1 className="praxis-community-detail-title">{post.title}</h1>
        <div className="praxis-community-detail-body">{post.body}</div>

        <div className="praxis-community-post-foot">
          <div className="praxis-community-reactions">
            {(["helpful", "agree", "respect"] as ReactionKind[]).map((k) => (
              <button
                key={k}
                type="button"
                className={"praxis-community-reaction" + (postReactions.includes(k) ? " is-active" : "")}
                onClick={() => togglePostReaction(k)}
                disabled={!isAuthed}
                aria-label={REACTION_LABELS[k]}
                title={REACTION_LABELS[k]}
              >
                <span className="praxis-community-reaction-icon" aria-hidden="true">{REACTION_ICONS[k]}</span>
                {k === "helpful" && helpfulCount > 0 ? (
                  <span className="praxis-community-reaction-count">{helpfulCount}</span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </article>

      <section className="praxis-community-replies">
        <h2 className="praxis-community-replies-title">
          {replies.length} {replies.length === 1 ? "reply" : "replies"}
        </h2>

        {isOwnPost ? (
          <p className="praxis-community-own-note">
            This is your post. You can edit or delete it, but you cannot reply to it.
          </p>
        ) : !isAuthed ? (
          <Link href={"/login?next=/community/" + post.id} className="praxis-practice-primary">
            Sign in to reply
          </Link>
        ) : (
          <ReplyComposer postId={post.id} onPosted={(r) => setReplies((prev) => [...prev, r])} />
        )}

        {topLevel.length === 0 ? (
          <p className="praxis-community-empty-body">No replies yet.</p>
        ) : (
          <ul className="praxis-community-reply-tree">
            {topLevel.map((r) => (
              <ReplyNode
                key={r.id}
                reply={r}
                childrenOf={childrenOf}
                currentUserId={currentUserId}
                isAuthed={isAuthed}
                postId={post.id}
                onAddReply={(nr) => setReplies((prev) => [...prev, nr])}
                onReport={(id, label) => setReportTarget({ type: "reply", id, label })}
                onMenuAction={handleReplyMenu}
                depth={0}
              />
            ))}
          </ul>
        )}
      </section>

      {reportTarget ? (
        <ReportDialog
          targetType={reportTarget.type}
          targetId={reportTarget.id}
          targetLabel={reportTarget.label}
          onClose={() => setReportTarget(null)}
          onSubmitted={() => setReportTarget(null)}
        />
      ) : null}

      {editing ? (
        <EditPostDialog
          postId={post.id}
          initialTitle={post.title}
          initialBody={post.body}
          onClose={() => setEditing(false)}
          onSaved={() => { setEditing(false); router.refresh(); }}
        />
      ) : null}

      {deleting ? (
        <ConfirmDeleteDialog
          label="post"
          onCancel={() => setDeleting(false)}
          onConfirm={performDelete}
        />
      ) : null}

      {deletingReply ? (
        <ConfirmDeleteDialog
          label="reply"
          onCancel={() => setDeletingReply(null)}
          onConfirm={performReplyDelete}
        />
      ) : null}

      {editingReply ? (
        <ReplyEditDialog
          initial={editingReply.body}
          onClose={() => setEditingReply(null)}
          onSave={(next) => performReplyEdit(editingReply.id, next)}
        />
      ) : null}
    </div>
  );
}

function ReplyEditDialog({
  initial,
  onClose,
  onSave,
}: {
  initial: string;
  onClose: () => void;
  onSave: (next: string) => Promise<void>;
}) {
  const [body, setBody] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setBusy(true);
    setError(null);
    try {
      await onSave(body.trim());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="praxis-community-modal-backdrop" onClick={onClose}>
      <div className="praxis-community-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="praxis-community-modal-head">
          <h2 className="praxis-community-modal-title">Edit reply</h2>
          <button type="button" className="praxis-community-modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className="praxis-community-modal-body">
          <label className="praxis-community-field">
            <span>Reply</span>
            <textarea
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={4000}
            />
          </label>
          {error ? <p className="praxis-community-error">{error}</p> : null}
        </div>
        <footer className="praxis-community-modal-foot">
          <button type="button" className="praxis-practice-secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="praxis-practice-primary" onClick={save} disabled={busy || body.trim().length < 2}>{busy ? "Saving…" : "Save"}</button>
        </footer>
      </div>
    </div>
  );
}

function ReplyNode({
  reply,
  childrenOf,
  currentUserId,
  isAuthed,
  postId,
  onAddReply,
  onReport,
  onMenuAction,
  depth,
}: {
  reply: CommunityReply;
  childrenOf: (id: string) => CommunityReply[];
  currentUserId: string | null;
  isAuthed: boolean;
  postId: string;
  onAddReply: (r: CommunityReply) => void;
  onReport: (id: string, label: string) => void;
  onMenuAction: (reply: CommunityReply, action: MenuAction) => void;
  depth: number;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const isOwn = currentUserId !== null && reply.author.userId === currentUserId;
  const displayName = isOwn ? "You" : reply.author.name;
  const children = childrenOf(reply.id);
  const visualDepth = Math.min(depth, 2);

  return (
    <li className={"praxis-community-reply-node depth-" + visualDepth}>
      <div className="praxis-community-reply">
        <span className="praxis-community-avatar is-small" style={{ background: reply.author.color }} aria-hidden="true">
          {reply.author.initials}
        </span>
        <div className="praxis-community-reply-main">
          <div className="praxis-community-reply-meta">
            <span className="praxis-community-post-author">{displayName}</span>
            <span className="praxis-community-post-time">{relative(reply.createdAt)}</span>
          </div>
          <p className="praxis-community-reply-body">{reply.body}</p>

          {isAuthed ? (
            <div className="praxis-community-reply-actions">
              {!isOwn ? (
                <button
                  type="button"
                  className="praxis-community-reply-action"
                  onClick={() => setReplyOpen((o) => !o)}
                >
                  {replyOpen ? "Cancel" : "Reply"}
                </button>
              ) : null}
              <PostMenu isOwn={isOwn} onAction={(action) => onMenuAction(reply, action)} />
            </div>
          ) : null}

          {replyOpen ? (
            <ReplyComposer
              postId={postId}
              parentReplyId={reply.id}
              onPosted={(nr) => {
                onAddReply(nr);
                setReplyOpen(false);
              }}
              onCancel={() => setReplyOpen(false)}
              compact
            />
          ) : null}
        </div>
      </div>

      {children.length > 0 ? (
        <ul className="praxis-community-reply-children">
          {children.map((c) => (
            <ReplyNode
              key={c.id}
              reply={c}
              childrenOf={childrenOf}
              currentUserId={currentUserId}
              isAuthed={isAuthed}
              postId={postId}
              onAddReply={onAddReply}
              onReport={onReport}
              onMenuAction={onMenuAction}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function ReplyComposer({
  postId,
  parentReplyId,
  onPosted,
  onCancel,
  compact,
}: {
  postId: string;
  parentReplyId?: string;
  onPosted: (r: CommunityReply) => void;
  onCancel?: () => void;
  compact?: boolean;
}) {
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (body.trim().length < 2) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/community/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, parentReplyId: parentReplyId ?? null, body }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Could not reply.");
        return;
      }
      const created: CommunityReply = {
        id: String(data.id ?? "local-" + Date.now()),
        postId,
        parentReplyId: parentReplyId ?? null,
        author: {
          userId: "me",
          name: String(data.authorName ?? "You"),
          initials: String(data.authorInitials ?? "Y"),
          color: String(data.authorColor ?? "#2563eb"),
          isOfficial: false,
        },
        body: body.trim(),
        helpfulCount: 0,
        createdAt: new Date().toISOString(),
        myReactions: [],
      };
      onPosted(created);
      setBody("");
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={"praxis-community-composer" + (compact ? " is-compact" : "")}>
      <textarea
        rows={compact ? 2 : 3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a reply…"
        className="praxis-community-reply-input"
      />
      {error ? <p className="praxis-community-error">{error}</p> : null}
      <div className="praxis-community-composer-actions">
        {onCancel ? (
          <button type="button" className="praxis-practice-secondary" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button
          type="button"
          className="praxis-practice-primary"
          onClick={submit}
          disabled={busy || body.trim().length < 2}
        >
          {busy ? "Posting…" : "Reply"}
        </button>
      </div>
    </div>
  );
}

function relative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  const days = Math.floor(hrs / 24);
  if (days < 30) return days + "d ago";
  return Math.floor(days / 30) + "mo ago";
}
