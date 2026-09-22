import { cookies } from "next/headers";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { listPosts } from "@/lib/community/server";
import CommunityFeed from "./CommunityFeed";
import "./community.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Community" };

export default async function CommunityPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);
  const posts = await listPosts("all", userId);
  return (
    <CommunityFeed
      initialPosts={posts}
      isAuthed={Boolean(userId)}
      currentUserId={userId ?? null}
    />
  );
}
