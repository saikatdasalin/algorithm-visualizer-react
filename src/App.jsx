import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import AboutPage from "./pages/AboutPage";
import DataStructurePage from "./pages/DataStructurePage";
import HomePage from "./pages/HomePage";
import PathfindingPage from "./pages/PathfindingPage";
import SearchingPage from "./pages/SearchingPage";
import SortingPage from "./pages/SortingPage";

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sorting" element={<SortingPage />} />
          <Route path="/searching" element={<SearchingPage />} />
          <Route path="/pathfinding" element={<PathfindingPage />} />
          <Route path="/data-structures" element={<DataStructurePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;