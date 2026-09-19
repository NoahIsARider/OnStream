"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TWITCH_USERNAMES, BILIBILI_USERNAMES, CHAT_MESSAGES, BILIBILI_MESSAGES } from "@/lib/simulatedData";

export interface DanmakuItem {
  id: string;
  text: string;
  username: string;
  y: number;
  speed: number;
  color: string;
  fontSize: number;
}

const DANMAKU_COLORS = [
  "#ffffff", "#ff6b6b", "#4dabf7", "#69db7c", "#ffd43b",
  "#ff8787", "#74c0fc", "#b197fc", "#ffa94d", "#20c997",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function useSimulatedDanmaku(isBilibili: boolean, isActive: boolean) {
  const [danmakus, setDanmakus] = useState<DanmakuItem[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const laneRef = useRef<number[]>([]);

  const addDanmaku = useCallback(() => {
    const usernames = isBilibili ? BILIBILI_USERNAMES : TWITCH_USERNAMES;
    const msgs = isBilibili ? BILIBILI_MESSAGES : CHAT_MESSAGES;

    // Find available lane (0-12)
    const lanes = laneRef.current;
    let lane = 0;
    for (let i = 0; i < 12; i++) {
      if (!lanes[i] || Date.now() - lanes[i] > 2000) {
        lane = i;
        break;
      }
    }

    const item: DanmakuItem = {
      id: generateId(),
      text: randomItem(msgs),
      username: randomItem(usernames),
      y: 5 + lane * 7.5,
      speed: 6 + Math.random() * 6,
      color: DANMAKU_COLORS[Math.floor(Math.random() * DANMAKU_COLORS.length)],
      fontSize: 14 + Math.floor(Math.random() * 6),
    };

    lanes[lane] = Date.now();

    setDanmakus((prev) => {
      const next = [...prev, item];
      return next.length > 40 ? next.slice(-40) : next;
    });

    setTimeout(() => {
      setDanmakus((prev) => prev.filter((d) => d.id !== item.id));
    }, item.speed * 1000);

    const delay = isBilibili ? 300 + Math.random() * 1500 : 800 + Math.random() * 2000;
    timeoutRef.current = setTimeout(addDanmaku, delay);
  }, [isBilibili]);

  useEffect(() => {
    if (isActive) {
      // Initial batch
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const usernames = isBilibili ? BILIBILI_USERNAMES : TWITCH_USERNAMES;
          const msgs = isBilibili ? BILIBILI_MESSAGES : CHAT_MESSAGES;
          const lane = i % 12;
          const item: DanmakuItem = {
            id: generateId(),
            text: randomItem(msgs),
            username: randomItem(usernames),
            y: 5 + lane * 7.5,
            speed: 6 + Math.random() * 6,
            color: DANMAKU_COLORS[Math.floor(Math.random() * DANMAKU_COLORS.length)],
            fontSize: 14 + Math.floor(Math.random() * 6),
          };
          setDanmakus((prev) => [...prev, item]);
          setTimeout(() => {
            setDanmakus((prev) => prev.filter((d) => d.id !== item.id));
          }, item.speed * 1000);
        }, i * 400);
      }
      timeoutRef.current = setTimeout(addDanmaku, 2000);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive, addDanmaku, isBilibili]);

  return danmakus;
}
