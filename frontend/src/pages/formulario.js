import React from "react";
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

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 3, mt: 2 }}
        >
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
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 3, mt: 4 }}
        >
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

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 3, mt: 4 }}
        >
          DATOS GENERALES
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={10}>
            <Select fullWidth displayEmpty defaultValue="" required>
              <MenuItem value="" disabled>Seleccione sede</MenuItem>
              <MenuItem value="Bogotá">Bogotá</MenuItem>
              <MenuItem value="Medellín">Medellín</MenuItem>
              <MenuItem value="Cali">Cali</MenuItem>
              <MenuItem value="Barranquilla">Barranquilla</MenuItem>
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
            <TextField
              label="Fecha Actualización"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
        </Grid>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 3, mt: 4 }}
        >
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

        <Typography
          variant="subtitle1"
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 3, mt: 4 }}
        >
          Imagenes
        </Typography>

        <Grid container justifyContent="center">
          <Grid item xs={10} textAlign="center">
            <Button variant="outlined" component="label">
              Subir Foto Sede
              <input type="file" hidden accept="image/*" />
            </Button>
          </Grid>
        </Grid>

         <Grid container justifyContent="center">
          <Grid item xs={10} textAlign="center">
            <Button variant="outlined" component="label">
              Subir Foto De Cliente
              <input type="file" hidden accept="image/*" />
            </Button>
          </Grid>
        </Grid>

        <Box textAlign="center">
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 4, width: "60%" }}>
            CREAR
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormularioModal;
