"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  TWITCH_USERNAMES,
  BILIBILI_USERNAMES,
  CHAT_MESSAGES,
  BILIBILI_MESSAGES,
} from "@/lib/simulatedData";

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  color: string;
  isBilibili: boolean;
}

const USERNAME_COLORS = [
  "#ff6b6b", "#ffa94d", "#ffd43b", "#69db7c", "#4dabf7",
  "#9775fa", "#f06595", "#20c997", "#ff8787", "#74c0fc",
  "#b197fc", "#63e6be", "#ffa8a8", "#a9e34b", "#fcc419",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomColor(): string {
  return USERNAME_COLORS[Math.floor(Math.random() * USERNAME_COLORS.length)];
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function useSimulatedChat(isBilibili: boolean, isActive: boolean) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addMessage = useCallback(() => {
    const usernames = isBilibili ? BILIBILI_USERNAMES : TWITCH_USERNAMES;
    const msgs = isBilibili ? BILIBILI_MESSAGES : CHAT_MESSAGES;

    const msg: ChatMessage = {
      id: generateId(),
      username: randomItem(usernames),
      message: randomItem(msgs),
      timestamp: new Date(),
      color: randomColor(),
      isBilibili,
    };

    setMessages((prev) => {
      const next = [...prev, msg];
      return next.length > 80 ? next.slice(-80) : next;
    });

    const delay = isBilibili
      ? 800 + Math.random() * 2000
      : 500 + Math.random() * 3000;
    timeoutRef.current = setTimeout(addMessage, delay);
  }, [isBilibili]);

  useEffect(() => {
    if (isActive) {
      // Add initial batch
      const initialCount = isBilibili ? 5 : 8;
      for (let i = 0; i < initialCount; i++) {
        const usernames = isBilibili ? BILIBILI_USERNAMES : TWITCH_USERNAMES;
        const msgs = isBilibili ? BILIBILI_MESSAGES : CHAT_MESSAGES;
        const msg: ChatMessage = {
          id: generateId(),
          username: randomItem(usernames),
          message: randomItem(msgs),
          timestamp: new Date(Date.now() - (initialCount - i) * 30000),
          color: randomColor(),
          isBilibili,
        };
        setMessages((prev) => [...prev, msg]);
      }
      timeoutRef.current = setTimeout(addMessage, 1000 + Math.random() * 2000);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive, addMessage, isBilibili]);

  return { messages, formatTime };
}
