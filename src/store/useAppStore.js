import { create } from "zustand";

const resolveInitialTheme = () => {
  const stored = localStorage.getItem("algo-theme");
  if (stored === "algodark" || stored === "algolight") return stored;
  return "algodark";
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

export const useAppStore = create((set, get) => ({
  theme: "algodark",
  soundEnabled: true,
  savedArrays: [],
  isSidebarOpen: true,
  isMobileMenuOpen: false,
  initializeTheme: () => {
    const theme = resolveInitialTheme();
    applyTheme(theme);
    set({ theme });
  },
  toggleTheme: () => {
    const nextTheme = get().theme === "algodark" ? "algolight" : "algodark";
    applyTheme(nextTheme);
    localStorage.setItem("algo-theme", nextTheme);
    set({ theme: nextTheme });
  },
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  saveArray: (entry) =>
    set((state) => ({
      savedArrays: [entry, ...state.savedArrays.filter((item) => item.name !== entry.name)].slice(0, 10),
    })),
  removeSavedArray: (name) =>
    set((state) => ({
      savedArrays: state.savedArrays.filter((item) => item.name !== name),
    })),
}));
