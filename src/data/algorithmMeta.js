export const sortingMeta = {
  bubble: {
    label: "Bubble Sort",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pseudocode: [
      "for i from 0 to n-1",
      "for j from 0 to n-i-1 compare arr[j], arr[j+1]",
      "if arr[j] > arr[j+1] then swap",
      "end",
    ],
    description: "Repeatedly pushes larger elements toward the end by swapping adjacent pairs.",
  },
  selection: {
    label: "Selection Sort",
    complexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pseudocode: [
      "for i from 0 to n-1",
      "find minimum from i..n-1",
      "update min index when smaller found",
      "swap min with i",
      "end",
    ],
    description: "Selects the minimum from unsorted region and places it at the front each pass.",
  },
  insertion: {
    label: "Insertion Sort",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pseudocode: [
      "for i from 1 to n-1",
      "while j >= 0 and arr[j] > key",
      "shift arr[j] to arr[j+1]",
      "insert key at j+1",
      "end",
    ],
    description: "Builds a sorted prefix by inserting each new element into correct position.",
  },
  merge: {
    label: "Merge Sort",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
    pseudocode: [
      "split array recursively",
      "merge left and right halves",
      "compare heads and write smaller",
      "advance write pointer",
      "drain remaining left",
      "drain remaining right",
      "done",
    ],
    description: "Divide-and-conquer algorithm that recursively splits and merges sorted halves.",
  },
  quick: {
    label: "Quick Sort",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
    pseudocode: [
      "if low < high",
      "choose pivot",
      "partition around pivot",
      "swap when value <= pivot",
      "place pivot in final position",
      "recurse left and right",
    ],
    description: "Partitions around a pivot, then recursively sorts subarrays.",
  },
  heap: {
    label: "Heap Sort",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(1)" },
    pseudocode: [
      "build max heap",
      "compare left child with root",
      "compare right child with current largest",
      "swap and heapify recursively",
      "extract max and shrink heap",
      "repeat",
    ],
    description: "Builds a max-heap then repeatedly extracts maximum to produce sorted order.",
  },
};

export const searchingMeta = {
  linear: {
    label: "Linear Search",
    complexity: { best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
    pseudocode: [
      "iterate from first to last index",
      "if arr[i] equals target return i",
      "continue",
      "return -1",
    ],
  },
  binary: {
    label: "Binary Search",
    complexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
    pseudocode: [
      "set left and right bounds",
      "check middle index",
      "if middle < target move left bound",
      "else move right bound",
      "if bounds cross return -1",
    ],
  },
};

export const pathfindingMeta = {
  bfs: {
    label: "Breadth-First Search",
    complexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
    pseudocode: [
      "enqueue start node",
      "dequeue front and explore",
      "enqueue unvisited neighbors",
      "stop when goal reached",
      "if queue empty => no path",
    ],
  },
  dfs: {
    label: "Depth-First Search",
    complexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)", space: "O(V)" },
    pseudocode: [
      "push start node on stack",
      "pop node and mark visited",
      "push unvisited neighbors",
      "stop when goal reached",
      "if stack empty => no path",
    ],
  },
  dijkstra: {
    label: "Dijkstra",
    complexity: { best: "O((V+E) log V)", average: "O((V+E) log V)", worst: "O((V+E) log V)", space: "O(V)" },
    pseudocode: [
      "initialize distances",
      "pick min-distance frontier node",
      "relax adjacent edges",
      "stop when goal reached",
      "if frontier empty => no path",
    ],
  },
  astar: {
    label: "A* Pathfinding",
    complexity: { best: "O(E)", average: "O(E)", worst: "O(E log V)", space: "O(V)" },
    pseudocode: [
      "set gScore and fScore",
      "pick node with lowest fScore",
      "update neighbor scores",
      "stop when goal reached",
      "if open set empty => no path",
    ],
  },
};