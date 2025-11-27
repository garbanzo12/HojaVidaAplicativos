import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import EmailIcon from "@mui/icons-material/Email";
import Fondo from "../img/2.jpg"; // MISMO FONDO DEL LOGIN

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor ingresa tu correo");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Simulación de backend
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMensajeExito(true);
      setEmail("");
    } catch (err) {
      setError("Error al enviar el correo");
    } finally {
      setLoading(false);
    }
  };

  return (
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
      {/* Fondo blur */}
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

      {/* Overlay oscuro */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
          zIndex: 1,
        }}
      />

      {/* Card glass */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 4,
          padding: 5,
          textAlign: "center",
          zIndex: 2,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 25px 70px rgba(0,0,0,0.45)",
        }}
      >
        <LockResetIcon sx={{ fontSize: 65, color: "#0b32e2" }} />

        <Typography variant="h5" fontWeight="bold" mt={1}>
          Recuperar contraseña
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña
        </Typography>

        {mensajeExito && (
          <Alert severity="success" sx={{ mb: 2 }}>
            ¡Correo enviado correctamente! Revisa tu bandeja 💙
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            label="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#667eea" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              height: 45,
              borderRadius: 3,
              fontWeight: 600,
              background:
                "linear-gradient(135deg, #1c4ae2 0%, #3a6ad3 100%)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(28,74,226,0.6)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Enviar enlace"
            )}
          </Button>
        </Box>

        <Typography
          variant="body2"
          mt={3}
          sx={{
            cursor: "pointer",
            fontWeight: 600,
            color: "#0b32e2",
          }}
          onClick={() => window.history.back()}
        >
          Volver al inicio de sesión
        </Typography>
      </Paper>
    </Box>
  );
};

export default RecuperarPassword;
