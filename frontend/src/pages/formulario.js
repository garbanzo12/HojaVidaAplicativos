import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
  IconButton,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  "&::-webkit-scrollbar": {
    display: "none", 
  },
};

const sectionTitle = {
  fontWeight: 700,
  textAlign: "center",
  mt: 4,
  mb: 2,
  color: "#1565c0",
  letterSpacing: 0.5,
};

const FormularioModal = ({ open, onClose }) => {
  const [fotoSede, setFotoSede] = useState("");
  const [fotoCliente, setFotoCliente] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Formulario creado correctamente");
    onClose();
  };

  return (
    <Modal open={open} onClose={() => null} disableEscapeKeyDown>
      <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
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
          CREAR FORMULARIO
        </Typography>

        <Divider sx={{ mb: 3 }} />
        <Typography variant="subtitle1" sx={sectionTitle}>
          INFORMACIÓN PRINCIPAL
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {["Nombre De Campaña", "Cliente", "Director De Operación De ABAI", "Correo"].map(
            (label, i) => (
              <Grid item xs={12} sm={10} key={i}>
                <TextField
                  label={label}
                  fullWidth
                  required
                  size="small"
                  type={label === "Correo" ? "email" : "text"}
                />
              </Grid>
            )
          )}
        </Grid>

        <Typography variant="subtitle1" sx={sectionTitle}>
          GERENTES CAMPAÑA
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {["Segmento", "Nombre", "Correo"].map((label, i) => (
            <Grid item xs={12} sm={10} key={i}>
              <TextField
                label={label}
                fullWidth
                required
                size="small"
                type={label === "Correo" ? "email" : "text"}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" sx={sectionTitle}>
          DATOS GENERALES
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={10}>
            <Select
              fullWidth
              displayEmpty
              defaultValue=""
              size="small"
              required
            >
              <MenuItem value="" disabled>
                Seleccione sede
              </MenuItem>
              <MenuItem value="Bogotá">Bogotá</MenuItem>
              <MenuItem value="Pereira">Pereira</MenuItem>
              <MenuItem value="Manizales">Manizales</MenuItem>
            </Select>
          </Grid>

          {[ 
            { label: "N° Puesto De Operación", type: "number" },
            { label: "N° Puesto De Estructura", type: "number" },
            { label: "Segmento De Red", type: "text" },
            { label: "Fecha Actualización", type: "date" },
          ].map((field, i) => (
            <Grid item xs={12} sm={10} key={i}>
              <TextField
                label={field.label}
                type={field.type}
                fullWidth
                size="small"
                required
                InputLabelProps={
                  field.type === "date" ? { shrink: true } : undefined
                }
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" sx={sectionTitle}>
          CONTACTOS
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {[
            "Nombre Contacto De Cliente",
            "Correo",
            "Teléfono Cliente",
            "Nombre Contacto Comercial",
            "Correo Comercial",
            "Teléfono Comercial",
          ].map((label, i) => (
            <Grid item xs={12} sm={10} key={i}>
              <TextField
                label={label}
                fullWidth
                required
                size="small"
                type={
                  label.toLowerCase().includes("correo")
                    ? "email"
                    : label.toLowerCase().includes("teléfono")
                    ? "tel"
                    : "text"
                }
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="subtitle1" sx={sectionTitle}>
          IMÁGENES
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={5}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                py: 1.2,
                borderRadius: "10px",
                borderColor: "#1565c0",
                color: "#1565c0",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#1565c0",
                  color: "#fff",
                },
              }}
            >
              Subir Foto Sede
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setFotoSede(e.target.files[0]?.name || "")}
              />
            </Button>
            {fotoSede && (
              <Typography variant="body2" mt={1} textAlign="center">
                📁 {fotoSede}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={5}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                py: 1.2,
                borderRadius: "10px",
                borderColor: "#1565c0",
                color: "#1565c0",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#1565c0",
                  color: "#fff",
                },
              }}
            >
              Subir Foto Cliente
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setFotoCliente(e.target.files[0]?.name || "")}
              />
            </Button>
            {fotoCliente && (
              <Typography variant="body2" mt={1} textAlign="center">
                📁 {fotoCliente}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
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
            CREAR
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormularioModal;
