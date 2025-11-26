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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FormularioUsuario = ({ onClose = () => {} }) => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correo: "",
    cargo: "",
    cedula: "",
    sede: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrear = async () => {
    try {
      const dataToSend = {
        nombre_completo: formData.nombreCompleto,
        correo: formData.correo,
        cargo: formData.cargo,
        cedula: formData.cedula,
        sede: formData.sede,
        estado: "ACTIVO",
      };

      const response = await axios.post(
        "http://localhost:4000/usuario",
        dataToSend,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Usuario creado:", response.data);
      alert("✅ Usuario creado correctamente");
      onClose();
    } catch (error) {
      console.error("❌ Error al crear usuario:", error.response?.data || error.message);
      alert("❌ Error al crear el usuario. Mira la consola.");
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        position: "relative",
        maxWidth: 750,
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
          color: "#000000ff",
          letterSpacing: 0.8,
        }}
      >
        CREAR USUARIO
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

      {/* GRID CAMPOS */}
      <Grid container spacing={3} justifyContent="center">

        {/* Nombre Completo */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Nombre Completo"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            fullWidth
            size="small"
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

        {/* Correo */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Correo"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="usuario@empresa.com"
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

        {/* Cargo */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Cargo"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            fullWidth
            size="small"
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

        {/* Cédula */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Cédula"
            name="cedula"
            type="number"
            value={formData.cedula}
            onChange={handleChange}
            fullWidth
            size="small"
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

        {/* Sede (Select) */}
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            size="small"
            label="Sede"
            name="sede"
            value={formData.sede}
            onChange={handleChange}
            sx={{
              backgroundColor: "transparent",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          >
            <MenuItem value="" disabled>
              Seleccione Sede
            </MenuItem>
            <MenuItem value="Pereira">Pereira</MenuItem>
            <MenuItem value="Bogota">Bogota</MenuItem>
            <MenuItem value="Manizales">Manizales</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Botón Crear */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Button
          variant="contained"
          onClick={handleCrear}
          sx={{
            minWidth: 180,
            py: 1.4,
            px: 4,
            backgroundColor: "#1565c0",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(21,101,192,0.3)",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#0d47a1",
              boxShadow: "0px 5px 14px rgba(13,71,161,0.4)",
              transform: "translateY(-2px)",
            },
          }}
        >
          CREAR
        </Button>
      </Box>
    </Paper>
  );
};

export default FormularioUsuario;
