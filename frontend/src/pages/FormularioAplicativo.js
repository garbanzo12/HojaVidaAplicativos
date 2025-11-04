import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
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
    responsable: "",
    correo: "",
    fechaActualizacion: "",
  });

  const tiposAplicativo = [
    "Aplicativo ABAI",
    "App Proveedor",
    "App Internet",
  ];

  const tiposRed = ["LAN", "WAN", "VPN", "Internet", "Intranet"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleCrear = () => {
    console.log("Creando aplicativo:", formData);
    alert("✅ Aplicativo creado correctamente");
    onClose();
  };

  const handleActualizar = () => {
    console.log("Actualizando aplicativo:", formData);
    alert(" Aplicativo actualizado correctamente");
    onClose();
  };

  return (
    <Box
      sx={{
        position: "relative",
        p: { xs: 2, sm: 3, md: 4 },
        maxHeight: "80vh",
        overflowY: "auto",
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
        aria-label="cerrar"
      >
        <CloseIcon />
      </IconButton>

      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "700", mb: 2, letterSpacing: 0.6 }}
      >
        CREAR FORMULARIO
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
      >
        INFORMACIÓN PRINCIPAL
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Tipo de Aplicativo *"
            name="tipoAplicativo"
            value={formData.tipoAplicativo}
            onChange={handleChange}
            fullWidth
            size="small"
          >
            {tiposAplicativo.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre *"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Dirección IP"
            name="direccionIP"
            value={formData.direccionIP}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="192.168.0.1"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Puerto"
            name="puerto"
            type="number"
            value={formData.puerto}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="https://miapp.example"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Tipo de Red"
            name="tipoRed"
            value={formData.tipoRed}
            onChange={handleChange}
            fullWidth
            size="small"
          >
            {tiposRed.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
      >
        RESPONSABLES / CONTACTOS
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Responsable"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Correo"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Escalamiento"
            name="escalamiento"
            value={formData.escalamiento}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha actualización"
            name="fechaActualizacion"
            type="date"
            value={formData.fechaActualizacion}
            onChange={handleChange}
            fullWidth
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          mt: 1,
          pb: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleCrear}
          sx={{ minWidth: 140 }}
        >
          CREAR
        </Button>

        <Button
          variant="outlined"
          onClick={handleActualizar}
          sx={{ minWidth: 140 }}
        >
          ACTUALIZAR
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioAplicativo;
