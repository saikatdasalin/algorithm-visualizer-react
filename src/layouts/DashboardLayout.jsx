import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";

const shortcutMap = {
  s: "/sorting",
  f: "/searching",
  p: "/pathfinding",
  d: "/data-structures",
  h: "/",
};

function DashboardLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        return;
      }

      if (event.shiftKey && shortcutMap[event.key]) {
        navigate(shortcutMap[event.key]);
        toast.success(`Shortcut: moved to ${shortcutMap[event.key]}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="mx-auto flex max-w-[1700px] gap-4 p-3 md:p-4">
      <Sidebar />
      <main className="w-full min-w-0">
        <TopNavbar />
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;