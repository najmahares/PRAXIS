"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TourModal, { markTourSeen } from "@/components/dashboard/TourModal";
import { fetchBootstrap } from "@/lib/authApi";

export default function OnboardingPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchBootstrap().then((p) => {
      if (cancelled) return;
      if (!p.user) {
        router.replace("/login?next=/onboarding");
        return;
      }
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  function handleFinish() {
    markTourSeen();
    router.replace("/dashboard");
  }

  
  
  if (!ready) {
    return <div className="praxis-onboarding-blank" />;
  }

  return <TourModal open={true} onClose={handleFinish} />;
}
