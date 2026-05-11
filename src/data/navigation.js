import { FiActivity, FiDatabase, FiGrid, FiHome, FiInfo, FiSearch } from "react-icons/fi";

export const navItems = [
  { label: "Home", path: "/", icon: FiHome },
  { label: "Sorting", path: "/sorting", icon: FiActivity },
  { label: "Searching", path: "/searching", icon: FiSearch },
  { label: "Pathfinding", path: "/pathfinding", icon: FiGrid },
  { label: "Data Structures", path: "/data-structures", icon: FiDatabase },
  { label: "About", path: "/about", icon: FiInfo },
];