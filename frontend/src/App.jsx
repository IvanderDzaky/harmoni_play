import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import SearchList from "./pages/SearchList";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import PlaylistDetail from "./components/layout/PlaylistDetail";
import Genre from "./pages/Genre";

function App() {
  return (
    <Routes>
      {/* default route */}
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
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      <Route path="/searchlist" element={
        <ProtectedRoute>
          <SearchList />
        </ProtectedRoute>
        } />
      
       <Route path="/playlist/:id" element={
        <ProtectedRoute>
          <PlaylistDetail />
        </ProtectedRoute>
        } />

        <Route path="/genre/:id" element={
          <ProtectedRoute>
            <Genre />
          </ProtectedRoute>
        } />
       </Routes>
  );
}

export default App;
