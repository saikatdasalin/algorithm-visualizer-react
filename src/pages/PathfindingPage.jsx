import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiInfo } from "react-icons/fi";
import {
  createGrid,
  GRID_COLS,
  GRID_ROWS,
  pathfindingAlgorithms,
  withRandomWalls,
} from "../algorithms/pathfinding";
import { pathfindingMeta } from "../data/algorithmMeta";
import { usePlayback } from "../hooks/usePlayback";
import AlgorithmInfoModal from "../components/common/AlgorithmInfoModal";
import ComplexityCard from "../components/common/ComplexityCard";
import OperationStatus from "../components/common/OperationStatus";
import PseudoCodePanel from "../components/common/PseudoCodePanel";
import VisualizerControls from "../components/common/VisualizerControls";
import PathfindingGrid from "../components/visualizers/PathfindingGrid";
import { useAlgorithmAudio } from "../hooks/useAlgorithmAudio";
import { useAppStore } from "../store/useAppStore";

const startNode = { row: 2, col: 2 };
const goalNode = { row: GRID_ROWS - 3, col: GRID_COLS - 4 };

const cleanEndpoints = (grid) =>
  grid.map((row) =>
    row.map((node) => {
      const isEndpoint =
        (node.row === startNode.row && node.col === startNode.col) ||
        (node.row === goalNode.row && node.col === goalNode.col);
      return isEndpoint ? { ...node, isWall: false } : node;
    })
  );

function PathfindingPage() {
  const openInfoModal = () => {
    const modal = document.getElementById("path-info-modal");
    if (modal && typeof modal.showModal === "function") modal.showModal();
  };

  const [algorithm, setAlgorithm] = useState("bfs");
  const [grid, setGrid] = useState(() => cleanEndpoints(withRandomWalls(createGrid())));
  const [speed, setSpeed] = useState(70);
  const [steps, setSteps] = useState([]);
  const [pendingStart, setPendingStart] = useState(false);
  const [status, setStatus] = useState("Generate walls and start algorithm.");
  const [visited, setVisited] = useState([]);
  const [frontier, setFrontier] = useState([]);
  const [path, setPath] = useState([]);
  const [line, setLine] = useState(-1);
  const previousStepStateRef = useRef({ visited: 0, frontier: 0, path: 0 });
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const algorithmAudio = useAlgorithmAudio(soundEnabled);

  const playback = usePlayback({
    steps,
    speed,
    onStep: (step) => {
      algorithmAudio.playPathfindingStep(step, previousStepStateRef.current);
      setVisited(step.visited ?? []);
      setFrontier(step.frontier ?? []);
      setPath(step.path ?? []);
      setStatus(step.status);
      setLine(step.line ?? -1);
      previousStepStateRef.current = {
        visited: step.visited?.length ?? previousStepStateRef.current.visited,
        frontier: step.frontier?.length ?? previousStepStateRef.current.frontier,
        path: step.path?.length ?? previousStepStateRef.current.path,
      };
    },
    onDone: () => {
      toast.success(path.length ? "Pathfinding completed" : "Search completed without path");
    },
  });

  useEffect(() => {
    if (!pendingStart || steps.length === 0) return;
    playback.start();
    setPendingStart(false);
  }, [pendingStart, playback, steps.length]);

  const selectedMeta = pathfindingMeta[algorithm];

  const handleRandom = () => {
    const next = cleanEndpoints(withRandomWalls(createGrid(), 0.2));
    setGrid(next);
    setVisited([]);
    setFrontier([]);
    setPath([]);
    setSteps([]);
    algorithmAudio.reset();
    previousStepStateRef.current = { visited: 0, frontier: 0, path: 0 };
    playback.reset();
    setStatus("New random obstacle map generated");
  };

  const handleReset = () => {
    algorithmAudio.reset();
    previousStepStateRef.current = { visited: 0, frontier: 0, path: 0 };
    playback.reset();
    setVisited([]);
    setFrontier([]);
    setPath([]);
    setLine(-1);
    setStatus("Grid reset complete");
  };

  const handleStart = () => {
    algorithmAudio.prime();
    algorithmAudio.reset();
    previousStepStateRef.current = { visited: 0, frontier: 0, path: 0 };
    const result = pathfindingAlgorithms[algorithm](grid, startNode, goalNode);
    setSteps(result.steps);
    setPendingStart(true);
    setStatus(`Running ${selectedMeta.label}`);
  };

  return (
    <div className="space-y-4 pb-6">
      <section className="panel-glass rounded-2xl p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">Graph & Pathfinding Visualizer</h1>
            <p className="mt-1 text-sm text-base-content/70">Observe frontier expansion, visited nodes, and final shortest path.</p>
          </div>
          <button className="btn btn-outline btn-info btn-sm" onClick={openInfoModal}>
            <FiInfo /> Explanation
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <label className="form-control md:col-span-2">
            <span className="label-text mb-1 text-xs uppercase tracking-wider">Algorithm</span>
            <select className="select select-bordered" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
              {Object.keys(pathfindingMeta).map((key) => (
                <option key={key} value={key}>
                  {pathfindingMeta[key].label}
                </option>
              ))}
            </select>
          </label>
          <div className="rounded-xl bg-base-200/70 p-3 text-sm">
            <p className="text-xs uppercase text-base-content/60">Visited Nodes</p>
            <p className="font-semibold">{visited.length}</p>
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
        onSave={() => toast("Use Sorting page to save arrays")}
        canStart
        isRunning={playback.isRunning}
        isPaused={playback.isPaused}
      />

      <div className="grid gap-4 xl:grid-cols-[2fr,1fr]">
        <div className="space-y-3">
          <PathfindingGrid
            grid={grid}
            start={startNode}
            goal={goalNode}
            visited={visited}
            frontier={frontier}
            path={path}
          />
          <div className="panel-glass rounded-2xl p-3 text-xs sm:text-sm">
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-info badge-sm">Visited</span>
              <span className="badge badge-warning badge-sm">Frontier</span>
              <span className="badge badge-success badge-sm">Final Path</span>
              <span className="badge badge-outline badge-sm">Wall</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <ComplexityCard title={`${selectedMeta.label} Complexity`} complexity={selectedMeta.complexity} />
          <OperationStatus status={status} stepsCount={playback.stepIndex} activeIndices={[]} />
          <PseudoCodePanel lines={selectedMeta.pseudocode} currentLine={line} />
        </div>
      </div>

      <AlgorithmInfoModal
        id="path-info-modal"
        title={selectedMeta.label}
        description="Pathfinding algorithms traverse graphs to discover reachable goals and, in some cases, shortest routes."
        details={[
          "BFS guarantees shortest path in unweighted grids.",
          "DFS explores deeply and is not guaranteed shortest.",
          "Dijkstra and A* are suited for weighted shortest paths.",
        ]}
      />
    </div>
  );
}

export default PathfindingPage;
