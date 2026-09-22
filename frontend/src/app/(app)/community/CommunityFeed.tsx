"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CommunityPost, PostKind, ReactionKind } from "@/lib/community/types";
import { KIND_LABELS, REACTION_LABELS, KIND_ICONS, REACTION_ICONS } from "@/lib/community/types";
import Compose from "./Compose";
import ReportDialog from "./ReportDialog";
import PostMenu, { type MenuAction } from "./PostMenu";
import EditPostDialog from "./EditPostDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import "./community.css";

const FILTERS: { id: "all" | PostKind; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "🌐" },
  { id: "discussion", label: "Discussions", icon: KIND_ICONS.discussion },
  { id: "question", label: "Questions", icon: KIND_ICONS.question },
  { id: "win", label: "Wins", icon: KIND_ICONS.win },
  { id: "challenge", label: "Challenges", icon: KIND_ICONS.challenge },
];

export default function CommunityFeed({
  initialPosts,
  isAuthed,
  currentUserId,
}: {
  initialPosts: CommunityPost[];
  isAuthed: boolean;
  currentUserId: string | null;
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | PostKind>("all");
  const [composeOpen, setComposeOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ type: "post" | "reply"; id: string; title: string } | null>(null);
  const [editing, setEditing] = useState<CommunityPost | null>(null);
  const [deleting, setDeleting] = useState<CommunityPost | null>(null);

  const visible = filter === "all" ? initialPosts : initialPosts.filter((p) => p.kind === filter);

  async function handleMenu(post: CommunityPost, action: MenuAction) {
    if (action === "edit") setEditing(post);
    else if (action === "delete") setDeleting(post);
    else setReportTarget({ type: "post", id: post.id, title: post.title });
  }

  async function performDelete(post: CommunityPost) {
    await fetch("/api/community/posts/" + post.id, { method: "DELETE" });
    setDeleting(null);
    router.refresh();
  }

  return (
    <div className="praxis-community">
      <header className="praxis-community-header">
        <div>
          <span className="praxis-community-kicker">Community</span>
          <h1 className="praxis-community-title">Learn in the open</h1>
          <p className="praxis-community-sub">
            Questions, wins, and the trades that taught you something. This is a
            learning space, not investment advice. Never share money with anyone
            you meet here.
          </p>
        </div>
        {isAuthed ? (
          <button type="button" className="praxis-community-compose-btn" onClick={() => setComposeOpen(true)}>
            Start a post
          </button>
        ) : (
          <Link href="/login?next=/community" className="praxis-community-compose-btn">
            Sign in to post
          </Link>
        )}
      </header>

      <nav className="praxis-community-filters" aria-label="Filter">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={"praxis-community-chip" + (filter === f.id ? " is-active" : "")}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            <span className="praxis-community-chip-icon" aria-hidden="true">{f.icon}</span>
            {f.label}
          </button>
        ))}
      </nav>

      {visible.length === 0 ? (
        <div className="praxis-community-empty">
          <h2 className="praxis-community-empty-title">Nothing here yet.</h2>
          <p className="praxis-community-empty-body">
            {isAuthed ? "Start a post and get the conversation going." : "Sign in to start the first conversation."}
          </p>
        </div>
      ) : (
        <ul className="praxis-community-feed">
          {visible.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isAuthed={isAuthed}
              currentUserId={currentUserId}
              onMenuAction={(action) => handleMenu(post, action)}
            />
          ))}
        </ul>
      )}

      {composeOpen ? (
        <Compose onClose={() => setComposeOpen(false)} onPosted={() => { setComposeOpen(false); router.refresh(); }} />
      ) : null}

      {reportTarget ? (
        <ReportDialog
          targetType={reportTarget.type}
          targetId={reportTarget.id}
          targetLabel={reportTarget.title}
          onClose={() => setReportTarget(null)}
          onSubmitted={() => setReportTarget(null)}
        />
      ) : null}

      {editing ? (
        <EditPostDialog
          postId={editing.id}
          initialTitle={editing.title}
          initialBody={editing.body}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); router.refresh(); }}
        />
      ) : null}

      {deleting ? (
        <ConfirmDeleteDialog
          label="post"
          onCancel={() => setDeleting(null)}
          onConfirm={() => performDelete(deleting)}
        />
      ) : null}
    </div>
  );
}

