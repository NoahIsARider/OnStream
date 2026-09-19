"use client";

import { CHANNEL_NAMES, STREAM_TITLES, TAGS } from "@/lib/simulatedData";

interface TwitchSkinProps {
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

export default function TwitchSkin({
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
}: TwitchSkinProps) {
  const channelName = CHANNEL_NAMES[0];
  const tags = TAGS.slice(0, 6);

  return (
    <div className="h-screen flex flex-col bg-[#0e0e10] text-[#efeff1] overflow-hidden">
      {/* Top Nav */}
      <nav className="h-12 bg-[#18181b] border-b border-[#2f2f35] flex items-center px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#9146ff">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
            </svg>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#efeff1] font-medium">Following</span>
            <span className="text-[#adadb8] hover:text-white cursor-pointer">Browse</span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#2f2f35] text-sm text-[#efeff1] placeholder-[#85858e] rounded-md px-3 py-1.5 border border-[#3a3a3f] focus:outline-none focus:border-[#9146ff]"
            />
            <svg className="absolute right-2 top-1.5 text-[#85858e]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-[#adadb8] hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-[#9146ff] flex items-center justify-center text-white text-sm font-bold">
            U
          </div>
        </div>
      </nav>

      {/* Main body: sidebar + video + chat */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Left Sidebar */}
        <aside className="w-56 bg-[#1f1f23] border-r border-[#2f2f35] overflow-y-auto shrink-0 hidden lg:block">
          <div className="p-3">
            <div className="text-xs font-semibold text-[#efeff1] uppercase tracking-wider mb-2">For You</div>
            <div className="mb-4">
              <div className="text-xs text-[#85858e] mb-1 font-medium">Followed Channels</div>
              {["MarvelRivals", "Fortnite"].map((ch) => (
                <div key={ch} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#2f2f35] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                      {ch[0]}
                    </div>
                    <div>
                      <div className="text-sm text-[#efeff1]">{ch}</div>
                      <div className="text-xs text-[#85858e]">Offline</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs text-[#85858e] mb-1 font-medium">Live Channels</div>
              {["antaresgalax", "microwave_oven2", "PinkPandaBubblez", "BocaBola", "neko_sompi"].map((ch, i) => (
                <div key={ch} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-[#2f2f35] cursor-pointer">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-purple-700 flex items-center justify-center text-xs text-white shrink-0">
                      {ch[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-[#efeff1] truncate">{ch}</div>
                      <div className="text-xs text-[#85858e]">Just Chatting</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-xs text-[#efeff1]">{[2, 5, 8, "1.3K", 4][i]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center: video + stream info */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Video Area */}
          <div className="flex-1 relative bg-black min-h-0">
            {children}
          </div>

          {/* Stream Info */}
          <div className="bg-[#18181b] border-t border-[#2f2f35] px-4 py-3 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#9146ff] flex items-center justify-center text-white text-lg font-bold">
                    {channelName[0]}
                  </div>
                  {isStreaming && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      LIVE
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-[#efeff1]">{channelName}</h2>
                  <p className="text-xs text-[#efeff1] mt-0.5 truncate">{streamTitle}</p>
                  <p className="text-xs text-[#9146ff] mt-0.5">Just Chatting</p>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[#2f2f35] text-[#adadb8] hover:bg-[#3a3a3f] cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 text-xs text-[#adadb8] mr-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{viewerCount.toLocaleString()}</span>
                </div>
                {!isStreaming ? (
                  <>
                    <button
                      onClick={onStartCamera}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        showCamera
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-[#9146ff] text-white hover:bg-[#7c3aed]"
                      }`}
                    >
                      {showCamera ? "Stop Camera" : "Go Live"}
                    </button>
                    <button
                      onClick={onStartScreen}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        showScreen
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-[#2f2f35] text-[#efeff1] hover:bg-[#3a3a3f]"
                      }`}
                    >
                      {showScreen ? "Stop Share" : "Share Screen"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onStopStream}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-all"
                  >
                    End Stream
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Right: Chat Panel - always visible */}
        <div className="w-72 shrink-0 flex flex-col min-h-0">
          {chatPanel}
        </div>
      </div>
    </div>
  );
}
