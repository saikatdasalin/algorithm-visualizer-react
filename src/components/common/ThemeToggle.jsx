import { FiMoon, FiSun } from "react-icons/fi";
import { useAppStore } from "../../store/useAppStore";

function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <button className="btn btn-ghost btn-sm btn-circle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "algodark" ? <FiSun size={16} /> : <FiMoon size={16} />}
    </button>
  );
}

export default ThemeToggle;
