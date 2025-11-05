import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FormularioAplicativo = ({ onClose = () => {} }) => {
  const [formData, setFormData] = useState({
    tipoAplicativo: "",
    nombre: "",
    direccionIP: "",
    puerto: "",
    url: "",
    tipoRed: "",
    escalamiento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrear = () => {
    console.log("Creando aplicativo:", formData);
    alert("✅ Aplicativo creado correctamente");
    onClose();
  };

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        position: "relative",
        maxWidth: 800,
        mx: "auto",
        backgroundColor: "transparent", // 🔹 Fondo completamente transparente
        boxShadow: "none", // 🔹 Sin sombra blanca
      }}
    >
      {/* Botón cerrar */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: "#555",
          "&:hover": { color: "#1565c0" },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Título principal */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: "#0d47a1",
          letterSpacing: 0.8,
        }}
      >
        CREAR APLICATIVO
      </Typography>

      <Typography
        variant="subtitle2"
        align="center"
        sx={{
          fontWeight: 600,
          color: "#424242",
          mb: 3,
        }}
      >
        INFORMACIÓN PRINCIPAL
      </Typography>

      {/* Campos del formulario */}
      <Grid container spacing={2} justifyContent="center">
        {/* Primera fila */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small" required>
            <Select
              displayEmpty
              name="tipoAplicativo"
              value={formData.tipoAplicativo}
              onChange={handleChange}
              sx={{
                borderRadius: "6px",
                backgroundColor: "rgba(255,255,255,0.9)", // 🔹 Leve transparencia
              }}
            >
              <MenuItem value="" disabled>
                Seleccione Aplicativo
              </MenuItem>
              <MenuItem value="Aplicativo ABAI">Aplicativo ABAI</MenuItem>
              <MenuItem value="App Proveedor">App Proveedor</MenuItem>
              <MenuItem value="App Internet">App Internet</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Nombre *"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "6px" }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Dirección IP"
            name="direccionIP"
            value={formData.direccionIP}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="192.168.0.1"
            sx={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "6px" }}
          />
        </Grid>

        {/* Segunda fila */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Puerto"
            name="puerto"
            type="number"
            value={formData.puerto}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="8080"
            sx={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "6px" }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="https://miapp.example"
            sx={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "6px" }}
          />
        </Grid>

        {/* Tercera fila */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Tipo de Red"
            name="tipoRed"
            value={formData.tipoRed}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: LAN, WAN, VPN..."
            sx={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "6px" }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Escalamiento"
            name="escalamiento"
            value={formData.escalamiento}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: Nivel 2"
            sx={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "6px" }}
          />
        </Grid>
      </Grid>

      {/* Botón crear */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={handleCrear}
          sx={{
            minWidth: 160,
            py: 1,
            backgroundColor: "#1565c0",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "0.95rem",
            borderRadius: "10px",
            boxShadow: "0px 3px 8px rgba(21,101,192,0.3)",
            "&:hover": {
              backgroundColor: "#0d47a1",
              boxShadow: "0px 4px 10px rgba(13,71,161,0.4)",
            },
          }}
        >
          CREAR
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioAplicativo;
