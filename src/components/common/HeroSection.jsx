import { motion as Motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="panel-glass relative overflow-hidden rounded-3xl p-6 md:p-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10" />
      <div className="relative grid gap-6 lg:grid-cols-[1.3fr,1fr]">
        <div>
          <Motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl font-bold leading-tight md:text-5xl"
          >
            Visualize Algorithms With <span className="gradient-text">Interactive Precision</span>
          </Motion.h1>
          <p className="mt-4 max-w-2xl text-sm text-base-content/80 md:text-base">
            Explore sorting, searching, pathfinding, and data structures in real time with step controls,
            pseudo-code synchronization, and detailed complexity insights.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/sorting" className="btn btn-primary">
              Start Sorting <FiArrowRight />
            </Link>
            <Link to="/pathfinding" className="btn btn-outline btn-info">
              Explore Pathfinding
            </Link>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-2xl bg-base-200/70 p-4">
            <p className="text-xs uppercase tracking-wider text-base-content/60">Realtime Controls</p>
            <p className="mt-1 font-display text-xl">Start, pause, resume, reset, and speed tune every run.</p>
          </div>
          <div className="rounded-2xl bg-base-200/70 p-4">
            <p className="text-xs uppercase tracking-wider text-base-content/60">Portfolio Ready</p>
            <p className="mt-1 font-display text-xl">Clean, modern, responsive interface with polished transitions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
