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
  MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 650,
  bgcolor: "#f9fafb",
  borderRadius: 4,
  boxShadow: 30,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
  border: "1px solid #e6e6e6",
};

const FormularioModal = ({ open, onClose }) => {

  const [fotoSede, setFotoSede] = useState("");
  const [fotoCliente, setFotoCliente] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario creado correctamente ✅");
    onClose();
  };

  return (
    <Modal open={open} onClose={() => null} disableEscapeKeyDown>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          ...style,
          "&::-webkit-scrollbar": { display: "none" }
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" mb={4} textAlign="center">
          CREAR FORMULARIO
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ mb: 3, mt: 2 }}>
          INFORMACIÓN PRINCIPAL
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={10}>
            <TextField label="Nombre De Campaña" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Cliente" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Director De Operación De ABAI" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Correo" type="email" fullWidth required />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ mb: 3, mt: 4 }}>
          GERENTES CAMPAÑA
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={10}>
            <TextField label="Segmento" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Nombre" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Correo" type="email" fullWidth required />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ mb: 3, mt: 4 }}>
          DATOS GENERALES
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={10}>
            <Select fullWidth displayEmpty defaultValue="" required>
              <MenuItem value="" disabled>Seleccione sede</MenuItem>
              <MenuItem value="Bogotá">Bogotá</MenuItem>
              <MenuItem value="Medellín">Pereira</MenuItem>
              <MenuItem value="Cali">Manizales</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={10}>
            <TextField label="N° Puesto De Operación" type="number" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="N° Puesto De Estructura" type="number" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Segmento De Red" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Fecha Actualización" type="date" fullWidth InputLabelProps={{ shrink: true }} required />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ mb: 3, mt: 4 }}>
          CONTACTOS
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={10}>
            <TextField label="Nombre Contacto De Cliente" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Correo" type="email" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Teléfono Cliente" type="tel" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Nombre Contacto Comercial" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Correo Comercial" type="email" fullWidth required />
          </Grid>
          <Grid item xs={10}>
            <TextField label="Teléfono Comercial" type="tel" fullWidth required />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" sx={{ mb: 3, mt: 4 }}>
          Imagenes
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
