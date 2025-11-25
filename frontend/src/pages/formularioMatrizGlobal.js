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
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import axios from "axios";

const FormularioMatriz = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    proveedor: "",
    codigoServicio: "",
    telefonoProveedor: "",
    telefonoAsesor: "",
  });


  // 🔹 Estados del Snackbar
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const showAlert = (message, severity = "info") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };



  // 🔹 Manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Enviar datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        proveedor: formData.proveedor,
        codigo_servicio: formData.codigoServicio,
        n_telefono_proveedor: formData.telefonoProveedor,
        n_telefono_asesor: formData.telefonoAsesor,
        estado: "HABILITADO",
      };

      const res = await axios.post("http://localhost:4000/matriz/global", payload, {
        headers: { "Content-Type": "application/json" },
      });

      showAlert("Matriz creada correctamente", "success");

      onSave && onSave(res.data);

      setFormData({
        proveedor: "",
        codigoServicio: "",
        telefonoProveedor: "",
        telefonoAsesor: "",
      });

    } catch (error) {
      showAlert(
        error.response?.data?.message ||
          "Error al guardar la matriz. " + error.message,
        "error"
      );
    }
  };

  return (
    <>
      <Paper elevation={6} sx={{ borderRadius: 3, p: 4, maxWidth: 450 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Crear Matriz de Escalamiento Global
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

      {/* 🔹 Snackbar arriba a la derecha */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default FormularioMatriz;
