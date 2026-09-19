"use client";

import type { DanmakuItem } from "@/hooks/useSimulatedDanmaku";

interface DanmakuOverlayProps {
  danmakus: DanmakuItem[];
  isBilibili: boolean;
}

export default function DanmakuOverlay({ danmakus, isBilibili }: DanmakuOverlayProps) {
  if (!isBilibili) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {danmakus.map((d) => (
        <div
          key={d.id}
          className="absolute whitespace-nowrap animate-danmaku"
          style={{
            top: `${d.y}%`,
            color: d.color,
            fontSize: `${d.fontSize}px`,
            textShadow: "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8)",
            animationDuration: `${d.speed}s`,
            fontWeight: 500,
          }}
        >
          {d.text}
        </div>
      ))}
    </div>
  );
}
