"use client";

import { useState, useEffect } from "react";

interface TimerProps {
  totalMinutes: number;
  onTimeUp?: () => void;
}

export default function Timer({ totalMinutes, onTimeUp }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(totalMinutes * 60);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp?.();
      return;
    }
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, onTimeUp]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const isUrgent = secondsLeft < 300; // last 5 minutes

  return (
    <div className={`font-mono text-lg ${isUrgent ? "text-red-400 animate-pulse" : "text-gray-300"}`}>
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}
