import { FiPause, FiPlay, FiRefreshCw, FiRotateCw, FiSave, FiSliders, FiZap } from "react-icons/fi";

function VisualizerControls({
  speed,
  onSpeedChange,
  onRandom,
  onStart,
  onPause,
  onResume,
  onReset,
  onSave,
  canStart,
  isRunning,
  isPaused,
}) {
  return (
    <div className="panel-glass rounded-2xl p-4">
      <div className="flex flex-wrap items-center gap-2">
        <button className="btn btn-primary btn-sm" onClick={onStart} disabled={!canStart || isRunning}>
          <FiPlay /> Start
        </button>
        <button className="btn btn-warning btn-sm" onClick={onPause} disabled={!isRunning}>
          <FiPause /> Pause
        </button>
        <button className="btn btn-success btn-sm" onClick={onResume} disabled={!isPaused}>
          <FiRotateCw /> Resume
        </button>
        <button className="btn btn-error btn-sm" onClick={onReset}>
          <FiRefreshCw /> Reset
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onRandom}>
          <FiZap /> Random Data
        </button>
        <button className="btn btn-accent btn-sm" onClick={onSave}>
          <FiSave /> Save Array
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          <FiSliders /> Speed
        </label>
        <input
          type="range"
          min="40"
          max="600"
          step="20"
          value={speed}
          onChange={(event) => onSpeedChange(Number(event.target.value))}
          className="range range-primary max-w-xs"
        />
        <span className="rounded-full bg-base-300 px-3 py-1 text-xs font-semibold">
          {speed}ms
        </span>
      </div>
    </div>
  );
}

export default VisualizerControls;