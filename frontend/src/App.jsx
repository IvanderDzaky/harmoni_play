import { Routes, Route, Navigate } from "react-router-dom";
import { PlayerProvider } from "./contexts/PlayerContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import SearchList from "./pages/SearchList";
import Genre from "./pages/Genre";
import SongDetail from "./pages/SongDetail";
import PlaylistDetail from "./components/layout/PlaylistDetail";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <PlayerProvider>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PUBLIC */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          {/* LAYOUT */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/searchlist" element={<SearchList />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />
            <Route path="/genre/:id" element={<Genre />} />
            <Route path="/song/:id" element={<SongDetail />} />
          </Route>
        </Route>
      </Routes>
    </PlayerProvider>
  );
}

export default App;
