import { useCallback, useEffect, useRef } from "react";

const MIN_FREQ = 180;
const MAX_FREQ = 980;
const VOLUME_BOOST = 2.4;
const MAX_VOLUME = 0.1;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const boostedVolume = (volume) => clamp(volume * VOLUME_BOOST, 0.0001, MAX_VOLUME);
const supportsAudio = () => typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);

export function useAlgorithmAudio(soundEnabled) {
  const contextRef = useRef(null);
  const lastToneAtRef = useRef(0);
  const completionPlayedRef = useRef(false);

  const ensureContext = useCallback(async () => {
    if (!supportsAudio()) return null;
    if (!contextRef.current) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      contextRef.current = new AudioCtor();
    }
    if (contextRef.current.state === "suspended") {
      await contextRef.current.resume();
    }
    return contextRef.current;
  }, []);

  const playTone = useCallback(
    async ({ frequency, type = "sine", volume = 0.03, duration = 0.06, offset = 0, minIntervalMs = 22 }) => {
      if (!soundEnabled) return;
      const nowMs = performance.now();
      if (nowMs - lastToneAtRef.current < minIntervalMs) return;

      const ctx = await ensureContext();
      if (!ctx) return;

      const start = ctx.currentTime + offset;
      const gainNode = ctx.createGain();
      const oscillator = ctx.createOscillator();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(clamp(frequency, MIN_FREQ, MAX_FREQ), start);
      gainNode.gain.setValueAtTime(0.0001, start);
      gainNode.gain.exponentialRampToValueAtTime(boostedVolume(volume), start + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.01);
      lastToneAtRef.current = nowMs;
    },
    [ensureContext, soundEnabled]
  );

  const playSuccess = useCallback(() => {
    if (completionPlayedRef.current || !soundEnabled) return;
    completionPlayedRef.current = true;
    playTone({ frequency: 520, type: "triangle", volume: 0.035, duration: 0.1, minIntervalMs: 0 });
    playTone({ frequency: 660, type: "triangle", volume: 0.03, duration: 0.12, offset: 0.09, minIntervalMs: 0 });
    playTone({ frequency: 840, type: "triangle", volume: 0.028, duration: 0.14, offset: 0.18, minIntervalMs: 0 });
  }, [playTone, soundEnabled]);

  const playFailure = useCallback(() => {
    if (completionPlayedRef.current || !soundEnabled) return;
    completionPlayedRef.current = true;
    playTone({ frequency: 360, type: "sawtooth", volume: 0.02, duration: 0.1, minIntervalMs: 0 });
    playTone({ frequency: 240, type: "sawtooth", volume: 0.018, duration: 0.12, offset: 0.08, minIntervalMs: 0 });
  }, [playTone, soundEnabled]);

  const mapValueToFreq = useCallback((step) => {
    const values = step?.activeIndices
      ?.map((index) => step?.array?.[index])
      .filter((value) => typeof value === "number");
    const value = values && values.length ? Math.max(...values) : step?.array?.[0] ?? 0;
    const array = Array.isArray(step?.array) ? step.array : [];
    const max = array.length ? Math.max(...array) : 1;
    const ratio = max <= 0 ? 0.5 : clamp(value / max, 0, 1);
    return MIN_FREQ + ratio * (MAX_FREQ - MIN_FREQ);
  }, []);

  const playSortingStep = useCallback(
    (step, prevMetrics) => {
      if (!soundEnabled || !step) return;

      const prevComparisons = prevMetrics?.comparisons ?? 0;
      const prevSwaps = prevMetrics?.swaps ?? 0;
      const nextComparisons = step.comparisons ?? prevComparisons;
      const nextSwaps = step.swaps ?? prevSwaps;
      const status = String(step.status ?? "").toLowerCase();

      if (status.includes("array sorted")) {
        playSuccess();
        return;
      }

      if (nextSwaps > prevSwaps) {
        playTone({
          frequency: mapValueToFreq(step) * 0.8,
          type: "square",
          volume: 0.026,
          duration: 0.07,
          minIntervalMs: 16,
        });
        return;
      }

      if (nextComparisons > prevComparisons) {
        playTone({
          frequency: mapValueToFreq(step),
          type: "triangle",
          volume: 0.02,
          duration: 0.05,
          minIntervalMs: 16,
        });
      }
    },
    [mapValueToFreq, playSuccess, playTone, soundEnabled]
  );

  const playSearchingStep = useCallback(
    (step, prevComparisons) => {
      if (!soundEnabled || !step) return;

      const nextComparisons = step.comparisons ?? prevComparisons;
      const status = String(step.status ?? "").toLowerCase();

      if (step.found || status.includes("target found")) {
        playSuccess();
        return;
      }

      if (status.includes("not found")) {
        playFailure();
        return;
      }

      if (nextComparisons > prevComparisons) {
        playTone({
          frequency: mapValueToFreq(step),
          type: "triangle",
          volume: 0.02,
          duration: 0.05,
          minIntervalMs: 18,
        });
      }
    },
    [mapValueToFreq, playFailure, playSuccess, playTone, soundEnabled]
  );

  const playPathfindingStep = useCallback(
    (step, prevState) => {
      if (!soundEnabled || !step) return;
      const prevVisited = prevState?.visited ?? 0;
      const prevFrontier = prevState?.frontier ?? 0;
      const prevPath = prevState?.path ?? 0;
      const nextVisited = step.visited?.length ?? prevVisited;
      const nextFrontier = step.frontier?.length ?? prevFrontier;
      const nextPath = step.path?.length ?? prevPath;
      const status = String(step.status ?? "").toLowerCase();

      if ((status.includes("goal reached") && nextPath > 0) || nextPath > prevPath) {
        playSuccess();
        return;
      }

      if (status.includes("no path")) {
        playFailure();
        return;
      }

      if (nextVisited > prevVisited) {
        const frequency = 260 + (nextVisited % 28) * 11;
        playTone({
          frequency,
          type: "sine",
          volume: 0.015,
          duration: 0.035,
          minIntervalMs: 14,
        });
        return;
      }

      if (nextFrontier > prevFrontier) {
        const frequency = 320 + (nextFrontier % 20) * 12;
        playTone({
          frequency,
          type: "triangle",
          volume: 0.013,
          duration: 0.03,
          minIntervalMs: 14,
        });
      }
    },
    [playFailure, playSuccess, playTone, soundEnabled]
  );

  const reset = useCallback(() => {
    completionPlayedRef.current = false;
    lastToneAtRef.current = 0;
  }, []);

  const prime = useCallback(() => {
    if (!soundEnabled) return;
    ensureContext();
  }, [ensureContext, soundEnabled]);

  useEffect(
    () => () => {
      if (contextRef.current && typeof contextRef.current.close === "function") {
        contextRef.current.close();
      }
      contextRef.current = null;
    },
    []
  );

  return {
    prime,
    reset,
    playSortingStep,
    playSearchingStep,
    playPathfindingStep,
  };
}
