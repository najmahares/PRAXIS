export type PostKind = "discussion" | "question" | "win" | "challenge";
export type ReactionKind = "helpful" | "agree" | "respect";

export type CommunityAuthor = {
  userId: string;
  name: string;
  initials: string;
  color: string;
  isOfficial: boolean;
};

export type CommunityPost = {
  id: string;
  author: CommunityAuthor;
  kind: PostKind;
  title: string;
  body: string;
  tags: string[];
  isPinned: boolean;
  replyCount: number;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  myReactions: ReactionKind[];
};

export type CommunityReply = {
  id: string;
  postId: string;
  parentReplyId: string | null;
  author: CommunityAuthor;
  body: string;
  helpfulCount: number;
  createdAt: string;
  myReactions: ReactionKind[];
};

export const KIND_LABELS: Record<PostKind, string> = {
  discussion: "Discussion",
  question: "Question",
  win: "Win",
  challenge: "Challenge",
};

export const REACTION_LABELS: Record<ReactionKind, string> = {
  helpful: "Helpful",
  agree: "Agree",
  respect: "Respect",
};


export const REACTION_ICONS: Record<ReactionKind, string> = {
  helpful: "\u{1F44D}",
  agree: "\u{1F4AF}",
  respect: "\u{1F64C}",
};

export const KIND_ICONS: Record<PostKind, string> = {
  discussion: "\u{1F4AC}",
  question: "\u2753",
  win: "\u{1F3C6}",
  challenge: "\u{1F3AF}",
};
