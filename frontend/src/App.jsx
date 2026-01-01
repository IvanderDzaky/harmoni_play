import { Routes, Route, Navigate } from "react-router-dom";
import { PlayerProvider } from "./contexts/PlayerContext";

// PUBLIC PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";

// USER PAGES
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import SearchList from "./pages/SearchList";
import Genre from "./pages/Genre";
import SongDetail from "./pages/SongDetail";
import PlaylistDetail from "./components/layout/PlaylistDetail";

// ARTIST PAGES
import ArtistDashboard from "./pages/artist/ArtistDashboard";
import ArtistDashboardLayout from "./components/artist/ArtistDashboardLayout";
import ArtistMySongs from "./pages/artist/ArtistMySong";
import ArtistUpload from "./pages/artist/ArtistUpload";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDashboardLayout from "./components/admin/AdminDashboardLayout";
import UserManagement from "./pages/admin/UserManagement";
import ArtistVerification from "./pages/admin/ArtistVerification";

// LAYOUTS
import DashboardLayout from "./components/layout/DashboardLayout";

// ROUTES
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <PlayerProvider>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PUBLIC ROUTES */}
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

        {/* USER ROUTES (REGULER / PREMIUM) */}
        <Route element={<ProtectedRoute allowedRoles={["reguler", "premium"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/searchlist" element={<SearchList />} />
            <Route path="/playlist/:id" element={<PlaylistDetail />} />
            <Route path="/genre/:id" element={<Genre />} />
            <Route path="/song/:id" element={<SongDetail />} />
          </Route>
        </Route>

        {/* ARTIST ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["artist"]} />}>
          <Route element={<ArtistDashboardLayout />}>
            <Route path="/artist/dashboard" element={<ArtistDashboard />} />
            <Route path="/artist" element={<Navigate to="/artist/my-songs" replace />} />
            <Route path="/artist/my-songs" element={<ArtistMySongs />} />
            <Route path="/artist/upload" element={<ArtistUpload />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminDashboardLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/artists" element={<ArtistVerification />} />
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </PlayerProvider>
  );
}

export default App;
