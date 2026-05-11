import { useCallback, useEffect, useRef, useState } from "react";

export function usePlayback({ steps = [], speed = 220, onStep, onDone }) {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setIsPaused(false);
    setStepIndex(0);
  }, [clearTimer]);

  const pause = useCallback(() => {
    setIsPaused(true);
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (!steps.length) return;
    setIsPaused(false);
    setIsRunning(true);
  }, [steps.length]);

  const start = useCallback(() => {
    if (!steps.length) return;
    setStepIndex(0);
    setIsPaused(false);
    setIsRunning(true);
  }, [steps.length]);

  useEffect(() => {
    if (!isRunning || !steps.length) {
      clearTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length) {
          clearTimer();
          setIsRunning(false);
          setIsPaused(false);
          onDone?.();
          return prev;
        }

        onStep?.(steps[prev], prev);
        return prev + 1;
      });
    }, speed);

    return clearTimer;
  }, [clearTimer, isRunning, onDone, onStep, speed, steps]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    isRunning,
    isPaused,
    stepIndex,
    start,
    pause,
    resume,
    reset,
  };
}