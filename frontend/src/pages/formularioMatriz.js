import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const FormularioMatriz = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    proveedor: "",
    codigoServicio: "",
    telefonoProveedor: "",
    telefonoAsesor: "",
    tipoCampana: "",
  });

  const [campanas, setCampanas] = useState([]);

  // 🔹 Cargar campañas desde la base de datos al montar el componente
  useEffect(() => {
    const fetchCampanas = async () => {
      try {
        const res = await axios.get("http://localhost:4000/campana");
        if (res.data.success) {
          setCampanas(res.data.campanas);
        } else {
          console.error("⚠️ Error al obtener campañas:", res.data.message);
        }
      } catch (err) {
        console.error("❌ Error al cargar campañas:", err.message);
      }
    };
    fetchCampanas();
  }, []);

  // 🔹 Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        proveedor: formData.proveedor,
        codigo_servicio: formData.codigoServicio,
        n_telefono_proveedor: formData.telefonoProveedor,
        n_telefono_asesor: formData.telefonoAsesor,
        campanaId: parseInt(formData.tipoCampana) || null,
        estado: "HABILITADO",
      };

      const res = await axios.post("http://localhost:4000/matriz", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Matriz creada:", res.data);
      alert("✅ Matriz creada correctamente");
      onClose();
      onSave && onSave(res.data);

      // Limpiar formulario
      setFormData({
        proveedor: "",
        codigoServicio: "",
        telefonoProveedor: "",
        telefonoAsesor: "",
        tipoCampana: "",
      });
    } catch (error) {
      console.error("❌ Error al guardar la matriz:", error.response?.data || error.message);
      alert("Error al guardar la matriz. Revisa la consola para más detalles.");
    }
  };

  return (
    <Paper elevation={6} sx={{ borderRadius: 3, p: 4, maxWidth: 450 }}>
      <Typography variant="h6" mb={2} fontWeight="bold">
        Crear Matriz de Escalamiento
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Proveedor"
            name="proveedor"
            value={formData.proveedor}
            onChange={handleChange}
            required
          />

          <TextField
            label="Código del Servicio"
            name="codigoServicio"
            value={formData.codigoServicio}
            onChange={handleChange}
            required
          />

          <TextField
            label="N° Teléfono Proveedor"
            name="telefonoProveedor"
            value={formData.telefonoProveedor}
            onChange={handleChange}
          />

          <TextField
            label="N° Teléfono Asesor"
            name="telefonoAsesor"
            value={formData.telefonoAsesor}
            onChange={handleChange}
          />

          {/* 🔹 Selector de Campaña */}
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

              {campanas.map((campana) => (
                <MenuItem key={campana.id} value={campana.id}>
                  {campana.nombre_campana}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default FormularioMatriz;
