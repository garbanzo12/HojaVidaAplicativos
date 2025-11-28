import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import RecuperarPassword from "./pages/recuperarContrasena.js";
import CambiarPassword from "./pages/cambiarContrasena.js";
import { AuthProvider } from "./context/AuthContext.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import PublicRoute from "./components/PublicRoute.js";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Login: solo accesible si NO está logueado */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Recuperar contraseña: también es pública */}
          <Route
            path="/recuperar-password"
            element={
              <PublicRoute>
                <RecuperarPassword />
              </PublicRoute>
            }
          />

          {/* Dashboard: solo accesible si SI está logueado */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cambiar-password"
            element={
              <PublicRoute>
                <CambiarPassword />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
