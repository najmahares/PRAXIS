import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { getPost, listReplies } from "@/lib/community/server";
import PostDetail from "./PostDetail";
import "../community.css";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);

  const post = await getPost(postId, userId);
  if (!post) notFound();

  const replies = await listReplies(postId, userId);

  return (
    <PostDetail
      post={post}
      initialReplies={replies}
      isAuthed={Boolean(userId)}
      currentUserId={userId ?? null}
    />
  );
}
