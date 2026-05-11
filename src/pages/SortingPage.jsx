import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiDownload, FiInfo } from "react-icons/fi";
import AlgorithmInfoModal from "../components/common/AlgorithmInfoModal";
import CodeEditorPanel from "../components/common/CodeEditorPanel";
import ComplexityCard from "../components/common/ComplexityCard";
import OperationStatus from "../components/common/OperationStatus";
import PerformanceChart from "../components/common/PerformanceChart";
import PseudoCodePanel from "../components/common/PseudoCodePanel";
import SavedArraysPanel from "../components/common/SavedArraysPanel";
import VisualizerControls from "../components/common/VisualizerControls";
import SortingBars from "../components/visualizers/SortingBars";
import { sortingAlgorithms } from "../algorithms/sorting";
import { usePlayback } from "../hooks/usePlayback";
import { useAlgorithmAudio } from "../hooks/useAlgorithmAudio";
import { sortingMeta } from "../data/algorithmMeta";
import { generateRandomArray } from "../utils/random";
import { exportElementAsImage } from "../utils/export";
import { useAppStore } from "../store/useAppStore";

const algorithmOptions = Object.keys(sortingMeta);

function SortingPage() {
  const openInfoModal = () => {
    const modal = document.getElementById("sorting-info-modal");
    if (modal && typeof modal.showModal === "function") modal.showModal();
  };

  const [algorithm, setAlgorithm] = useState("bubble");
  const [compareAlgorithm, setCompareAlgorithm] = useState("quick");
  const [sourceArray, setSourceArray] = useState(() => generateRandomArray(30));
  const [visualArray, setVisualArray] = useState(sourceArray);
  const [speed, setSpeed] = useState(220);
  const [steps, setSteps] = useState([]);
  const [status, setStatus] = useState("Generate data and press start.");
  const [activeIndices, setActiveIndices] = useState([]);
  const [line, setLine] = useState(-1);
  const [runtimeStats, setRuntimeStats] = useState({ comparisons: 0, swaps: 0 });
  const [comparisonData, setComparisonData] = useState([]);
  const [codeDraft, setCodeDraft] = useState(sortingMeta.bubble.pseudocode.join("\n"));
  const [pendingStart, setPendingStart] = useState(false);
  const [saveArrayName, setSaveArrayName] = useState("");
  const boardRef = useRef(null);
  const saveArrayModalRef = useRef(null);
  const previousMetricsRef = useRef({ comparisons: 0, swaps: 0 });

  const savedArrays = useAppStore((state) => state.savedArrays);
  const saveArray = useAppStore((state) => state.saveArray);
  const removeSavedArray = useAppStore((state) => state.removeSavedArray);
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const algorithmAudio = useAlgorithmAudio(soundEnabled);

  const playback = usePlayback({
    steps,
    speed,
    onStep: (step) => {
      if (!step) return;
      algorithmAudio.playSortingStep(step, previousMetricsRef.current);
      setVisualArray(step.array);
      setStatus(step.status);
      setActiveIndices(step.activeIndices ?? []);
      setLine(step.line ?? -1);
      previousMetricsRef.current = {
        comparisons: step.comparisons ?? previousMetricsRef.current.comparisons,
        swaps: step.swaps ?? previousMetricsRef.current.swaps,
      };
      setRuntimeStats((prev) => ({
        comparisons: step.comparisons ?? prev.comparisons,
        swaps: step.swaps ?? prev.swaps,
      }));
    },
    onDone: () => {
      toast.success("Sorting run completed");
    },
  });

  useEffect(() => {
    setVisualArray(sourceArray);
  }, [sourceArray]);

  useEffect(() => {
    if (!pendingStart || steps.length === 0) return;
    playback.start();
    setPendingStart(false);
  }, [pendingStart, playback, steps.length]);

  useEffect(() => {
    const nextMeta = sortingMeta[algorithm] ?? sortingMeta.bubble;
    setCodeDraft(nextMeta.pseudocode.join("\n"));
  }, [algorithm]);

  const selectedMeta = sortingMeta[algorithm] ?? sortingMeta.bubble;

  const handleRandom = () => {
    const next = generateRandomArray(30);
    setSourceArray(next);
    setVisualArray(next);
    setSteps([]);
    previousMetricsRef.current = { comparisons: 0, swaps: 0 };
    algorithmAudio.reset();
    playback.reset();
    setRuntimeStats({ comparisons: 0, swaps: 0 });
    setStatus("Random array generated.");
  };

  const handleStart = () => {
    algorithmAudio.prime();
    algorithmAudio.reset();
    previousMetricsRef.current = { comparisons: 0, swaps: 0 };
    const primaryAlgo = sortingAlgorithms[algorithm];
    const secondaryAlgo = sortingAlgorithms[compareAlgorithm];
    const safeArray = Array.isArray(sourceArray) ? sourceArray : [];

    if (!primaryAlgo || !secondaryAlgo) {
      toast.error("Selected algorithm is not available");
      return;
    }

    if (safeArray.length === 0) {
      toast.error("Array is empty");
      return;
    }

    const primary = primaryAlgo(safeArray);
    const secondary = secondaryAlgo(safeArray);

    setSteps(primary.steps);
    setRuntimeStats(primary.stats);
    setComparisonData([
      { name: sortingMeta[algorithm].label, comparisons: primary.stats.comparisons, swaps: primary.stats.swaps },
      {
        name: sortingMeta[compareAlgorithm].label,
        comparisons: secondary.stats.comparisons,
        swaps: secondary.stats.swaps,
      },
    ]);
    setPendingStart(true);
    setStatus(`Running ${sortingMeta[algorithm].label}`);
  };

  const handleReset = () => {
    algorithmAudio.reset();
    previousMetricsRef.current = { comparisons: 0, swaps: 0 };
    playback.reset();
    setVisualArray(sourceArray);
    setActiveIndices([]);
    setLine(-1);
    setStatus("Reset complete.");
  };

  const handleOpenSaveModal = () => {
    setSaveArrayName(`array-${Date.now().toString().slice(-4)}`);
    saveArrayModalRef.current?.showModal();
  };

  const handleSave = (event) => {
    event.preventDefault();
    const name = saveArrayName.trim();
    if (!name) {
      toast.error("Please enter a name");
      return;
    }
    saveArray({ name, values: sourceArray });
    saveArrayModalRef.current?.close();
    toast.success("Array saved");
  };

  const handleLoadSaved = (entry) => {
    if (!entry || !Array.isArray(entry.values)) {
      toast.error("Saved data is invalid");
      return;
    }
    algorithmAudio.reset();
    previousMetricsRef.current = { comparisons: 0, swaps: 0 };
    setSourceArray(entry.values);
    setVisualArray(entry.values);
    setStatus(`Loaded ${entry.name}`);
    playback.reset();
  };

  const canStart = useMemo(() => sourceArray.length > 0, [sourceArray.length]);

  return (
    <div className="space-y-4 pb-6">
      <section className="panel-glass rounded-2xl p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">Sorting Algorithm Visualizer</h1>
            <p className="mt-1 text-sm text-base-content/70">Interactive step-by-step animation with real-time operation highlights.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-outline btn-info btn-sm" onClick={openInfoModal}>
              <FiInfo /> Explanation
            </button>
            <button
              className="btn btn-outline btn-primary btn-sm"
              onClick={() => exportElementAsImage(boardRef.current, `${algorithm}-visualization.png`)}
            >
              <FiDownload /> Export Image
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="form-control">
            <span className="label-text mb-1 text-xs uppercase tracking-wider">Primary Algorithm</span>
            <select className="select select-bordered" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
              {algorithmOptions.map((key) => (
                <option key={key} value={key}>
                  {sortingMeta[key].label}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control">
            <span className="label-text mb-1 text-xs uppercase tracking-wider">Comparison Algorithm</span>
            <select className="select select-bordered" value={compareAlgorithm} onChange={(e) => setCompareAlgorithm(e.target.value)}>
              {algorithmOptions.map((key) => (
                <option key={key} value={key}>
                  {sortingMeta[key].label}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-xl bg-base-200/70 p-3 text-sm">
            <p className="text-xs uppercase text-base-content/60">Comparisons</p>
            <p className="font-semibold">{runtimeStats.comparisons}</p>
          </div>
          <div className="rounded-xl bg-base-200/70 p-3 text-sm">
            <p className="text-xs uppercase text-base-content/60">Swaps/Writes</p>
            <p className="font-semibold">{runtimeStats.swaps}</p>
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
        onSave={handleOpenSaveModal}
        canStart={canStart}
        isRunning={playback.isRunning}
        isPaused={playback.isPaused}
      />

      <div className="grid gap-4 xl:grid-cols-[2fr,1fr]" ref={boardRef}>
        <div className="space-y-4">
          <SortingBars array={visualArray} activeIndices={activeIndices} />
          {comparisonData.length > 0 && <PerformanceChart title="Algorithm Comparison" data={comparisonData} />}
        </div>

        <div className="space-y-4">
          <ComplexityCard title={`${selectedMeta.label} Complexity`} complexity={selectedMeta.complexity} />
          <OperationStatus status={status} stepsCount={playback.stepIndex} activeIndices={activeIndices} />
          <PseudoCodePanel lines={selectedMeta.pseudocode} currentLine={line} />
          <SavedArraysPanel arrays={savedArrays} onLoad={handleLoadSaved} onDelete={removeSavedArray} />
          <CodeEditorPanel
            code={codeDraft}
            onChange={setCodeDraft}
            onRun={() => toast.success("Draft saved for learning notes")}
          />
        </div>
      </div>

      <AlgorithmInfoModal
        id="sorting-info-modal"
        title={selectedMeta.label}
        description={selectedMeta.description}
        details={[
          "Use Random Data to create new datasets.",
          "Use Compare Algorithm to benchmark operations.",
          "Use Export Image for documentation or portfolio use.",
        ]}
      />

      <dialog ref={saveArrayModalRef} className="modal">
        <div className="modal-box max-w-md rounded-2xl">
          <h3 className="font-display text-lg font-bold">Save Array</h3>
          <p className="mt-2 text-sm text-base-content/75">Enter a name for the current array configuration.</p>
          <form className="mt-4 space-y-4" onSubmit={handleSave}>
            <label className="form-control">
              <span className="label-text mb-1 text-xs uppercase tracking-wider">Array Name</span>
              <input
                autoFocus
                type="text"
                className="input input-bordered"
                value={saveArrayName}
                onChange={(event) => setSaveArrayName(event.target.value)}
                placeholder="array-1001"
              />
            </label>
            <div className="modal-action mt-0">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => saveArrayModalRef.current?.close()}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default SortingPage;
