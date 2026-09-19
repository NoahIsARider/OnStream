"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type TimerMode = "work" | "shortBreak" | "longBreak";

interface PomodoroState {
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  completedSessions: number;
  totalWorkTime: number;
}

const MODE_DURATIONS: Record<TimerMode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export function usePomodoro() {
  const [state, setState] = useState<PomodoroState>({
    mode: "work",
    timeLeft: MODE_DURATIONS.work,
    isRunning: false,
    completedSessions: 0,
    totalWorkTime: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (state.isRunning && state.timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          const newTime = prev.timeLeft - 1;
          if (newTime <= 0) {
            clearTimer();
            const newCompleted =
              prev.mode === "work"
                ? prev.completedSessions + 1
                : prev.completedSessions;
            const newTotalWork =
              prev.mode === "work"
                ? prev.totalWorkTime + MODE_DURATIONS.work
                : prev.totalWorkTime;
            const nextMode: TimerMode =
              prev.mode === "work"
                ? newCompleted % 4 === 0
                  ? "longBreak"
                  : "shortBreak"
                : "work";
            return {
              ...prev,
              timeLeft: 0,
              isRunning: false,
              mode: nextMode,
              completedSessions: newCompleted,
              totalWorkTime: newTotalWork,
            };
          }
          return { ...prev, timeLeft: newTime };
        });
      }, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [state.isRunning, clearTimer]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setState((prev) => ({
      ...prev,
      timeLeft: MODE_DURATIONS[prev.mode],
      isRunning: false,
    }));
  }, [clearTimer]);

  const skip = useCallback(() => {
    clearTimer();
    setState((prev) => {
      const nextMode: TimerMode =
        prev.mode === "work"
          ? prev.completedSessions % 4 === 3
            ? "longBreak"
            : "shortBreak"
          : "work";
      const newCompleted =
        prev.mode === "work" ? prev.completedSessions + 1 : prev.completedSessions;
      const newTotalWork =
        prev.mode === "work"
          ? prev.totalWorkTime + (MODE_DURATIONS.work - prev.timeLeft)
          : prev.totalWorkTime;
      return {
        ...prev,
        mode: nextMode,
        timeLeft: MODE_DURATIONS[nextMode],
        isRunning: false,
        completedSessions: newCompleted,
        totalWorkTime: newTotalWork,
      };
    });
  }, [clearTimer]);

  const setMode = useCallback((mode: TimerMode) => {
    clearTimer();
    setState((prev) => ({
      ...prev,
      mode,
      timeLeft: MODE_DURATIONS[mode],
      isRunning: false,
    }));
  }, [clearTimer]);

  const formatTime = useCallback((seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  const progress =
    1 - state.timeLeft / MODE_DURATIONS[state.mode];

  return {
    ...state,
    start,
    pause,
    reset,
    skip,
    setMode,
    formatTime,
    progress,
    duration: MODE_DURATIONS[state.mode],
  };
}
