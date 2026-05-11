import { motion as Motion } from "framer-motion";
import { FiActivity, FiDatabase, FiGrid, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import HeroSection from "../components/common/HeroSection";

const features = [
  {
    title: "Sorting Lab",
    text: "Animate Bubble, Selection, Insertion, Merge, Quick, and Heap Sort with operation-level highlights.",
    icon: FiActivity,
    path: "/sorting",
  },
  {
    title: "Search Lab",
    text: "Understand Linear and Binary Search with target-focused step replay and comparisons.",
    icon: FiSearch,
    path: "/searching",
  },
  {
    title: "Pathfinding Lab",
    text: "Run BFS, DFS, Dijkstra, and A* over a grid with visited/frontier/path states.",
    icon: FiGrid,
    path: "/pathfinding",
  },
  {
    title: "Structure Lab",
    text: "Interact with Stack, Queue, Linked List, Binary Tree, and BST operations.",
    icon: FiDatabase,
    path: "/data-structures",
  },
];

function HomePage() {
  return (
    <div className="space-y-5 pb-6">
      <HeroSection />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => (
          <Motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="panel-glass group rounded-2xl p-4"
          >
            <feature.icon className="text-primary transition-transform duration-200 group-hover:scale-110" size={20} />
            <h3 className="mt-3 font-display text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-base-content/70">{feature.text}</p>
            <Link to={feature.path} className="btn btn-ghost btn-sm mt-3 px-0 text-primary">
              Open Workspace
            </Link>
          </Motion.div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="panel-glass rounded-2xl p-5 xl:col-span-2">
          <h3 className="font-display text-2xl font-semibold">Keyboard Shortcuts</h3>
          <p className="mt-2 text-sm text-base-content/70">Use Shift + key from anywhere outside input fields.</p>
          <div className="mt-4 grid gap-2 text-sm md:grid-cols-3">
            <p className="rounded-xl bg-base-200/80 p-3">`Shift + H` Home</p>
            <p className="rounded-xl bg-base-200/80 p-3">`Shift + S` Sorting</p>
            <p className="rounded-xl bg-base-200/80 p-3">`Shift + F` Searching</p>
            <p className="rounded-xl bg-base-200/80 p-3">`Shift + P` Pathfinding</p>
            <p className="rounded-xl bg-base-200/80 p-3">`Shift + D` Data Structures</p>
          </div>
        </div>
        <div className="panel-glass rounded-2xl p-5">
          <h3 className="font-display text-2xl font-semibold">Learning Modes</h3>
          <ul className="mt-4 space-y-2 text-sm text-base-content/80">
            <li>Step-by-step execution</li>
            <li>Pseudo-code synchronization</li>
            <li>Complexity insights</li>
            <li>Algorithm comparison chart</li>
            <li>Export visualization as image</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default HomePage;