import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import SearchList from "./pages/SearchList";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

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

    </Routes>
  );
}

export default App;
