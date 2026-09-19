"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/hooks/useSimulatedChat";

interface ChatPanelProps {
  messages: ChatMessage[];
  isBilibili: boolean;
  formatTime: (date: Date) => string;
}

export default function ChatPanel({ messages, isBilibili, formatTime }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (isBilibili) {
    return (
      <div className="flex flex-col h-full bg-white border-l border-gray-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Chat ({messages.length})</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">🔥 Hot</span>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
          {messages.map((msg) => (
            <div key={msg.id} className="text-sm leading-relaxed animate-fadeIn">
              <span className="text-gray-400 text-xs mr-1">
                {formatTime(msg.timestamp)}
              </span>
              <span
                className="font-medium mr-1"
                style={{ color: msg.color }}
              >
                {msg.username}
              </span>
              <span className="text-gray-700">: {msg.message}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Say something..."
              className="flex-1 text-sm px-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-pink-300 bg-gray-50"
              readOnly
            />
            <button className="bg-pink-500 text-white text-sm px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#18181b] border-l border-[#2f2f35]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2f2f35] flex items-center justify-between">
        <span className="text-sm font-medium text-[#efeff1]">Stream Chat</span>
        <div className="flex items-center gap-2">
          <button className="text-[#adadb8] hover:text-white text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sub goal */}
      <div className="px-4 py-2 border-b border-[#2f2f35]">
        <div className="text-xs text-[#adadb8]">
          <span className="text-[#9146ff] font-medium">7 more new subs</span> to go!
        </div>
        <div className="mt-1 h-1.5 bg-[#2f2f35] rounded-full overflow-hidden">
          <div className="h-full bg-[#9146ff] rounded-full" style={{ width: "30%" }} />
        </div>
        <div className="text-xs text-[#85858e] mt-0.5">3/10 New Subs</div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm leading-relaxed animate-fadeIn">
            <span className="text-[#85858e] text-xs mr-1.5">
              {formatTime(msg.timestamp)}
            </span>
            <span className="inline-flex items-center gap-1 mr-1">
              <span className="w-4 h-4 rounded bg-purple-600 flex items-center justify-center text-[8px] text-white">
                ★
              </span>
            </span>
            <span
              className="font-semibold mr-1"
              style={{ color: msg.color }}
            >
              {msg.username}
            </span>
            <span className="text-[#efeff1]">: {msg.message}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-[#2f2f35]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm px-3 py-2 rounded bg-[#2f2f35] text-[#efeff1] placeholder-[#85858e] border border-[#3a3a3f] focus:outline-none focus:border-[#9146ff]"
            readOnly
          />
          <button className="bg-[#9146ff] text-white text-sm px-4 py-2 rounded hover:bg-[#7c3aed] transition-colors font-medium">
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}
