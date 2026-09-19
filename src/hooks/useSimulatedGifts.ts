"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GIFTS, BILIBILI_GIFTS, TWITCH_USERNAMES, BILIBILI_USERNAMES } from "@/lib/simulatedData";

export interface GiftItem {
  id: string;
  username: string;
  giftName: string;
  icon: string;
  value: number;
  color: string;
  count: number;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function useSimulatedGifts(isBilibili: boolean, isActive: boolean) {
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addGift = useCallback(() => {
    const giftList = isBilibili ? BILIBILI_GIFTS : GIFTS;
    const usernames = isBilibili ? BILIBILI_USERNAMES : TWITCH_USERNAMES;
    const gift = randomItem(giftList);

    const item: GiftItem = {
      id: generateId(),
      username: randomItem(usernames),
      giftName: gift.name,
      icon: gift.icon,
      value: gift.value,
      color: gift.color,
      count: Math.floor(Math.random() * 10) + 1,
    };

    setGifts((prev) => {
      const next = [...prev, item];
      return next.length > 5 ? next.slice(-5) : next;
    });

    setTimeout(() => {
      setGifts((prev) => prev.filter((g) => g.id !== item.id));
    }, 4000);

    const delay = 8000 + Math.random() * 20000;
    timeoutRef.current = setTimeout(addGift, delay);
  }, [isBilibili]);

  useEffect(() => {
    if (isActive) {
      timeoutRef.current = setTimeout(addGift, 3000 + Math.random() * 5000);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive, addGift]);

  return gifts;
}
