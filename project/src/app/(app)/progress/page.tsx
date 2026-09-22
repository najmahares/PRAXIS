import { getServerProgress } from "@/lib/progress/data";
import ProgressClient from "./ProgressClient";
import "./progress.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Progress" };

export default async function ProgressPage() {
  const snapshot = await getServerProgress();
  return <ProgressClient initial={snapshot} />;
}
