

export type BookmarkRow = {
  id: string;
  user_id: string;
  target_type: "concept" | "company" | "scenario";
  target_id: string;
  title: string;
  description: string | null;
  href: string;
  created_at: string;
};
