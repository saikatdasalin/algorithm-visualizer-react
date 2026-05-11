import { createElement, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import appLogo from "../../assets/logo.png";
import { navItems } from "../../data/navigation";
import { useAppStore } from "../../store/useAppStore";

const linkBase =
  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200";

function Sidebar() {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const isMobileMenuOpen = useAppStore((state) => state.isMobileMenuOpen);
  const closeMobileMenu = useAppStore((state) => state.closeMobileMenu);
  const { pathname } = useLocation();

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  const renderLinks = ({ compact = false, onClick } = {}) =>
    navItems.map(({ label, path, icon }) => (
      <NavLink
        key={path}
        to={path}
        onClick={onClick}
        className={({ isActive }) =>
          `${linkBase} ${compact ? "justify-center px-0" : ""} ${
            isActive
              ? "bg-gradient-to-r from-teal-500/30 to-sky-500/30 text-base-content shadow-glow"
              : "hover:bg-base-200/60 text-base-content/80"
          }`
        }
      >
        {createElement(icon, { size: 18, className: "shrink-0" })}
        {!compact && <span>{label}</span>}
      </NavLink>
    ));

  return (
    <>
      <Motion.aside
        animate={{ width: isSidebarOpen ? 250 : 88 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="panel-glass sticky top-0 hidden h-screen shrink-0 overflow-hidden rounded-2xl ring-0 lg:block"
      >
        <div className="flex h-full flex-col">
          <div className="px-4 py-5">
            {isSidebarOpen ? (
              <div className="flex items-center gap-3">
                <img src={appLogo} alt="AlgoScope logo" className="h-10 w-10 rounded-xl object-cover shadow-md" />
                <div>
                  <h1 className="font-display text-xl font-bold">
                    <span className="gradient-text">AlgoScope</span>
                  </h1>
                  <p className="mt-1 text-xs text-base-content/70">Interactive Learning Lab</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="rounded-xl bg-gradient-to-br from-teal-500/20 to-sky-500/20 p-1.5">
                  <img src={appLogo} alt="AlgoScope logo" className="h-8 w-8 rounded-lg object-cover" />
                </div>
              </div>
            )}
          </div>
          <nav className="flex-1 space-y-1 px-3">{renderLinks({ compact: !isSidebarOpen })}</nav>
          <div className="p-3 text-xs text-base-content/50">v1.0.0</div>
        </div>
      </Motion.aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-slate-950/55"
            onClick={closeMobileMenu}
          />
          <Motion.aside
            initial={{ x: -280, opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="panel-glass absolute left-0 top-0 h-full w-72 overflow-y-auto rounded-r-2xl p-4 ring-0"
          >
            <div className="mb-4 flex items-center gap-3">
              <img src={appLogo} alt="AlgoScope logo" className="h-10 w-10 rounded-xl object-cover shadow-md" />
              <div>
                <h1 className="font-display text-xl font-bold">
                  <span className="gradient-text">AlgoScope</span>
                </h1>
                <p className="mt-1 text-xs text-base-content/70">Interactive Learning Lab</p>
              </div>
            </div>
            <nav className="space-y-1">{renderLinks({ onClick: closeMobileMenu })}</nav>
          </Motion.aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
