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
  Paper,
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
    tipoCampana: "",
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
    <Paper
      elevation={6}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 4,
        position: "relative",
        maxWidth: 750,
        mx: "auto",
        background:
          "linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%)",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.05)",
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

      {/* Campos */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small" required>
            <Select
              displayEmpty
              name="tipoAplicativo"
              value={formData.tipoAplicativo}
              onChange={handleChange}
              sx={{
                borderRadius: 2,
                backgroundColor: "#fff",
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

        <Grid item xs={12} md={4}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            size="small"
            required
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
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
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
        </Grid>

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
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
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
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Tipo de Red"
            name="tipoRed"
            value={formData.tipoRed}
            onChange={handleChange}
            fullWidth
            size="small"
            placeholder="Ej: LAN, WAN, VPN..."
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
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
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#cfd8dc" },
                "&:hover fieldset": { borderColor: "#90caf9" },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small" required>
            <Select
              displayEmpty
              name="tipoCampana"
              value={formData.tipoCampana}
              onChange={handleChange}
              sx={{
                borderRadius: 2,
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#cfd8dc",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#90caf9",
                },
              }}
            >
              <MenuItem value="" disabled>
                Seleccione Campaña
              </MenuItem>
              <MenuItem value="Claro">Claro</MenuItem>
              <MenuItem value="Tigo">Tigo</MenuItem>
              <MenuItem value="Movistar">Movistar</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Botón crear */}
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

export default FormularioAplicativo;
