import React, { useState, useEffect } from "react";
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

  const [campanas, setCampanas] = useState([]); // ← aquí se guardan las campañas desde la BD

  // 🔹 Cargar campañas al montar el componente
  useEffect(() => {
    const fetchCampanas = async () => {
      try {
        const res = await axios.get("http://localhost:4000/campana");
        if (res.data.success) {
          setCampanas(res.data.campanas);
        } else {
          console.log(res.data.campanas)
          console.error("Error al obtener campañas:", res.data.message);
        }
      } catch (err) {
        console.error("❌ Error al cargar campañas:", err.message);
      }
    };
    fetchCampanas();
  }, []);

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
        campanaId: parseInt(formData.tipoCampana) || null,
        estado: "HABILITADO",
        tipo_aplicativo:
          formData.tipoAplicativo === "Aplicativo ABAI"
            ? "abai"
            : formData.tipoAplicativo === "App Internet"
            ? "internet"
            : "proveedor",
      };

      const response = await axios.post("http://localhost:4000/aplicativo", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Aplicativo creado:", response.data);
      alert("✅ Aplicativo creado correctamente");
      onClose();
    } catch (error) {
      console.error("❌ Error al crear el aplicativo:", error.response?.data || error.message);
      alert("❌ Error al crear el aplicativo. Revisa la consola para más detalles.");
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

      <Grid container spacing={3} justifyContent="center">
        {/* Tipo de aplicativo */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small" required>
            <Select
              displayEmpty
              name="tipoAplicativo"
              value={formData.tipoAplicativo}
              onChange={handleChange}
              sx={{
                borderRadius: 2,
                backgroundColor: "transparent",
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

        {/* Campos de texto */}
        {[
          { label: "Nombre", name: "nombre" },
          { label: "Dirección IP", name: "direccionIP", placeholder: "192.168.0.1" },
          { label: "Puerto", name: "puerto", placeholder: "8080", type: "number" },
          { label: "URL", name: "url", placeholder: "https://miapp.example" },
          { label: "Tipo de Red", name: "tipoRed", placeholder: "Ej: LAN, WAN, VPN..." },
          { label: "Escalamiento", name: "escalamiento", placeholder: "Ej: Nivel 2" },
        ].map((field) => (
          <Grid
            item
            xs={12}
            md={field.name === "nombre" || field.name === "direccionIP" ? 4 : 6}
            key={field.name}
          >
            <TextField
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={formData[field.name]}
              onChange={handleChange}
              fullWidth
              size="small"
              placeholder={field.placeholder}
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
        ))}

        {/* Selector de campaña */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="small" required>
            <Select
              displayEmpty
              name="tipoCampana"
              value={formData.tipoCampana}
              onChange={handleChange}
              sx={{
                borderRadius: 2,
                backgroundColor: "transparent",
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

              {/* 🔹 Campañas dinámicas desde la BD */}
              {campanas.map((campana) => (
                <MenuItem key={campana.id} value={campana.id}>
                  {campana.nombre_campana}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default FormularioAplicativo;
