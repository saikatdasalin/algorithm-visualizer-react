# AlgoScope

AlgoScope is an interactive algorithm and data-structure visualizer built with React + Vite.

## Tech Stack
- React 19
- Vite
- Tailwind CSS (custom component utility layer)
- Zustand (global app state)
- Framer Motion (animations)
- Recharts (comparison charts)
- React Hot Toast (notifications)

## Features
- Sorting visualizer (Bubble, Selection, Insertion, Merge, Quick, Heap)
- Searching visualizer (Linear, Binary)
- Pathfinding visualizer (BFS, DFS, Dijkstra, A*)
- Data-structure playground (Stack, Queue, Linked List, Binary Tree, BST)
- Playback controls: start, pause, resume, reset
- Runtime metrics and pseudocode sync
- Save/load arrays in sorting workspace
- Export sorting board as image
- Keyboard navigation shortcuts (`Shift+H`, `Shift+S`, `Shift+F`, `Shift+P`, `Shift+D`)
- Dark mode default with theme toggle

## Getting Started
```bash
npm install
npm run dev
```

App runs by default on Vite dev server:
- `http://localhost:5173`

## Scripts
- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## Project Structure
```text
src/
  algorithms/           # sorting, searching, pathfinding logic
  components/
    common/             # reusable UI blocks
    layout/             # sidebar, top navbar
    visualizers/        # bars, grid, structure nodes
  data/                 # metadata and navigation config
  hooks/                # playback hook
  layouts/              # route layout wrapper
  pages/                # route screens
  store/                # Zustand app store
  utils/                # export and random helpers
```

## Build
```bash
npm run build
```
