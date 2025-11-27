import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "92%",
  maxWidth: 900,
  bgcolor: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
  p: 4,
  maxHeight: "90vh",
  overflowY: "scroll",
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", 
};

const cardAccordionStyle = {
  boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
  borderRadius: "14px",
  mb: 2,
};

const sectionTitle = {
  fontWeight: "bold",
  color: "#0d47a1",
};

// Estilos personalizados para los selects
const selectStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    minWidth: '160px',
  },
  '& .MuiSelect-select': {
    padding: '10px 14px',
    minWidth: '130px',
  
  },
  '& .MuiInputLabel-root': {
    whiteSpace: 'nowrap',
  }
};

// Props comunes para todos los MenuProps de los Select
const menuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
       minWidth: 250,
    },
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
};

const initialFormData = {
  // SECCIÓN 1
  nombre_campana: "",
  cliente: "",
  director_operacion_abai: "",
  correo_director: "",
  // SECCIÓN 2
  aplicativo: "",
  matriz_escalamiento: "",
  matriz_global: "",
  usuario: "",
  ubicacion_sede: "",
  puesto_operacion: "",
  puesto_estructuracion: "",
  segmento_red: "",
  fecha_actualizacion: "",
  // SECCIÓN 3
  gerente_campana: "",
  correo_gerente: "",
  telefono_gerente: "",
  // SECCIÓN 4
  contacto_cliente: "",
  correo_contacto_cliente: "",
  telefono_contacto_cliente: "",
  nombre_comerciante: "",
  correo_comerciante: "",
  telefono_comerciante: "",
  // SECCIÓN 5
  soporte_tecnico_abai: "",
  correo_soporte_abai: "",
  servicios_prestados: "",
  // SECCIÓN 6
  imagen_sede: null,
  imagen_cliente: null,
};

