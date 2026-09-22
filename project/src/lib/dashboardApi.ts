



import type { DashboardData } from "@/lib/dashboard/types";
import type { AuthUser } from "@/lib/authApi";

export async function getDashboardSummary(_user: AuthUser): Promise<DashboardData> {
  const res = await fetch("/api/dashboard", {
    method: "GET",
    cache: "no-store",
    credentials: "same-origin",
  });
  if (!res.ok) {
    throw new Error("Could not load dashboard.");
  }
  const data = (await res.json()) as { ok: boolean; data: DashboardData };
  if (!data.ok || !data.data) {
    throw new Error("Could not load dashboard.");
  }
  return data.data;
}
