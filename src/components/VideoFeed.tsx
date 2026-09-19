"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { FILTERS, STICKERS } from "@/lib/simulatedData";

interface VideoFeedProps {
  isBilibili: boolean;
  filterId: string;
  stickers: string[];
  showCamera: boolean;
  showScreen: boolean;
}

export default function VideoFeed({
  isBilibili,
  filterId,
  stickers,
  showCamera,
  showScreen,
}: VideoFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [streamType, setStreamType] = useState<"camera" | "screen" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useDemo, setUseDemo] = useState(false);
  const animFrameRef = useRef<number>(0);
  // Live stream is tracked in a ref so the start/stop callbacks stay identity
  // stable. Reading the `stream` state inside them would make them change on
  // every capture and re-trigger the showCamera/showScreen effect, which
  // restarted getUserMedia in a loop (hundreds of calls, ending every track).
  const streamRef = useRef<MediaStream | null>(null);

  const currentFilter = FILTERS.find((f) => f.id === filterId);
  const activeStickers = STICKERS.filter((s) => stickers.includes(s.id));

  const checkMediaDevices = useCallback(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return false;
    }
    return true;
  }, []);

  const stopTracks = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (!checkMediaDevices()) {
      setUseDemo(true);
      setStreamType("camera");
      setError(null);
      return;
    }
    try {
      stopTracks();
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = mediaStream;
      setStream(mediaStream);
      setStreamType("camera");
      setUseDemo(false);
      setError(null);
    } catch {
      setUseDemo(true);
      setStreamType("camera");
      setError(null);
    }
  }, [checkMediaDevices, stopTracks]);

  const startScreen = useCallback(async () => {
    if (!checkMediaDevices() || !navigator.mediaDevices.getDisplayMedia) {
      setUseDemo(true);
      setStreamType("screen");
      setError(null);
      return;
    }
    try {
      stopTracks();
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });
      streamRef.current = mediaStream;
      setStream(mediaStream);
      setStreamType("screen");
      setUseDemo(false);
      setError(null);

      mediaStream.getVideoTracks()[0].onended = () => {
        streamRef.current = null;
        setStream(null);
        setStreamType(null);
        setUseDemo(false);
      };
    } catch {
      setUseDemo(true);
      setStreamType("screen");
      setError(null);
    }
  }, [checkMediaDevices, stopTracks]);

  const stopStream = useCallback(() => {
    stopTracks();
    setStream(null);
    setStreamType(null);
    setUseDemo(false);
  }, [stopTracks]);

  useEffect(() => {
    if (showCamera && !showScreen) {
      startCamera();
    } else if (showScreen && !showCamera) {
      startScreen();
    } else if (!showCamera && !showScreen) {
      stopStream();
    }
  }, [showCamera, showScreen, startCamera, startScreen, stopStream]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Release the device when the feed unmounts, otherwise the camera stays busy.
  useEffect(() => stopTracks, [stopTracks]);

  // Canvas filter rendering
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    if (!currentFilter || currentFilter.id === "none") return;
    if (useDemo) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      if (video.readyState >= 2) {
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        ctx.filter = currentFilter.css;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.filter = "none";
      }
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [currentFilter, useDemo]);

  const showCanvas = currentFilter && currentFilter.id !== "none" && !useDemo;

  return (
    <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
      {/* Demo mode - fake stream content */}
      {useDemo && streamType && (
        <div className="absolute inset-0 flex items-center justify-center">
          {streamType === "camera" ? (
            <div className="text-center">
              <div className="text-8xl mb-4 animate-pulse">📷</div>
              <p className="text-white/80 text-lg font-medium">Camera Active</p>
              <p className="text-white/50 text-sm mt-1">Demo mode - camera feed simulated</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs">LIVE</span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-8xl mb-4 animate-pulse">🖥️</div>
              <p className="text-white/80 text-lg font-medium">Screen Sharing</p>
              <p className="text-white/50 text-sm mt-1">Demo mode - screen share simulated</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs">LIVE</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Real stream */}
      {!useDemo && (
        <>
          {!stream && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {isBilibili ? "🎮" : ""}
                </div>
                <p className="text-lg text-white/80 font-medium">Ready to Stream</p>
                <p className="text-sm text-white/50 mt-1">
                  {isBilibili ? "Click camera or screen share to start" : "Enable camera or screen share to go live"}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center text-red-400">
                <div className="text-4xl mb-2">⚠️</div>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover ${showCanvas ? "hidden" : ""}`}
            style={{ transform: streamType === "camera" ? "scaleX(-1)" : "none" }}
          />

          {showCanvas && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: streamType === "camera" ? "scaleX(-1)" : "none" }}
            />
          )}
        </>
      )}

      {/* Stickers overlay */}
      {activeStickers.map((sticker, idx) => (
        <div
          key={sticker.id}
          className="absolute text-5xl pointer-events-none select-none"
          style={{
            top: `${10 + idx * 8}%`,
            right: "10%",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            animation: "float 3s ease-in-out infinite",
            animationDelay: `${idx * 0.5}s`,
          }}
        >
          {sticker.emoji}
        </div>
      ))}

      {/* LIVE badge */}
      {(stream || useDemo) && (
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse">
            LIVE
          </span>
          <span className="text-white/60 text-xs">
            {streamType === "camera" ? "📷 Camera" : "️ Screen"}
          </span>
        </div>
      )}

      {/* Viewer count */}
      {(stream || useDemo) && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-white/60 z-10">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>{Math.floor(1000 + Math.random() * 900)}</span>
        </div>
      )}
    </div>
  );
}
