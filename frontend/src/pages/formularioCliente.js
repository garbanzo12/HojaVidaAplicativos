import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import countryList from "react-select-country-list";

const FormularioCliente = ({ onClose = () => {} }) => {
  const countries = countryList().getData();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    pais: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrear = async () => {
    try {
      const dataToSend = {
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        direccion: formData.direccion,
        pais: formData.pais?.label || "",
        estado: "ACTIVO",
      };

      await axios.post("http://localhost:4000/cliente", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      alert("✅ Cliente creado correctamente");
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Error al crear el cliente");
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 5 },
        position: "relative",
        maxWidth: 800,
        mx: "auto",
        mt: 4,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ 
          position: "absolute", 
          right: 16, 
          top: 16,
          color: "text.secondary"
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box mb={4}>
        <Typography variant="h4" align="center" fontWeight={700} mb={1}>
          CREAR CLIENTE
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary">
          INFORMACIÓN DEL CLIENTE
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Correo"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
            <Autocomplete
                options={countries}
                value={formData.pais}
                onChange={(e, newValue) =>
                setFormData((prev) => ({ ...prev, pais: newValue }))
                }
                getOptionLabel={(option) => option?.label || ""}
                disableClearable
                fullWidth
                renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="País" 
                    variant="outlined" 
                    // Forzamos a que el input sea idéntico a los anteriores
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "6px" } }}
                />
                )}
                ListboxProps={{
                style: { maxHeight: '300px' }
                }}
            />
            </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" mt={5}>
        <Button 
          variant="contained" 
          onClick={handleCrear} 
          sx={{ 
            minWidth: 200,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600
          }}
        >
          CREAR
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioCliente;