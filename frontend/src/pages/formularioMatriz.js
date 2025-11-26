import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const FormularioMatriz = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    proveedor: "",
    codigoServicio: "",
    telefonoProveedor: "",
    telefonoAsesor: "",
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const showAlert = (message, severity = "info") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

      const res = await axios.post("http://localhost:4000/matriz", payload, {
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
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          position: "relative",
          maxWidth: 1100,
          mx: "auto",
          backgroundColor: "white",
        }}
      >
        {/* Botón cerrar */}
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

        {/* Título */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: "#000",
            letterSpacing: 0.8,
          }}
        >
          CREAR MATRIZ DE ESCALAMIENTO
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

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} justifyContent="center">

            {/* Proveedor */}
            <Grid item xs={12} md={8}>
              <TextField
                label="Proveedor"
                name="proveedor"
                value={formData.proveedor}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root fieldset": { borderColor: "#cfd8dc" },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: "#90caf9",
                  },
                }}
              />
            </Grid>

            {/* Código de servicio */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Código del Servicio"
                name="codigoServicio"
                value={formData.codigoServicio}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root fieldset": { borderColor: "#cfd8dc" },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: "#90caf9",
                  },
                }}
              />
            </Grid>

            {/* Teléfono Proveedor */}
            <Grid item xs={12} md={6}>
              <TextField
                label="N° Teléfono Proveedor"
                name="telefonoProveedor"
                value={formData.telefonoProveedor}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root fieldset": { borderColor: "#cfd8dc" },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: "#90caf9",
                  },
                }}
              />
            </Grid>

            {/* Teléfono Asesor */}
            <Grid item xs={12} md={6}>
              <TextField
                label="N° Teléfono Asesor"
                name="telefonoAsesor"
                value={formData.telefonoAsesor}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root fieldset": { borderColor: "#cfd8dc" },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: "#90caf9",
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Botón */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                minWidth: 180,
                py: 1.4,
                px: 4,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: "12px",
                backgroundColor: "#1565c0",
                boxShadow: "0px 4px 12px rgba(21,101,192,0.3)",
                "&:hover": {
                  backgroundColor: "#0d47a1",
                  boxShadow: "0px 5px 14px rgba(13,71,161,0.4)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              GUARDAR
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Snackbar */}
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
