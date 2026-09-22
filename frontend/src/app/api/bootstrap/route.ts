import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getCachedUser } from "@/lib/auth/server";
import { unreadCount } from "@/lib/notifications/server";
import { listCompletedLessonIds } from "@/lib/lesson-progress/server";
import { adminEmailList } from "@/lib/community/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";




export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);

  if (!userId) {
    return NextResponse.json({
      ok: true,
      user: null,
      unreadCount: 0,
      completedLessons: [],
    });
  }

  const [user, count, lessons] = await Promise.all([
    getCachedUser(userId).catch(() => null),
    unreadCount(userId).catch(() => 0),
    listCompletedLessonIds(userId).catch(() => [] as string[]),
  ]);

  const adminEmails = adminEmailList();
  const isAdmin = user?.email ? adminEmails.includes(user.email.toLowerCase()) : false;

  return NextResponse.json({
    ok: true,
    user: user ? { id: user.id, name: user.name, email: user.email } : null,
    unreadCount: count,
    completedLessons: lessons,
    isAdmin,
  });
}
