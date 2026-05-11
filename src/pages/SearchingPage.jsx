import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiInfo } from "react-icons/fi";
import { searchingAlgorithms } from "../algorithms/searching";
import { searchingMeta } from "../data/algorithmMeta";
import ComplexityCard from "../components/common/ComplexityCard";
import OperationStatus from "../components/common/OperationStatus";
import PseudoCodePanel from "../components/common/PseudoCodePanel";
import VisualizerControls from "../components/common/VisualizerControls";
import SortingBars from "../components/visualizers/SortingBars";
import AlgorithmInfoModal from "../components/common/AlgorithmInfoModal";
import { usePlayback } from "../hooks/usePlayback";
import { useAlgorithmAudio } from "../hooks/useAlgorithmAudio";
import { generateSortedArray } from "../utils/random";
import { useAppStore } from "../store/useAppStore";

function SearchingPage() {
  const openInfoModal = () => {
    const modal = document.getElementById("searching-info-modal");
    if (modal && typeof modal.showModal === "function") modal.showModal();
  };

  const [algorithm, setAlgorithm] = useState("linear");
  const [sourceArray, setSourceArray] = useState(() => generateSortedArray(24, 10, 90));
  const [visualArray, setVisualArray] = useState(sourceArray);
  const [target, setTarget] = useState(sourceArray[6]);
  const [speed, setSpeed] = useState(220);
  const [steps, setSteps] = useState([]);
  const [status, setStatus] = useState("Pick a target and start searching.");
  const [activeIndices, setActiveIndices] = useState([]);
  const [line, setLine] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [stats, setStats] = useState({ comparisons: 0, foundIndex: -1 });
  const [pendingStart, setPendingStart] = useState(false);
  const previousComparisonsRef = useRef(0);
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const algorithmAudio = useAlgorithmAudio(soundEnabled);

  const playback = usePlayback({
    steps,
    speed,
    onStep: (step) => {
      algorithmAudio.playSearchingStep(step, previousComparisonsRef.current);
      setVisualArray(step.array);
      setStatus(step.status);
      setActiveIndices(step.activeIndices ?? []);
      setLine(step.line ?? -1);
      setFoundIndex(step.found ? step.foundIndex : -1);
      previousComparisonsRef.current = step.comparisons ?? previousComparisonsRef.current;
      setStats((prev) => ({
        comparisons: step.comparisons ?? prev.comparisons,
        foundIndex: step.foundIndex ?? prev.foundIndex,
      }));
    },
    onDone: () => {
      if (stats.foundIndex >= 0) toast.success("Target found");
      else toast.error("Target not found");
    },
  });

  useEffect(() => {
    if (!pendingStart || steps.length === 0) return;
    playback.start();
    setPendingStart(false);
  }, [pendingStart, playback, steps.length]);

  useEffect(() => {
    setVisualArray(sourceArray);
  }, [sourceArray]);

  const selectedMeta = searchingMeta[algorithm];

  const handleStart = () => {
    algorithmAudio.prime();
    algorithmAudio.reset();
    previousComparisonsRef.current = 0;
    const result = searchingAlgorithms[algorithm](sourceArray, Number(target));
    setSteps(result.steps);
    setVisualArray(result.sortedArray ?? sourceArray);
    setStats(result.stats);
    setPendingStart(true);
    setStatus(`Running ${selectedMeta.label}`);
  };

  const handleRandom = () => {
    const next = generateSortedArray(24, 10, 90);
    setSourceArray(next);
    setVisualArray(next);
    setTarget(next[Math.floor(next.length / 2)]);
    setSteps([]);
    algorithmAudio.reset();
    previousComparisonsRef.current = 0;
    playback.reset();
    setStatus("Generated new sorted array");
    setFoundIndex(-1);
  };

  const handleReset = () => {
    algorithmAudio.reset();
    previousComparisonsRef.current = 0;
    playback.reset();
    setVisualArray(sourceArray);
    setActiveIndices([]);
    setFoundIndex(-1);
    setLine(-1);
    setStatus("Reset complete");
  };

  return (
    <div className="space-y-4 pb-6">
      <section className="panel-glass rounded-2xl p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">Searching Algorithm Visualizer</h1>
            <p className="mt-1 text-sm text-base-content/70">Run target search and inspect each comparison in real time.</p>
          </div>
          <button className="btn btn-outline btn-info btn-sm" onClick={openInfoModal}>
            <FiInfo /> Explanation
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <label className="form-control md:col-span-2">
            <span className="label-text mb-1 text-xs uppercase tracking-wider">Algorithm</span>
            <select className="select select-bordered" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
              {Object.keys(searchingMeta).map((key) => (
                <option key={key} value={key}>
                  {searchingMeta[key].label}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control">
            <span className="label-text mb-1 text-xs uppercase tracking-wider">Target Value</span>
            <input
              type="number"
              className="input input-bordered"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
            />
          </label>
          <div className="rounded-xl bg-base-200/70 p-3 text-sm">
            <p className="text-xs uppercase text-base-content/60">Comparisons</p>
            <p className="font-semibold">{stats.comparisons}</p>
          </div>
        </div>
      </section>

      <VisualizerControls
        speed={speed}
        onSpeedChange={setSpeed}
        onRandom={handleRandom}
        onStart={handleStart}
        onPause={playback.pause}
        onResume={playback.resume}
        onReset={handleReset}
        onSave={() => toast("Save is available in Sorting page")}
        canStart
        isRunning={playback.isRunning}
        isPaused={playback.isPaused}
      />

      <div className="grid gap-4 xl:grid-cols-[2fr,1fr]">
        <SortingBars array={visualArray} activeIndices={activeIndices} foundIndex={foundIndex} />

        <div className="space-y-4">
          <ComplexityCard title={`${selectedMeta.label} Complexity`} complexity={selectedMeta.complexity} />
          <OperationStatus status={status} stepsCount={playback.stepIndex} activeIndices={activeIndices} />
          <PseudoCodePanel lines={selectedMeta.pseudocode} currentLine={line} />
        </div>
      </div>

      <AlgorithmInfoModal
        id="searching-info-modal"
        title={selectedMeta.label}
        description="Searching algorithms identify whether and where a target exists in a collection."
        details={[
          "Binary Search requires sorted data.",
          "Linear Search is simpler and supports unsorted arrays.",
          "Comparison count helps benchmark performance.",
        ]}
      />
    </div>
  );
}

export default SearchingPage;
