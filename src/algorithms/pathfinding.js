export const GRID_ROWS = 18;
export const GRID_COLS = 32;

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const key = (row, col) => `${row}-${col}`;

export const createGrid = (rows = GRID_ROWS, cols = GRID_COLS) =>
  Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      isWall: false,
      weight: 1,
    }))
  );

export const withRandomWalls = (grid, wallChance = 0.18) =>
  grid.map((row) =>
    row.map((node) => ({
      ...node,
      isWall: Math.random() < wallChance,
    }))
  );

const inBounds = (row, col, rows, cols) => row >= 0 && row < rows && col >= 0 && col < cols;

const reconstructPath = (parent, endKey) => {
  const path = [];
  let current = endKey;

  while (current && parent[current] !== undefined) {
    path.push(current);
    current = parent[current];
  }

  if (current) path.push(current);
  return path.reverse();
};

const pushStep = (steps, current, visited, frontier, line, status, path = []) => {
  steps.push({ current, visited: [...visited], frontier: [...frontier], line, status, path });
};

export function bfsSteps(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [start];
  const visitedSet = new Set([key(start.row, start.col)]);
  const visited = [key(start.row, start.col)];
  const parent = {};
  const steps = [];

  while (queue.length) {
    const current = queue.shift();
    const currentKey = key(current.row, current.col);

    pushStep(steps, currentKey, visited, queue.map((n) => key(n.row, n.col)), 1, `Exploring ${current.row},${current.col}`);

    if (current.row === goal.row && current.col === goal.col) {
      const path = reconstructPath(parent, currentKey);
      pushStep(steps, currentKey, visited, [], 4, "Goal reached", path);
      return { steps, path };
    }

    for (const [dr, dc] of dirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      if (!inBounds(nr, nc, rows, cols)) continue;
      if (grid[nr][nc].isWall) continue;

      const nextKey = key(nr, nc);
      if (visitedSet.has(nextKey)) continue;

      visitedSet.add(nextKey);
      visited.push(nextKey);
      parent[nextKey] = currentKey;
      queue.push({ row: nr, col: nc });
      pushStep(steps, nextKey, visited, queue.map((n) => key(n.row, n.col)), 2, `Queued ${nr},${nc}`);
    }
  }

  pushStep(steps, key(start.row, start.col), visited, [], 5, "No path found", []);
  return { steps, path: [] };
}

export function dfsSteps(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const stack = [start];
  const visitedSet = new Set();
  const visited = [];
  const parent = {};
  const steps = [];

  while (stack.length) {
    const current = stack.pop();
    const currentKey = key(current.row, current.col);
    if (visitedSet.has(currentKey)) continue;

    visitedSet.add(currentKey);
    visited.push(currentKey);
    pushStep(steps, currentKey, visited, stack.map((n) => key(n.row, n.col)), 1, `Visiting ${current.row},${current.col}`);

    if (current.row === goal.row && current.col === goal.col) {
      const path = reconstructPath(parent, currentKey);
      pushStep(steps, currentKey, visited, [], 3, "Goal reached", path);
      return { steps, path };
    }

    for (const [dr, dc] of dirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (!inBounds(nr, nc, rows, cols) || grid[nr][nc].isWall) continue;
      const nextKey = key(nr, nc);
      if (!visitedSet.has(nextKey)) {
        parent[nextKey] = currentKey;
        stack.push({ row: nr, col: nc });
      }
    }
  }

  pushStep(steps, key(start.row, start.col), visited, [], 4, "No path found", []);
  return { steps, path: [] };
}

export function dijkstraSteps(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const distances = {};
  const visitedSet = new Set();
  const parent = {};
  const steps = [];
  const frontier = [{ ...start, dist: 0 }];
  const startKey = key(start.row, start.col);
  distances[startKey] = 0;

  while (frontier.length) {
    frontier.sort((a, b) => a.dist - b.dist);
    const current = frontier.shift();
    const currentKey = key(current.row, current.col);
    if (visitedSet.has(currentKey)) continue;

    visitedSet.add(currentKey);
    pushStep(
      steps,
      currentKey,
      [...visitedSet],
      frontier.map((n) => key(n.row, n.col)),
      1,
      `Selecting min distance node ${current.row},${current.col}`
    );

    if (current.row === goal.row && current.col === goal.col) {
      const path = reconstructPath(parent, currentKey);
      pushStep(steps, currentKey, [...visitedSet], [], 4, "Goal reached", path);
      return { steps, path };
    }

    for (const [dr, dc] of dirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (!inBounds(nr, nc, rows, cols) || grid[nr][nc].isWall) continue;

      const nextKey = key(nr, nc);
      const nextDist = distances[currentKey] + grid[nr][nc].weight;

      if (distances[nextKey] === undefined || nextDist < distances[nextKey]) {
        distances[nextKey] = nextDist;
        parent[nextKey] = currentKey;
        frontier.push({ row: nr, col: nc, dist: nextDist });
        pushStep(steps, nextKey, [...visitedSet], frontier.map((n) => key(n.row, n.col)), 2, `Relax edge to ${nr},${nc}`);
      }
    }
  }

  pushStep(steps, startKey, [...visitedSet], [], 5, "No path found", []);
  return { steps, path: [] };
}

const heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

export function aStarSteps(grid, start, goal) {
  const rows = grid.length;
  const cols = grid[0].length;
  const gScore = {};
  const fScore = {};
  const parent = {};
  const visitedSet = new Set();
  const open = [{ ...start, f: heuristic(start, goal) }];
  const steps = [];

  const startKey = key(start.row, start.col);
  gScore[startKey] = 0;
  fScore[startKey] = heuristic(start, goal);

  while (open.length) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();
    const currentKey = key(current.row, current.col);

    if (visitedSet.has(currentKey)) continue;
    visitedSet.add(currentKey);

    pushStep(
      steps,
      currentKey,
      [...visitedSet],
      open.map((n) => key(n.row, n.col)),
      1,
      `Exploring node ${current.row},${current.col}`
    );

    if (current.row === goal.row && current.col === goal.col) {
      const path = reconstructPath(parent, currentKey);
      pushStep(steps, currentKey, [...visitedSet], [], 4, "Goal reached", path);
      return { steps, path };
    }

    for (const [dr, dc] of dirs) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      if (!inBounds(nr, nc, rows, cols) || grid[nr][nc].isWall) continue;

      const nextKey = key(nr, nc);
      const tentativeG = gScore[currentKey] + 1;

      if (gScore[nextKey] === undefined || tentativeG < gScore[nextKey]) {
        parent[nextKey] = currentKey;
        gScore[nextKey] = tentativeG;
        fScore[nextKey] = tentativeG + heuristic({ row: nr, col: nc }, goal);
        open.push({ row: nr, col: nc, f: fScore[nextKey] });
        pushStep(steps, nextKey, [...visitedSet], open.map((n) => key(n.row, n.col)), 2, `Update score for ${nr},${nc}`);
      }
    }
  }

  pushStep(steps, startKey, [...visitedSet], [], 5, "No path found", []);
  return { steps, path: [] };
}

export const pathfindingAlgorithms = {
  bfs: bfsSteps,
  dfs: dfsSteps,
  dijkstra: dijkstraSteps,
  astar: aStarSteps,
};

export const cellKey = key;