import React, { useState, useEffect } from "react";
import { 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  InputAdornment,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../img/abai-logo.png";
import Fondo from "../img/2.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [alerta, setAlerta] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const navigate = useNavigate();
  const { user, login } = useAuth();


  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        correo: form.email,
        contrasena: form.password,
      });

      localStorage.setItem("token", res.data.token);
      login(res.data.token, res.data.usuario);

      setAlerta({
        open: true,
        message: "Inicio de sesión exitoso 💖",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      setAlerta({
        open: true,
        message: error.response?.data?.error || "Error al iniciar sesión",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Fondo */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${Fondo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
            zIndex: 0,
          }}
        />

        {/* Overlay oscuro elegante */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
            zIndex: 1,
          }}
        />

        {/* Card */}
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            zIndex: 2,
            borderRadius: 4,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <img src={logo} alt="Logo ABAI" width={120} />
            </Box>

            {/* Título */}
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: 700,
                mb: 1,
                color: "#000000ff",
              }}
            >
              Bienvenido
            </Typography>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "text.secondary", mb: 4 }}
            >
              Inicia sesión para continuar
            </Typography>

            {/* Formulario */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                label="Correo electrónico"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label="Contraseña"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ textAlign: "center" }}>
                <Button
                  onClick={() => navigate("/recuperar-password")}
                  sx={{
                    textTransform: "none",
                    color: "#0b32e2",
                    fontWeight: 600,
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #1c4ae2 0%, #3a6ad3 100%)",
                  fontWeight: 600,
                  fontSize: 16,
                  textTransform: "none",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(28,74,226,0.6)",
                  },
                }}
              >
                Iniciar sesión
              </Button>

              <Divider sx={{ my: 2 }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* ALERTA HERMOSA */}
      <Snackbar
        open={alerta.open}
        autoHideDuration={4000}
        onClose={() => setAlerta({ ...alerta, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlerta({ ...alerta, open: false })}
          severity={alerta.severity}
          variant="filled"
          sx={{
            fontSize: "15px",
            borderRadius: 3,
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            alignItems: "center",
          }}
        >
          {alerta.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
