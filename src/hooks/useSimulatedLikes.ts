"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface LikeItem {
  id: string;
  x: number;
  size: number;
  color: string;
  duration: number;
}

const LIKE_COLORS = ["#ff6b6b", "#ff8787", "#fa5252", "#e64980", "#f06595", "#ff6b9d", "#c2255c"];

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function useSimulatedLikes(isActive: boolean) {
  const [likes, setLikes] = useState<LikeItem[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addLike = useCallback(() => {
    const like: LikeItem = {
      id: generateId(),
      x: 60 + Math.random() * 30,
      size: 20 + Math.random() * 20,
      color: LIKE_COLORS[Math.floor(Math.random() * LIKE_COLORS.length)],
      duration: 2 + Math.random() * 2,
    };

    setLikes((prev) => {
      const next = [...prev, like];
      return next.length > 30 ? next.slice(-30) : next;
    });

    // Remove after animation
    setTimeout(() => {
      setLikes((prev) => prev.filter((l) => l.id !== like.id));
    }, like.duration * 1000);

    const delay = 200 + Math.random() * 800;
    timeoutRef.current = setTimeout(addLike, delay);
  }, []);

  useEffect(() => {
    if (isActive) {
      timeoutRef.current = setTimeout(addLike, 500);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive, addLike]);

  return likes;
}
