"use client";

import { useEffect, useState } from "react";

export default function AdminTopbar({ crumb }: { crumb: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-KE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="praxis-admintopbar">
      <div className="praxis-admintopbar-crumb">
        <span>Admin</span>
        <span style={{ color: "#cbd5e1" }}>/</span>
        <strong>{crumb}</strong>
      </div>
      <div className="praxis-admintopbar-spacer" />
      <span className="praxis-admintopbar-pill praxis-admintopbar-pill-live">Live</span>
      <span className="praxis-admintopbar-time">{time}</span>
    </div>
  );
}
