import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function useAuthGuard(allowedRoles = []) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // Expiración del token
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        localStorage.removeItem("token");
        navigate("/");
        return;
      }

    

    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate, allowedRoles]);
}
