"use client";

import type { GiftItem } from "@/hooks/useSimulatedGifts";

interface GiftOverlayProps {
  gifts: GiftItem[];
  isBilibili: boolean;
}

export default function GiftOverlay({ gifts, isBilibili }: GiftOverlayProps) {
  if (gifts.length === 0) return null;

  return (
    <div className="absolute top-12 left-4 z-30 flex flex-col gap-2 pointer-events-none">
      {gifts.map((gift) => (
        <div
          key={gift.id}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg animate-slideInRight shadow-lg ${
            isBilibili
              ? "bg-white/95 border border-pink-100"
              : "bg-[#1f1f23]/95 border border-[#9146ff]/30"
          }`}
          style={{ animationDuration: "0.4s" }}
        >
          <span className="text-2xl">{gift.icon}</span>
          <div>
            <div className={`text-xs font-medium ${isBilibili ? "text-pink-500" : "text-[#9146ff]"}`}>
              {gift.username}
            </div>
            <div className={`text-xs ${isBilibili ? "text-gray-600" : "text-[#efeff1]"}`}>
              sent <span className="font-medium">{gift.count}x {gift.giftName}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
