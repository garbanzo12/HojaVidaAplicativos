import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  IconButton,
  Divider,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Modal,
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
  bgcolor: "white",
  borderRadius: "20px",
  p: 4,
};

const FormularioEditarMatrizGlobal = ({
  open,
  onClose,
  idMatriz,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    proveedor: "",
    codigo_servicio: "",
    n_telefono_proveedor: "",
    n_telefono_asesor: "",
    estado: "HABILITADO",
    // 🏆 CORRECCIÓN 1: Inicializar como array vacío para selección múltiple
    campanas: [], 
  });

  const [campanas, setCampanas] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarCampanas = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/campana");
      if (Array.isArray(data.campanas)) {
        const campanasHabilitadas = data.campanas.filter(
          (campana) => campana.estado?.toUpperCase() === "HABILITADO"
        );
        setCampanas(campanasHabilitadas);
      } else {
        setCampanas([]);
        console.warn("⚠️ El formato de respuesta de campañas no es un array:", data);
      }
    } catch (error) {
      console.error("❌ Error al cargar campañas:", error);
    }
  };

  const cargarMatriz = async () => {
    try {
        const { data } = await axios.get(
          `http://localhost:4000/matriz/global/${idMatriz}`
        );

        setFormData({
          proveedor: data.proveedor,
          codigo_servicio: data.codigo_servicio,
          n_telefono_proveedor: data.n_telefono_proveedor,
          n_telefono_asesor: data.n_telefono_asesor,
          estado: data.estado,
          // 🏆 CORRECCIÓN 2: Mapear a un array de IDs para la selección múltiple
          campanas: data.campanas ? data.campanas.map(c => c.id) : [], 
        });
    } catch (error) {
        console.error("❌ Error al cargar matriz para edición:", error);
    }
  };

  useEffect(() => {
    if (open && idMatriz) { // Aseguramos que tenemos un ID para cargar
      cargarCampanas();
      cargarMatriz();
    }
  }, [open, idMatriz]);

  // handleChange está bien para selección múltiple
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
        await axios.put(
        `http://localhost:4000/matriz/global/${idMatriz}`,
        formData
      );
      onUpdate();
      onClose();
       } catch (error) {
         console.error("❌ Error al actualizar matriz:", error.message);
         alert(
             "Error al guardar la matriz. " +
             error.response?.data?.message || error.message
      );    } finally {
        setLoading(false);
      }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 10, top: 10 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" textAlign="center" fontWeight="bold" mb={2}>
          Editar Matriz Global
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          {[
            { name: "proveedor", label: "Proveedor" },
            { name: "codigo_servicio", label: "Código Servicio" },
            { name: "n_telefono_proveedor", label: "Teléfono Proveedor" },
            { name: "n_telefono_asesor", label: "Teléfono Asesor" },
          ].map((field) => (
            <Grid item xs={12} key={field.name}>
              <TextField
                fullWidth
                size="small"
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
              />
            </Grid>
          ))}

          {/* Campaña (Selección Múltiple) */}
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <InputLabel>Campaña</InputLabel>
            <Select
              name="campanas"
              value={formData.campanas}
              onChange={handleChange}
              multiple 
              renderValue={(selected) => selected.map(id => 
                  campanas.find(c => c.id === id)?.nombre_campana
              ).join(', ')}
            >
              {campanas.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.nombre_campana}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        </Grid>

        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            type="submit"
            disabled={loading} // Deshabilitar mientras se guarda
            sx={{
              px: 5,
              py: 1.2,
              borderRadius: "12px",
              textTransform: "none",
            }}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormularioEditarMatrizGlobal;