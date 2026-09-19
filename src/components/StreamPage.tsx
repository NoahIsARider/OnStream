"use client";

import { useState, useCallback } from "react";
import VideoFeed from "@/components/VideoFeed";
import ChatPanel from "@/components/ChatPanel";
import DanmakuOverlay from "@/components/DanmakuOverlay";
import LikesOverlay from "@/components/LikesOverlay";
import GiftOverlay from "@/components/GiftOverlay";
import FilterPanel from "@/components/FilterPanel";
import PomodoroTimer from "@/components/PomodoroTimer";
import TwitchSkin from "@/components/TwitchSkin";
import BilibiliSkin from "@/components/BilibiliSkin";
import { usePomodoro } from "@/hooks/usePomodoro";
import { useSimulatedChat } from "@/hooks/useSimulatedChat";
import { useSimulatedLikes } from "@/hooks/useSimulatedLikes";
import { useSimulatedGifts } from "@/hooks/useSimulatedGifts";
import { useSimulatedDanmaku } from "@/hooks/useSimulatedDanmaku";
import { STREAM_TITLES } from "@/lib/simulatedData";

interface StreamPageProps {
  skin: "twitch" | "bilibili";
  onBack: () => void;
}

export default function StreamPage({ skin, onBack }: StreamPageProps) {
  const isBilibili = skin === "bilibili";
  const [showCamera, setShowCamera] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [filterId, setFilterId] = useState("none");
  const [stickers, setStickers] = useState<string[]>([]);
  const [showControls, setShowControls] = useState(true);

  const pomodoro = usePomodoro();
  const { messages, formatTime } = useSimulatedChat(isBilibili, showCamera || showScreen);
  const likes = useSimulatedLikes(showCamera || showScreen);
  const gifts = useSimulatedGifts(isBilibili, showCamera || showScreen);
  const danmakus = useSimulatedDanmaku(isBilibili, showCamera || showScreen);

  const isStreaming = showCamera || showScreen;
  const streamTitle = STREAM_TITLES[0];
  const viewerCount = Math.floor(1200 + Math.random() * 800);

  const handleStartCamera = useCallback(() => {
    setShowCamera(true);
    setShowScreen(false);
  }, []);

  const handleStartScreen = useCallback(() => {
    setShowScreen(true);
    setShowCamera(false);
  }, []);

  const handleStopStream = useCallback(() => {
    setShowCamera(false);
    setShowScreen(false);
  }, []);

  const handleStickerToggle = useCallback((id: string) => {
    setStickers((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const videoContent = (
    <>
      <VideoFeed
        isBilibili={isBilibili}
        filterId={filterId}
        stickers={stickers}
        showCamera={showCamera}
        showScreen={showScreen}
      />
      <DanmakuOverlay danmakus={danmakus} isBilibili={isBilibili} />
      <LikesOverlay likes={likes} isBilibili={isBilibili} />
      <GiftOverlay gifts={gifts} isBilibili={isBilibili} />

      {/* Pomodoro overlay - subtle, in bottom-left of video */}
      {isStreaming && (
        <div className="absolute bottom-4 left-4 z-30">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
              isBilibili
                ? "bg-black/40 text-white backdrop-blur-sm"
                : "bg-black/60 text-white backdrop-blur-sm"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                pomodoro.mode === "work" ? "bg-green-400" : "bg-blue-400"
              } animate-pulse`}
            />
            <span>{pomodoro.formatTime(pomodoro.timeLeft)}</span>
          </div>
        </div>
      )}

      {/* Toggle controls button - bottom-right of video */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="absolute bottom-4 right-4 z-30 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-sm"
        title={showControls ? "Hide controls" : "Show controls"}
      >
        {showControls ? "✕" : ""}
      </button>
    </>
  );

  const chatContent = (
    <ChatPanel
      messages={messages}
      isBilibili={isBilibili}
      formatTime={formatTime}
    />
  );

  const skinProps = {
    chatPanel: chatContent,
    streamTitle,
    viewerCount,
    onStartCamera: handleStartCamera,
    onStartScreen: handleStartScreen,
    onStopStream: handleStopStream,
    isStreaming,
    showCamera,
    showScreen,
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Main stream layout */}
      {isBilibili ? (
        <BilibiliSkin {...skinProps}>{videoContent}</BilibiliSkin>
      ) : (
        <TwitchSkin {...skinProps}>{videoContent}</TwitchSkin>
      )}

      {/* Control Panel - fixed overlay, does NOT affect layout */}
      <div
        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ease-in-out ${
          showControls ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className={`h-full w-72 overflow-y-auto shadow-2xl ${
          isBilibili ? "bg-white" : "bg-[#18181b]"
        }`}>
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-sm font-semibold ${
                isBilibili ? "text-gray-800" : "text-[#efeff1]"
              }`}>
                Stream Controls
              </h2>
              <button
                onClick={() => setShowControls(false)}
                className={`w-6 h-6 rounded flex items-center justify-center text-sm ${
                  isBilibili
                    ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    : "bg-[#2f2f35] text-[#adadb8] hover:bg-[#3a3a3f]"
                }`}
              >
                ✕
              </button>
            </div>

            {/* Back button */}
            <button
              onClick={onBack}
              className={`w-full text-xs py-2 rounded-lg mb-4 transition-all ${
                isBilibili
                  ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  : "bg-[#2f2f35] text-[#adadb8] hover:bg-[#3a3a3f]"
              }`}
            >
              ← Change Skin
            </button>

            {/* Pomodoro Timer */}
            <div className="mb-4">
              <PomodoroTimer
                mode={pomodoro.mode}
                timeLeft={pomodoro.timeLeft}
                isRunning={pomodoro.isRunning}
                completedSessions={pomodoro.completedSessions}
                progress={pomodoro.progress}
                formatTime={pomodoro.formatTime}
                onStart={pomodoro.start}
                onPause={pomodoro.pause}
                onReset={pomodoro.reset}
                onSkip={pomodoro.skip}
                onSetMode={pomodoro.setMode}
                isBilibili={isBilibili}
              />
            </div>

            {/* Filters & Stickers */}
            <FilterPanel
              filterId={filterId}
              onFilterChange={setFilterId}
              stickers={stickers}
              onStickerToggle={handleStickerToggle}
              isBilibili={isBilibili}
            />
          </div>
        </div>
      </div>

      {/* Backdrop when controls open */}
      {showControls && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setShowControls(false)}
        />
      )}
    </div>
  );
}
