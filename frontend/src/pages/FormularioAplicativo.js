import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  MenuItem,
  Paper,
  FormControl,
  Select,
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

  const handleCrear = async () => {
    try {
      const dataToSend = {
        nombre: formData.nombre,
        direccion_ip: formData.direccionIP,
        puerto: formData.puerto ? parseInt(formData.puerto) : null,
        url: formData.url,
        tipo_red: formData.tipoRed,
        escalamiento: formData.escalamiento,
        estado: "HABILITADO",
        tipo_aplicativo:
          formData.tipoAplicativo === "Aplicativo ABAI"
            ? "abai"
            : formData.tipoAplicativo === "App Internet"
            ? "internet"
            : "proveedor",
      };

      await axios.post("http://localhost:4000/aplicativo", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Aplicativo creado correctamente");
      onClose();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error al crear el aplicativo.");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        position: "relative",
        maxWidth: 1100,
        mx: "auto",
        backgroundColor: "transparent",
      }}
    >
      {/* Botón cerrar */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: "#666",
          "&:hover": { color: "#1976d2", transform: "scale(1.1)" },
          transition: "0.2s",
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Títulos */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: "#000",
          letterSpacing: 0.8,
        }}
      >
        CREAR APLICATIVO
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        sx={{
          fontWeight: 600,
          color: "#424242",
          mb: 4,
        }}
      >
        INFORMACIÓN PRINCIPAL
      </Typography>

      {/* FORMULARIO ORGANIZADO */}
      <Grid container spacing={3}>
        {/* Nombre (fila completa) */}
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            placeholder="Nombre del aplicativo"
            sx={{
              backgroundColor: "transparent",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
        </Grid>

        {/* URL (fila completa) */}
        <Grid item xs={12}>
          <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="https://miapp.example.com"
            sx={{
              backgroundColor: "transparent",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
        </Grid>

        {/* Tipo de Aplicativo */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small" required>
            <Select
              displayEmpty
              name="tipoAplicativo"
              value={formData.tipoAplicativo}
              onChange={handleChange}
              sx={{
                backgroundColor: "transparent",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#cfd8dc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#90caf9",
                },
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

        {/* Dirección IP */}
        <Grid item xs={12} md={3}>
          <TextField
            label="Dirección IP"
            name="direccionIP"
            value={formData.direccionIP}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="192.168.0.1"
            sx={{
              backgroundColor: "transparent",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
        </Grid>

        {/* Puerto */}
        <Grid item xs={12} md={2}>
          <TextField
            label="Puerto"
            name="puerto"
            type="number"
            value={formData.puerto}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="8080"
            sx={{
              backgroundColor: "transparent",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
        </Grid>

        {/* Tipo de Red */}
        <Grid item xs={12} md={2}>
          <TextField
            label="Tipo de Red"
            name="tipoRed"
            value={formData.tipoRed}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="LAN / WAN / VPN"
            sx={{
              backgroundColor: "transparent",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
        </Grid>

        {/* Escalamiento */}
        <Grid item xs={12} md={2}>
          <TextField
            label="Escalamiento"
            name="escalamiento"
            value={formData.escalamiento}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Nivel 2"
            sx={{
              backgroundColor: "transparent",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Botón Crear */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button
          variant="contained"
          onClick={handleCrear}
          sx={{
            minWidth: 180,
            py: 1.4,
            px: 4,
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "12px",
            backgroundColor: "#1565c0",
            boxShadow: "0px 4px 12px rgba(21,101,192,0.3)",
            "&:hover": {
              backgroundColor: "#0d47a1",
              boxShadow: "0px 5px 14px rgba(13,71,161,0.4)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          CREAR
        </Button>
      </Box>
    </Paper>
  );
};

export default FormularioAplicativo;