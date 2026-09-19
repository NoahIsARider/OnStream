"use client";

import type { TimerMode } from "@/hooks/usePomodoro";

interface PomodoroTimerProps {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  completedSessions: number;
  progress: number;
  formatTime: (seconds: number) => string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onSetMode: (mode: TimerMode) => void;
  isBilibili: boolean;
}

export default function PomodoroTimer({
  mode,
  timeLeft,
  isRunning,
  completedSessions,
  progress,
  formatTime,
  onStart,
  onPause,
  onReset,
  onSkip,
  onSetMode,
  isBilibili,
}: PomodoroTimerProps) {
  const modeLabels: Record<TimerMode, string> = {
    work: "Focus",
    shortBreak: "Short Break",
    longBreak: "Long Break",
  };

  const modeColors: Record<TimerMode, string> = isBilibili
    ? { work: "#fb7299", shortBreak: "#00a1d6", longBreak: "#fc9a3c" }
    : { work: "#9146ff", shortBreak: "#00f593", longBreak: "#f5a623" };

  return (
    <div className={`rounded-xl p-4 ${
      isBilibili
        ? "bg-white border border-gray-100 shadow-sm"
        : "bg-[#1f1f23] border border-[#2f2f35]"
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-semibold ${
          isBilibili ? "text-gray-800" : "text-[#efeff1]"
        }`}>
          Session Timer
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          mode === "work"
            ? isBilibili ? "bg-pink-100 text-pink-600" : "bg-purple-900/50 text-purple-300"
            : isBilibili ? "bg-blue-100 text-blue-600" : "bg-green-900/50 text-green-300"
        }`}>
          {modeLabels[mode]}
        </span>
      </div>

      {/* Timer display */}
      <div className="text-center mb-3">
        <div
          className="text-4xl font-mono font-bold tracking-wider"
          style={{ color: modeColors[mode] }}
        >
          {formatTime(timeLeft)}
        </div>
        <div className={`text-xs mt-1 ${
          isBilibili ? "text-gray-400" : "text-[#85858e]"
        }`}>
          Session {completedSessions + 1} | {Math.floor(progress * 100)}% complete
        </div>
      </div>

      {/* Progress bar */}
      <div className={`h-1.5 rounded-full mb-3 overflow-hidden ${
        isBilibili ? "bg-gray-100" : "bg-[#2f2f35]"
      }`}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: modeColors[mode],
          }}
        />
      </div>

      {/* Mode buttons */}
      <div className="flex gap-1 mb-3">
        {(["work", "shortBreak", "longBreak"] as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => onSetMode(m)}
            className={`flex-1 text-xs py-1.5 rounded-md transition-all ${
              mode === m
                ? "text-white font-medium"
                : isBilibili
                  ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  : "bg-[#2f2f35] text-[#adadb8] hover:bg-[#3a3a3f]"
            }`}
            style={mode === m ? { backgroundColor: modeColors[m] } : {}}
          >
            {m === "work" ? "25m" : m === "shortBreak" ? "5m" : "15m"}
          </button>
        ))}
      </div>

      {/* Control buttons */}
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={onStart}
            className="flex-1 text-sm py-2 rounded-lg font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: modeColors[mode] }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={onPause}
            className={`flex-1 text-sm py-2 rounded-lg font-medium transition-all ${
              isBilibili
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-[#2f2f35] text-[#efeff1] hover:bg-[#3a3a3f]"
            }`}
          >
            Pause
          </button>
        )}
        <button
          onClick={onReset}
          className={`px-3 text-sm py-2 rounded-lg font-medium transition-all ${
            isBilibili
              ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
              : "bg-[#2f2f35] text-[#adadb8] hover:bg-[#3a3a3f]"
          }`}
        >
          Reset
        </button>
        <button
          onClick={onSkip}
          className={`px-3 text-sm py-2 rounded-lg font-medium transition-all ${
            isBilibili
              ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
              : "bg-[#2f2f35] text-[#adadb8] hover:bg-[#3a3a3f]"
          }`}
        >
          Skip
        </button>
      </div>

      {/* Sessions completed */}
      <div className={`mt-3 text-center text-xs ${
        isBilibili ? "text-gray-400" : "text-[#85858e]"
      }`}>
        {completedSessions} sessions completed today
        {completedSessions > 0 && (
          <span className="ml-1">
            {"🍅".repeat(Math.min(completedSessions, 8))}
          </span>
        )}
      </div>
    </div>
  );
}
