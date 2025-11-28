import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import Fondo from "../img/2.jpg";

const CambiarPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token"); // token desde ?token=...

  const [showNueva, setShowNueva] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  const [form, setForm] = useState({
    nueva: "",
    confirmar: "",
  });

  const [alerta, setAlerta] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!form.nueva || !form.confirmar) {
      return setAlerta({
        open: true,
        message: "Todos los campos son obligatorios",
        severity: "warning",
      });
    }

    if (form.nueva.length < 5) {
      return setAlerta({
        open: true,
        message: "La nueva contraseña debe tener mínimo 5 caracteres",
        severity: "warning",
      });
    }

    if (form.nueva !== form.confirmar) {
      return setAlerta({
        open: true,
        message: "Las contraseñas no coinciden",
        severity: "warning",
      });
    }

    if (!token) {
      return setAlerta({
        open: true,
        message:
          "Token no encontrado. Abre el enlace que te llegó por correo o pega el token en la URL como ?token=...",
        severity: "error",
      });
    }

    try {
      // Enviar token y nueva contraseña EN EL BODY (POST)
      const res = await axios.post("http://localhost:4000/auth/reset-password", {
        token,
        newPassword: form.nueva,
      });

      setAlerta({
        open: true,
        message: res.data?.message || "Contraseña restablecida correctamente 💖",
        severity: "success",
      });

      setForm({ nueva: "", confirmar: "" });

      // Opcional: redirigir al login después de 2s
      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (error) {
      setAlerta({
        open: true,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Error al restablecer la contraseña",
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

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
            zIndex: 1,
          }}
        />

        <Card
          sx={{
            width: "100%",
            maxWidth: 450,
            zIndex: 2,
            borderRadius: 4,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 25px 70px rgba(0,0,0,0.5)",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Lock sx={{ fontSize: 50, color: "#1c4ae2" }} />
            </Box>

            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: 700, mb: 1 }}
            >
              Restablecer contraseña
            </Typography>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                mb: 4,
              }}
            >
              Ingresa tu nueva contraseña para continuar
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              <TextField
                label="Nueva contraseña"
                name="nueva"
                type={showNueva ? "text" : "password"}
                value={form.nueva}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNueva(!showNueva)}>
                        {showNueva ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirmar nueva contraseña"
                name="confirmar"
                type={showConfirmar ? "text" : "password"}
                value={form.confirmar}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmar(!showConfirmar)}
                      >
                        {showConfirmar ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Divider />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.4,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 16,
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, #1c4ae2 0%, #3a6ad3 100%)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(28,74,226,0.6)",
                  },
                }}
              >
                Restablecer contraseña
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

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
          }}
        >
          {alerta.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CambiarPassword;
