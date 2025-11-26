import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Estado inicial cargando el token
  if (user === undefined) {
    return <div>Cargando...</div>;
  }

  // No hay sesión → login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
