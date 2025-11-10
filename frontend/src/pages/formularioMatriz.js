import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const FormularioMatriz = ({ onSave }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // envía datos al padre
    setFormData({
      proveedor: "",
      codigoServicio: "",
      telefonoProveedor: "",
      telefonoAsesor: "",
    });
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
