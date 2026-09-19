"use client";

import type { LikeItem } from "@/hooks/useSimulatedLikes";

interface LikesOverlayProps {
  likes: LikeItem[];
  isBilibili: boolean;
}

export default function LikesOverlay({ likes, isBilibili }: LikesOverlayProps) {
  return (
    <div className="absolute bottom-16 right-4 pointer-events-none z-20 flex flex-col items-end gap-1">
      {likes.map((like) => (
        <div
          key={like.id}
          className="animate-float-up"
          style={{
            animationDuration: `${like.duration}s`,
          }}
        >
          <svg
            width={like.size}
            height={like.size}
            viewBox="0 0 24 24"
            fill={like.color}
            style={{
              filter: `drop-shadow(0 2px 4px ${like.color}40)`,
            }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      ))}

      {/* Like counter */}
      <div className={`mt-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
        isBilibili ? "bg-white/90 text-gray-600" : "bg-black/60 text-white"
      }`}>
        <span>❤️</span>
        <span className="font-medium">{Math.floor(1000 + Math.random() * 9000)}</span>
      </div>
    </div>
  );
}
