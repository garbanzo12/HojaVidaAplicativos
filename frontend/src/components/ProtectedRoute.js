import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // puedes poner spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
