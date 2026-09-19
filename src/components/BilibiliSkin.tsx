"use client";

import { CHANNEL_NAMES, STREAM_TITLES } from "@/lib/simulatedData";

interface BilibiliSkinProps {
  children: React.ReactNode;
  chatPanel: React.ReactNode;
  streamTitle: string;
  viewerCount: number;
  onStartCamera: () => void;
  onStartScreen: () => void;
  onStopStream: () => void;
  isStreaming: boolean;
  showCamera: boolean;
  showScreen: boolean;
}

export default function BilibiliSkin({
  children,
  chatPanel,
  streamTitle,
  viewerCount,
  onStartCamera,
  onStartScreen,
  onStopStream,
  isStreaming,
  showCamera,
  showScreen,
}: BilibiliSkinProps) {
  const channelName = CHANNEL_NAMES[0];

  return (
    <div className="h-screen flex flex-col bg-[#f4f5f7] text-[#212121] overflow-hidden">
      {/* Top Nav */}
      <nav className="h-12 bg-white border-b border-gray-200 flex items-center px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-2 mr-6">
          <span className="text-xl font-bold text-[#fb7299]">bilibili</span>
          <span className="text-sm text-gray-500">Live</span>
        </div>
        <div className="flex items-center gap-5 text-sm">
          <span className="text-[#212121] font-medium cursor-pointer">Home</span>
          <span className="text-[#fb7299] font-medium cursor-pointer border-b-2 border-[#fb7299] pb-3 -mb-3.5">Live</span>
          <span className="text-gray-500 cursor-pointer hover:text-gray-700">Games</span>
          <span className="text-gray-500 cursor-pointer hover:text-gray-700">Entertainment</span>
          <span className="text-gray-500 cursor-pointer hover:text-gray-700">Music</span>
          <span className="text-gray-500 cursor-pointer hover:text-gray-700">More</span>
        </div>
        <div className="flex-1 max-w-sm mx-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search live streams"
              className="w-full bg-gray-100 text-sm text-gray-700 placeholder-gray-400 rounded-full px-4 py-1.5 border border-gray-200 focus:outline-none focus:border-[#fb7299]"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="bg-[#fb7299] text-white text-sm px-4 py-1.5 rounded-full hover:bg-[#fc8bab] transition-colors font-medium">
            Go Live
          </button>
          <div className="w-8 h-8 rounded-full bg-[#fb7299]/20 flex items-center justify-center text-[#fb7299] text-sm font-bold">
            U
          </div>
        </div>
      </nav>

      {/* Main body: video + chat side by side */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left: video area */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Stream Header */}
          <div className="bg-white px-4 py-2 border-b border-gray-100 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white text-base font-bold">
                    {channelName[0]}
                  </div>
                  {isStreaming && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-[#212121] truncate">{channelName}</h2>
                  <p className="text-xs text-gray-500 truncate">{streamTitle}</p>
                </div>
                <span className="text-xs bg-pink-50 text-[#fb7299] px-2 py-0.5 rounded-full shrink-0">Lv.18</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>️</span>
                  <span>{viewerCount.toLocaleString()}</span>
                </div>
                <button className="text-xs text-gray-500 hover:text-[#fb7299] transition-colors flex items-center gap-1">
                  <span>❤️</span>
                  <span>Follow</span>
                </button>
                {!isStreaming ? (
                  <>
                    <button
                      onClick={onStartCamera}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        showCamera
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-[#fb7299] text-white hover:bg-[#fc8bab]"
                      }`}
                    >
                      {showCamera ? "Stop Camera" : "Start Camera"}
                    </button>
                    <button
                      onClick={onStartScreen}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        showScreen
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {showScreen ? "Stop Share" : "Share Screen"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onStopStream}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-all"
                  >
                    End Stream
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Video Area - fixed aspect ratio container */}
          <div className="flex-1 relative bg-black min-h-0">
            {children}
          </div>

          {/* Bottom gift bar */}
          <div className="bg-white border-t border-gray-100 px-4 py-2 shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto">
              {[" Gift", "❤️ Like", "⭐ Fan", "🎯 Mission", "🏆 Rank", "💎 Premium"].map((item) => (
                <button
                  key={item}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 text-xs text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Right: Chat Panel - always visible, fixed width */}
        <div className="w-72 shrink-0 border-l border-gray-200 flex flex-col min-h-0">
          {chatPanel}
        </div>
      </div>
    </div>
  );
}
