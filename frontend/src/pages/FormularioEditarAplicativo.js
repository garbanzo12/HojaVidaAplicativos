import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
  IconButton,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "92%",
  maxWidth: 700,
  bgcolor: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
  p: { xs: 3, sm: 5 },
  maxHeight: "90vh",
  overflowY: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
};

const sectionTitle = {
  fontWeight: 700,
  textAlign: "center",
  mt: 4,
  mb: 2,
  color: "#1565c0",
  letterSpacing: 0.5,
};

const FormularioEditarAplicativo = ({ open, onClose, idAplicativo, onUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion_ip: "",
    puerto: "",
    url: "",
    tipo_red: "internet",
    escalamiento: "",
    estado: "HABILITADO",
    campanaId: "",
    tipo_aplicativo: "", 
  });


  const [loading, setLoading] = useState(false);




  // 📌 Cargar datos del aplicativo
  const cargarAplicativo = async () => {
    if (!idAplicativo) return;

    try {
      const { data } = await axios.get(`http://localhost:4000/aplicativo/${idAplicativo}`);

      setFormData({
        nombre: data.nombre || "",
        direccion_ip: data.direccion_ip || "",
        puerto: data.puerto || "",
        url: data.url || "",
        tipo_red: data.tipo_red || "",
        escalamiento: data.escalamiento || "",
        estado: data.estado || "HABILITADO",
        campanaId: data.campanaId || "",
        tipo_aplicativo: data.tipo_aplicativo || "",

      });
    } catch (error) {
      console.error("❌ Error al cargar el aplicativo:", error);
  alert(
    "Error al guardar la matriz. " +
      error.response?.data?.message || error.message
  );    }
  };

  // 🔁 Efecto al abrir modal
  useEffect(() => {
    if (open) {
      cargarAplicativo();
    }
  }, [open, idAplicativo]);

  // 📝 Cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Guardar actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:4000/aplicativo/${idAplicativo}`, formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("❌ Error al actualizar aplicativo:", error);
  alert(
    "Error al guardar la matriz. " +
      error.response?.data?.message || error.message
  );    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={() => null} disableEscapeKeyDown>
      <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
        
        {/* Botón cerrar */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "#555",
            "&:hover": { color: "#1565c0" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          textAlign="center"
          sx={{
            mb: 1,
            color: "#0d47a1",
            letterSpacing: 0.8,
            fontWeight: "bold",
          }}
        >
          EDITAR APLICATIVO
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="subtitle1" sx={sectionTitle}>
          DATOS DEL APLICATIVO
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "nombre", label: "Nombre del Aplicativo" },
            { name: "direccion_ip", label: "Dirección IP" },
            { name: "puerto", label: "Puerto" },
            { name: "url", label: "URL" },
            { name: "tipo_red", label: "Tipo de Red" },
            { name: "escalamiento", label: "Escalamiento" },
          ].map((field) => (
            <Grid item xs={12} sm={10} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                fullWidth
                size="small"
                required
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}


                  {/* SELECT: Tipo de aplicativo */}
        <Grid item xs={12} sm={10}>
          <FormControl fullWidth size="small" required>
            <InputLabel id="tipo-aplicativo-label">Tipo de aplicativo</InputLabel>
            <Select
              labelId="tipo-aplicativo-label"
              name="tipo_aplicativo"
              value={formData.tipo_aplicativo}
              onChange={handleChange}
              label="Tipo de aplicativo"
            >
              <MenuItem value="internet">Internet</MenuItem>
              <MenuItem value="abai">Abai</MenuItem>
              <MenuItem value="proveedor">Proveedor</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        </Grid>

        {/* BOTÓN ACTUALIZAR */}
        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{
              width: "60%",
              py: 1.4,
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
              "&:hover": {
                backgroundColor: "#0d47a1",
                boxShadow: "0 5px 15px rgba(13,71,161,0.4)",
              },
            }}
          >
            {loading ? "Actualizando..." : "ACTUALIZAR APLICATIVO"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormularioEditarAplicativo;
