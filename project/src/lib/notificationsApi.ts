import type { AppNotification } from "@/lib/notificationsMock";
import { fetchBootstrap } from "@/lib/authApi";

export async function getNotifications(): Promise<AppNotification[]> {
  try {
    const res = await fetch("/api/notifications", {
      credentials: "same-origin",
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      ok: boolean;
      notifications: AppNotification[];
    };
    return data.notifications ?? [];
  } catch {
    return [];
  }
}


export async function getUnreadCount(): Promise<number> {
  const payload = await fetchBootstrap();
  return payload.unreadCount;
}

export async function markAllAsRead(): Promise<void> {
  try {
    await fetch("/api/notifications/read", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
  } catch {
    
  }
}

export async function markAsRead(id: string): Promise<void> {
  try {
    await fetch("/api/notifications/read", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  } catch {
    
  }
}
