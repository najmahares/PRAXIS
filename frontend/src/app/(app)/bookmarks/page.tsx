import { cookies } from "next/headers";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { listBookmarks, type BookmarkRow } from "@/lib/bookmarks-server";
import BookmarksClient from "./BookmarksClient";
import "./bookmarks.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Bookmarks" };

export default async function BookmarksPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);

  const bookmarks: BookmarkRow[] = userId ? await listBookmarks(userId) : [];

  return <BookmarksClient initialBookmarks={bookmarks} isAuthed={Boolean(userId)} />;
}
