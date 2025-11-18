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
  InputLabel, // 💡 AGREGADO: InputLabel es necesario para el Select
} from "@mui/material";
import axios from "axios";

const FormularioMatriz = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    proveedor: "",
    codigoServicio: "",
    telefonoProveedor: "",
    telefonoAsesor: "",
    // 🏆 CAMBIO 1: Inicializar campanas como un ARRAY
    campanas: [], 
  });

  const [campanas, setCampanas] = useState([]);

  // 🔹 Estados del Snackbar
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const showAlert = (message, severity = "info") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  // 🔹 Cargar campañas
  useEffect(() => {
    const fetchCampanas = async () => {
      try {
        const res = await axios.get("http://localhost:4000/campana");

        if (res.data.success && Array.isArray(res.data.campanas)) {
          
          const campanasHabilitadas = res.data.campanas.filter((c) => {
            const estado = c.estado?.toString().trim().toUpperCase();
            return estado === "HABILITADO";
          });

          setCampanas(campanasHabilitadas);
        } else {
          showAlert(res.data.message || "Error al obtener campañas", "warning");
          setCampanas([]);
        }
      } catch (err) {
        showAlert("Error al cargar campañas: " + err.message, "error");
        setCampanas([]);
      }
    };

    fetchCampanas();
  }, []);


  // 🔹 Manejar cambios (La función genérica funciona para arrays)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Enviar datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🏆 CAMBIO 2: Modificar el payload para usar 'campanas' (array de IDs)
      const payload = {
        proveedor: formData.proveedor,
        codigo_servicio: formData.codigoServicio,
        n_telefono_proveedor: formData.telefonoProveedor,
        n_telefono_asesor: formData.telefonoAsesor,
        campanas: formData.campanas, // Usar el array de IDs
        estado: "HABILITADO",
      };

      const res = await axios.post("http://localhost:4000/matriz/global", payload, {
        headers: { "Content-Type": "application/json" },
      });

      showAlert("Matriz Global creada correctamente", "success");

      onSave && onSave(res.data);

      // Resetear formulario
      setFormData({
        proveedor: "",
        codigoServicio: "",
        telefonoProveedor: "",
        telefonoAsesor: "",
        campanas: [], // Resetear como array
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
            {/* ... Campos TextField ... */}
            <TextField
              label="Proveedor"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              required
            />
            {/* ... otros TextFields ... */}
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


            {/* 🏆 CAMBIO 3: Componente Select para Múltiples Campañas */}
            <FormControl fullWidth >
              {/* Se agrega InputLabel para el Select */}
              <InputLabel id="campana-select-label">Campaña(s)</InputLabel>
              <Select
                labelId="campana-select-label"
                name="campanas" // 🏆 CAMBIO 4: Usar el nombre de campo 'campanas'
                value={formData.campanas}
                onChange={handleChange}
                multiple // Habilitar selección múltiple
                renderValue={(selected) => selected.map(id => 
                    campanas.find(c => c.id === id)?.nombre_campana
                ).join(', ')}
                sx={{ borderRadius: 2 }}
              >
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

      {/* 🔹 Snackbar */}
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