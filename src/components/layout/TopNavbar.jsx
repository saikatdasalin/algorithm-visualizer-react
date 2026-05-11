import { FiMenu, FiVolume2, FiVolumeX } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import ThemeToggle from "../common/ThemeToggle";

const pageTitles = {
  "/": "Dashboard",
  "/sorting": "Sorting Visualizer",
  "/searching": "Searching Visualizer",
  "/pathfinding": "Pathfinding Visualizer",
  "/data-structures": "Data Structures",
  "/about": "About AlgoScope",
};

function TopNavbar() {
  const { pathname } = useLocation();
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const toggleSound = useAppStore((state) => state.toggleSound);
  const handleMenuToggle = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      toggleSidebar();
      return;
    }
    toggleMobileMenu();
  };

  return (
    <header className="panel-glass sticky top-0 z-30 mb-4 rounded-2xl px-4 py-3 ring-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="btn btn-ghost btn-sm" onClick={handleMenuToggle} aria-label="Toggle sidebar">
            <FiMenu size={18} />
          </button>
          <div>
            <p className="text-xs uppercase tracking-wider text-base-content/60">Algorithm Studio</p>
            <h2 className="font-display text-lg font-semibold">{pageTitles[pathname] ?? "AlgoScope"}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm btn-circle" onClick={toggleSound} aria-label="Toggle sound effects">
            {soundEnabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;
