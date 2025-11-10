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
    campanaId: "",
    estado: "HABILITADO",
  });

  const [loading, setLoading] = useState(false);

  // Cargar datos del aplicativo al abrir el modal
  useEffect(() => {
    if (open && idAplicativo) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`http://localhost:4000/aplicativo/${idAplicativo}`);
          setFormData(data);
        } catch (error) {
          console.error("❌ Error al cargar los datos del aplicativo:", error);
          alert("Error al cargar los datos del aplicativo");
        }
      };
      fetchData();
    }
  }, [open, idAplicativo]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:4000/aplicativo/${idAplicativo}`,
        formData
      );

      console.log("✅ Aplicativo actualizado:", response.data);
      alert("✅ Aplicativo actualizado correctamente");

      if (onUpdate) onUpdate();
      onClose();
    } catch (error) {
      console.error("❌ Error al actualizar aplicativo:", error);
      alert("❌ Error al actualizar el aplicativo");
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
          EDITAR APLICATIVO
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* DATOS PRINCIPALES */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          DATOS PRINCIPALES
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "nombre", label: "Nombre del Aplicativo" },
            { name: "direccion_ip", label: "Dirección IP" },
            { name: "puerto", label: "Puerto", type: "number" },
            { name: "url", label: "URL" },
            { name: "tipo_red", label: "Tipo de Red" },
            { name: "escalamiento", label: "Escalamiento" },
          ].map((field) => (
            <Grid item xs={12} sm={10} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
                size="small"
                required
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}
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
            {loading ? "Actualizando..." : "ACTUALIZAR"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormularioEditarAplicativo;
