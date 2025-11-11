import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";

const FormularioMatriz = ({ onSave,onClose }) => {
  const [formData, setFormData] = useState({
    proveedor: "",
    codigoServicio: "",
    telefonoProveedor: "",
    telefonoAsesor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Mapeamos los campos de camelCase a snake_case
      const payload = {
        proveedor: formData.proveedor,
        codigo_servicio: formData.codigoServicio,
        n_telefono_proveedor: formData.telefonoProveedor,
        n_telefono_asesor: formData.telefonoAsesor,
        campanaId: 1, // o el id real de la campaña
      };

      const res = await axios.post("http://localhost:4000/matriz", payload);

      console.log("✅ Matriz creada:", res.data);
      alert("✅ Matriz creada correctamente");
      onClose();
      onSave && onSave(res.data);
      setFormData({
        proveedor: "",
        codigoServicio: "",
        telefonoProveedor: "",
        telefonoAsesor: "",
      });
    } catch (error) {
      console.error("❌ Error al guardar la matriz:", error);
      alert("Error al guardar la matriz");
    }
  };

  return (
    <Paper elevation={6} sx={{ borderRadius: 3, p: 4, maxWidth: 400 }}>
      <Typography variant="h6" mb={2}>
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

          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default FormularioMatriz;