function PostCard({
  post,
  isAuthed,
  currentUserId,
  onMenuAction,
}: {
  post: CommunityPost;
  isAuthed: boolean;
  currentUserId: string | null;
  onMenuAction: (action: MenuAction) => void;
}) {
  const [reactions, setReactions] = useState<ReactionKind[]>(post.myReactions);
  const [helpful, setHelpful] = useState(post.helpfulCount);

  const isOwn = currentUserId !== null && post.author.userId === currentUserId;
  const displayName = isOwn ? "You" : post.author.name;

  async function toggle(kind: ReactionKind) {
    if (!isAuthed) return;
    const had = reactions.includes(kind);
    setReactions(had ? reactions.filter((r) => r !== kind) : [...reactions, kind]);
    setHelpful((h) => Math.max(0, h + (had ? -1 : 1)));
    try {
      await fetch("/api/community/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetType: "post", targetId: post.id, kind }),
      });
    } catch {  }
  }

  return (
    <li className="praxis-community-post">
      <div className="praxis-community-post-inner">
        <div className="praxis-community-post-topline">
          <Link href={"/community/" + post.id} className="praxis-community-post-link">
            <div className="praxis-community-post-head">
              <span className="praxis-community-avatar" style={{ background: post.author.color }} aria-hidden="true">
                {post.author.initials}
              </span>
              <div className="praxis-community-post-meta">
                <span className="praxis-community-post-author">
                  {displayName}
                  {post.author.isOfficial ? <span className="praxis-community-post-official">PRAXIS</span> : null}
                </span>
                <span className="praxis-community-post-time">{relative(post.createdAt)}</span>
              </div>
              <span className={"praxis-community-post-kind is-" + post.kind}>
                <span aria-hidden="true">{KIND_ICONS[post.kind]}</span>
                <span>{KIND_LABELS[post.kind]}</span>
              </span>
              {post.isPinned ? <span className="praxis-community-post-pin">Pinned</span> : null}
            </div>
            <h3 className="praxis-community-post-title">{post.title}</h3>
            <p className="praxis-community-post-body">{post.body}</p>
          </Link>
          {isAuthed ? (
            <PostMenu isOwn={isOwn} onAction={onMenuAction} />
          ) : null}
        </div>

        <div className="praxis-community-post-foot">
          <div className="praxis-community-reactions">
            {(["helpful", "agree", "respect"] as ReactionKind[]).map((k) => {
              const active = reactions.includes(k);
              return (
                <button
                  key={k}
                  type="button"
                  className={"praxis-community-reaction" + (active ? " is-active" : "")}
                  onClick={() => toggle(k)}
                  disabled={!isAuthed}
                  aria-label={REACTION_LABELS[k]}
                  title={REACTION_LABELS[k]}
                >
                  <span className="praxis-community-reaction-icon" aria-hidden="true">
                    {REACTION_ICONS[k]}
                  </span>
                  {k === "helpful" && helpful > 0 ? (
                    <span className="praxis-community-reaction-count">{helpful}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <div className="praxis-community-post-meta-right">
            {isOwn ? (
              <span className="praxis-community-post-stat-grey">
                {post.replyCount === 0
                  ? "No replies yet"
                  : post.replyCount + " " + (post.replyCount === 1 ? "reply" : "replies")}
              </span>
            ) : (
              <Link href={"/community/" + post.id} className="praxis-community-reply-link">
                {post.replyCount === 0
                  ? "Reply"
                  : post.replyCount + " " + (post.replyCount === 1 ? "reply" : "replies")}
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
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
