import { motion as Motion } from "framer-motion";
import { cellKey } from "../../algorithms/pathfinding";

function PathfindingGrid({ grid, start, goal, visited = [], frontier = [], path = [] }) {
  const visitedSet = new Set(visited);
  const frontierSet = new Set(frontier);
  const pathSet = new Set(path);

  return (
    <div className="panel-glass overflow-auto rounded-2xl p-3">
      <div className="grid min-w-max gap-1" style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(14px, 1fr))` }}>
        {grid.flat().map((node) => {
          const id = cellKey(node.row, node.col);
          const isStart = node.row === start.row && node.col === start.col;
          const isGoal = node.row === goal.row && node.col === goal.col;

          const stateClass = isStart
            ? "bg-primary ring-2 ring-primary/30"
            : isGoal
              ? "bg-error ring-2 ring-error/30"
              : node.isWall
                ? "bg-base-content/20"
                : pathSet.has(id)
                  ? "bg-success"
                  : frontierSet.has(id)
                    ? "bg-warning"
                    : visitedSet.has(id)
                      ? "bg-info"
                      : "bg-base-300/70";

          return (
            <Motion.div
              layout
              key={id}
              className={`h-4 w-4 rounded-[4px] md:h-5 md:w-5 ${stateClass}`}
              initial={{ scale: 0.85, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {isStart && <span className="sr-only">Start</span>}
              {isGoal && <span className="sr-only">Goal</span>}
            </Motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PathfindingGrid;
