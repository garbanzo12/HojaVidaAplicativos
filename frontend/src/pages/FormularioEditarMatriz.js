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

const FormularioEditarMatriz = ({ open, onClose, idMatriz, onUpdate }) => {
  const [formData, setFormData] = useState({
    proveedor: "",
    codigo_servicio: "",
    n_telefono_proveedor: "",
    n_telefono_asesor: "",
    estado: "HABILITADO",
    campanaId: "",
  });

const [campanas, setCampanas] = useState([]);
const [loading, setLoading] = useState(false);

const cargarCampanas = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/campana");
    console.log(data)
    if (Array.isArray(data.campanas)) {
      const campanasHabilitadas = data.campanas.filter(
        (campana) => campana.estado?.toUpperCase() === "HABILITADO"
      );

      setCampanas(campanasHabilitadas);
    } else {
      setCampanas([]);
      console.warn("⚠️ El formato de respuesta no es un array:", data);
    }
  } catch (error) {
    console.error("❌ Error al cargar campañas:", error);
  }
};




  const cargarMatriz = async () => {
    if (!idMatriz) return;
    try {
      const { data } = await axios.get(`http://localhost:4000/matriz/${idMatriz}`);
      setFormData({
        proveedor: data.proveedor || "",
        codigo_servicio: data.codigo_servicio || "",
        n_telefono_proveedor: data.n_telefono_proveedor || "",
        n_telefono_asesor: data.n_telefono_asesor || "",
        estado: data.estado || "HABILITADO",
        campanaId: data.campanaId || "",
      });
    } catch (error) {
      console.error("❌ Error al cargar la matriz:", error);
      alert("Error al cargar los datos de la matriz", error.message);
    }
  };

  // 🔁 Efectos
  useEffect(() => {
    if (open) {
      cargarCampanas();
      cargarMatriz();
    }
  }, [open, idMatriz]);

  // 📝 Manejo de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Enviar actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData)
      await axios.put(`http://localhost:4000/matriz/${idMatriz}`, formData);
      onUpdate(); // refresca lista
      onClose();
    } catch (error) {
      console.error("❌ Error al actualizar matriz:", error);
      alert("❌ Error al actualizar la matriz");
    } finally {
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
          EDITAR MATRIZ DE ESCALAMIENTO
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="subtitle1" sx={sectionTitle}>
          DATOS DE LA MATRIZ
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "proveedor", label: "Proveedor" },
            { name: "codigo_servicio", label: "Código del Servicio" },
            { name: "n_telefono_proveedor", label: "Teléfono del Proveedor" },
            { name: "n_telefono_asesor", label: "Teléfono del Asesor" },
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

        {/* Selector de Campaña */}
            <Grid item xs={12} sm={10}>
              <FormControl fullWidth size="small" required>
                <InputLabel id="campana-label">Campaña</InputLabel>
                <Select
                  labelId="campana-label"
                  name="campanaId"
                  value={formData.campanaId || ""}
                  onChange={handleChange}
                  label="Campaña"
                >
                  {campanas.length === 0 ? (
                    <MenuItem value="">No hay campañas</MenuItem>
                  ) : (
                    campanas.map((campana) => (
                      <MenuItem key={campana.id} value={campana.id}>
                        {campana.nombre_campana}
                      </MenuItem>
                    ))
                  )}
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
            {loading ? "Actualizando..." : "ACTUALIZAR MATRIZ"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormularioEditarMatriz;
