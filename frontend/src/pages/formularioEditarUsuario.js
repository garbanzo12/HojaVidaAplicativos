import React, { useEffect, useState } from "react";
import axios from "axios";

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
  Paper,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FormularioEditarUsuario = ({ usuario, onClose = () => {}, onUpdated = () => {} }) => {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    correo: "",
    tipo_documento: "",
    numero_documento: "",
    sede: "",
    rol: "",
  });

  /** CARGAR DATOS DEL USUARIO AL ABRIR */
  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre_completo: usuario.nombre_completo || "",
        correo: usuario.correo || "",
        tipo_documento: usuario.tipo_documento || "",
        numero_documento: usuario.numero_documento || "",
        sede: usuario.sede || "",
        rol: usuario.rol || "",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** ACTUALIZAR USUARIO */
  const handleActualizar = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/usuario/${usuario.id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Usuario actualizado:", response.data);
      alert("✅ Usuario actualizado correctamente");

      onUpdated(); // refrescar tabla
      onClose();   // cerrar modal
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error.response?.data || error.message);
      alert("❌ Error al actualizar el usuario. Mira la consola.");
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
      }}
    >
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
        EDITAR USUARIO
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
        MODIFICAR INFORMACIÓN
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Nombre */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Nombre Completo"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            fullWidth
            size="small"
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
          />
        </Grid>

        {/* Tipo Documento */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Tipo Documento</InputLabel>
            <Select
              label="Tipo Documento"
              name="tipo_documento"
              value={formData.tipo_documento}
              onChange={handleChange}
            >
              <MenuItem value="DIE">DIE</MenuItem>
              <MenuItem value="PEP">PEP</MenuItem>
              <MenuItem value="CC">CC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Número Documento */}
        <Grid item xs={12} md={6}>
          <TextField
            label="Número Documento"
            name="numero_documento"
            type="number"
            value={formData.numero_documento}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>

        {/* Sede */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Sede</InputLabel>
            <Select
              label="Sede"
              name="sede"
              value={formData.sede}
              onChange={handleChange}
            >
              <MenuItem value="pereira">Pereira</MenuItem>
              <MenuItem value="bogota">Bogotá</MenuItem>
              <MenuItem value="manizales">Manizales</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Rol */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Rol</InputLabel>
            <Select
              label="Rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
            >
              <MenuItem value="proveedor">Proveedor</MenuItem>
              <MenuItem value="administrador">Administrador</MenuItem>
            </Select>
          </FormControl>
        </Grid>


      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button
          variant="contained"
          onClick={handleActualizar}
          sx={{
            minWidth: 180,
            py: 1.4,
            px: 4,
            backgroundColor: "#1565c0",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "12px",
            transition: "0.3s",
            "&:hover": { backgroundColor: "#0d47a1" },
          }}
        >
          ACTUALIZAR
        </Button>
      </Box>
    </Paper>
  );
};

export default FormularioEditarUsuario;