export default function FormularioModal({ open, onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [previewSede, setPreviewSede] = useState(null);
  const [previewCliente, setPreviewCliente] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImagenSede = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagen_sede: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSede(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagenCliente = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imagen_cliente: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewCliente(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const eliminarImagenSede = () => {
    setFormData({ ...formData, imagen_sede: null });
    setPreviewSede(null);
  };

  const eliminarImagenCliente = () => {
    setFormData({ ...formData, imagen_cliente: null });
    setPreviewCliente(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPreviewSede(null);
    setPreviewCliente(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    alert("Formulario enviado correctamente");
    
    // Resetear el formulario y cerrar el modal
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal 
      open={open} 
      onClose={(event, reason) => {
        if (reason === 'backdropClick') {
          return;
        }
        handleClose();
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
        {/* CERRAR */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 16, top: 16, bgcolor: "#f5f5f5" }}
        >
          <CloseIcon />
        </IconButton>

        {/* TÍTULO */}
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#0d47a1" }}>
          CREAR CAMPAÑA
        </Typography>

        {/* SECCIÓN 1 - INFORMACIÓN PRINCIPAL */}
        <Card sx={cardAccordionStyle}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Información Principal</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Nombre de Campaña *" 
                    name="nombre_campana" 
                    value={formData.nombre_campana}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Cliente *" 
                    name="cliente" 
                    value={formData.cliente}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Director Operación ABAI *" 
                    name="director_operacion_abai" 
                    value={formData.director_operacion_abai}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Correo Director *" 
                    name="correo_director" 
                    value={formData.correo_director}
                    type="email" 
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* SECCIÓN 2 - VINCULACIÓN */}
        <Card sx={cardAccordionStyle}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Vinculación & Datos Generales</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {/* FILA 1: Selectores - 4 columnas */}
                <Grid item xs={12} sm={6} md={3} ml={5}>
                  <FormControl fullWidth size="small" sx={selectStyles}>
                    <InputLabel id="aplicativo-label">Aplicativo *</InputLabel>
                    <Select
                      labelId="aplicativo-label"
                      name="aplicativo"
                      value={formData.aplicativo}
                      label="Aplicativo *"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      <MenuItem value="">
                        <em>Ninguno</em>
                      </MenuItem>
                      <MenuItem value="App1">Aplicación 1</MenuItem>
                      <MenuItem value="App2">Aplicación 2</MenuItem>
                      <MenuItem value="App3">Aplicación 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small" sx={selectStyles}>
                    <InputLabel id="matriz-escalamiento-label">Matriz Escalamiento *</InputLabel>
                    <Select
                      labelId="matriz-escalamiento-label"
                      name="matriz_escalamiento"
                      value={formData.matriz_escalamiento}
                      label="Matriz Escalamiento *"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      <MenuItem value="">
                        <em>Ninguna</em>
                      </MenuItem>
                      <MenuItem value="Matriz1">Matriz 1</MenuItem>
                      <MenuItem value="Matriz2">Matriz 2</MenuItem>
                      <MenuItem value="Matriz3">Matriz 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small" sx={selectStyles}>
                    <InputLabel id="matriz-global-label">Matriz Global *</InputLabel>
                    <Select
                      labelId="matriz-global-label"
                      name="matriz_global"
                      value={formData.matriz_global}
                      label="Matriz Global *"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      <MenuItem value="">
                        <em>Ninguna</em>
                      </MenuItem>
                      <MenuItem value="Global1">Global 1</MenuItem>
                      <MenuItem value="Global2">Global 2</MenuItem>
                      <MenuItem value="Global3">Global 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small" sx={selectStyles}>
                    <InputLabel id="usuario-label">Usuario *</InputLabel>
                    <Select
                      labelId="usuario-label"
                      name="usuario"
                      value={formData.usuario}
                      label="Usuario *"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      <MenuItem value="">
                        <em>Ninguno</em>
                      </MenuItem>
                      <MenuItem value="Usuario1">Usuario 1</MenuItem>
                      <MenuItem value="Usuario2">Usuario 2</MenuItem>
                      <MenuItem value="Usuario3">Usuario 3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* FILA 2: Ubicación Sede - ancho completo */}
                <Grid item xs={12} sm={3} md={3} ml={5}>
                  <TextField 
                    label="Ubicación Sede *" 
                    name="ubicacion_sede" 
                    value={formData.ubicacion_sede}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>

                {/* FILA 3: Campos numéricos y texto */}
                <Grid item xs={12} sm={3} md={3}>
                  <TextField 
                    label="N° Puesto de Operación *" 
                    name="puesto_operacion" 
                    value={formData.puesto_operacion}
                    type="number"
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField 
                    label="N° Puesto de Estructuración *" 
                    name="puesto_estructuracion" 
                    value={formData.puesto_estructuracion}
                    type="number"
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3} ml={5}>
                  <TextField 
                    label="Segmento de Red *" 
                    name="segmento_red" 
                    value={formData.segmento_red}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>

                {/* FILA 4: Fecha */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField 
                    label="Fecha Actualización *" 
                    name="fecha_actualizacion" 
                    value={formData.fecha_actualizacion}
                    type="date" 
                    fullWidth 
                    size="small" 
                    InputLabelProps={{ shrink: true }} 
                    onChange={handleChange} 
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* SECCIÓN 3 - GERENTES */}
        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Gerentes de Campaña</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Gerente *" 
                    name="gerente_campana" 
                    value={formData.gerente_campana}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Nombre Gerente de Campaña  *" 
                    name="nombre_gerente" 
                    value={formData.correo_gerente}
                    type="email" 
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Correo Gerente de campaña*" 
                    name="Correo" 
                    value={formData.telefono_gerente}
                    type="tel"
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* SECCIÓN 4 - CONTACTO CLIENTE */}
        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Contacto Cliente</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Nombre Contacto *" 
                    name="contacto_cliente" 
                    value={formData.contacto_cliente}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Correo *" 
                    name="correo_contacto_cliente" 
                    value={formData.correo_contacto_cliente}
                    type="email" 
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Teléfono *" 
                    name="telefono_contacto_cliente" 
                    value={formData.telefono_contacto_cliente}
                    type="tel"
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Nombre Contacto Comerciante *" 
                    name="nombre_comerciante" 
                    value={formData.nombre_comerciante}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Correo Comerciante *" 
                    name="correo_comerciante" 
                    value={formData.correo_comerciante}
                    type="email"
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Teléfono Comerciante* *" 
                    name="telefono_comerciante" 
                    value={formData.telefono_comerciante}
                    type="tel"
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* SECCIÓN 5 - SOPORTE */}
        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Soporte y Servicios</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Soporte Tecnico ABAI *" 
                    name="soporte_tecnico_abai" 
                    value={formData.soporte_tecnico_abai}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Correo Soporte ABAI *" 
                    name="correo_soporte_abai" 
                    value={formData.correo_soporte_abai}
                    type="email"
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Servicios Prestados*" 
                    name="servicios_prestados" 
                    value={formData.servicios_prestados}
                    fullWidth 
                    size="small" 
                    onChange={handleChange} 
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* SECCIÓN 6 - IMAGENES */}
        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Imágenes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} justifyContent="center">
                {/* IMAGEN SEDE */}
                <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
                  {!previewSede ? (
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
                          color: "#fff" 
                        },
                      }}
                    >
                      Subir Imagen Sede
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImagenSede}
                      />
                    </Button>
                  ) : (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                      <Box
                        component="img"
                        src={previewSede}
                        alt="Preview Sede"
                        sx={{
                          width: '100%',
                          maxHeight: 200,
                          objectFit: 'contain',
                          borderRadius: '10px',
                          border: '2px solid #1565c0',
                          mb: 1
                        }}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={eliminarImagenSede}
                        sx={{
                          borderRadius: '8px',
                          fontWeight: 600,
                        }}
                      >
                        Eliminar Imagen
                      </Button>
                    </Box>
                  )}
                </Grid>

                {/* IMAGEN CLIENTE */}
                <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
                  {!previewCliente ? (
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
                          color: "#fff" 
                        },
                      }}
                    >
                      Subir Imagen Cliente
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImagenCliente}
                      />
                    </Button>
                  ) : (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                      <Box
                        component="img"
                        src={previewCliente}
                        alt="Preview Cliente"
                        sx={{
                          width: '100%',
                          maxHeight: 200,
                          objectFit: 'contain',
                          borderRadius: '10px',
                          border: '2px solid #1565c0',
                          mb: 1
                        }}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={eliminarImagenCliente}
                        sx={{
                          borderRadius: '8px',
                          fontWeight: 600,
                        }}
                      >
                        Eliminar Imagen
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* BOTÓN FINAL */}
        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "30%",
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "10px",
              backgroundColor: "#1565c0",
              boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
              "&:hover": {
                backgroundColor: "#0d47a1",
                boxShadow: "0 5px 15px rgba(13,71,161,0.4)",
              },
            }}
          >
            CREAR CAMPAÑA
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}