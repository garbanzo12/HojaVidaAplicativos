import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
  IconButton,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

// ----------------------------------------------------
// 🛑 DEFINICIONES DE ESTILOS FALTANTES 🛑
// ----------------------------------------------------

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
  "&::-webkit-scrollbar": { display: "none" },
};

const sectionTitle = {
  fontWeight: 700,
  textAlign: "center",
  mt: 4,
  mb: 2,
  color: "#1565c0",
  letterSpacing: 0.5,
};

// ----------------------------------------------------
// 🚀 COMPONENTE PRINCIPAL
// ----------------------------------------------------

const FormularioModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    nombre_campana: "",
    cliente: "",
    director_operacion_abai: "",
    correo_director: "",
    segmento: "",
    nombre_gte_campana: "",
    correo_gte_campana: "",
    ubicacion_sedes: "",
    puestos_operacion: "",
    puestos_estructura: "",
    segmento_red: "",
    fecha_actualizacion: "",
    nombre_contacto_cliente: "",
    correo_contacto_cliente: "",
    telefono_contacto_cliente: "",
    nombre_contacto_comercial: "",
    correo_contacto_comercial: "",
    telefono_contacto_comercial: "",
    soporte_tecnico_abai: "",
    correo_soporte_abai: "",
    servicios_prestados: "",
    estado: "HABILITADO",
    // Nuevos IDs
    aplicativoId: "", 
    matrizId: "", 
  });

  const [aplicativos, setAplicativos] = useState([]);
  const [matrices, setMatrices] = useState([]);
  const [imagenSede, setImagenSede] = useState(null);
  const [imagenCliente, setImagenCliente] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Función de carga de datos (useEffect)
  useEffect(() => {
    if (open) {
      // 1. Cargar Aplicativos
      axios.get("http://localhost:4000/aplicativo") 
        .then(res => {
          // Asume que la lista de aplicativos está en res.data.aplicativos
          
          setAplicativos(res.data || []); 
        })
        .catch(err => console.error("Error cargando Aplicativos:", err));

      // 2. Cargar Matrices
      axios.get("http://localhost:4000/matriz") 
        .then(res => {
          // Asume que la lista de matrices está en res.data.registros
          setMatrices(res.data || []); 
        })
        .catch(err => console.error("Error cargando Matrices:", err));
    }
  }, [open]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si el valor es de un select, lo parseamos a Number o null
    const isIdField = name === 'aplicativoId' || name === 'matrizId';
    
    let parsedValue = value;

    if (isIdField) {
        // Si el valor es "", lo convertimos a null (para Prisma SetNull), sino a Number
        parsedValue = value === "" ? null : Number(value);
    } else if (e.target.type === 'number') {
        // Para TextFields de tipo number
        parsedValue = value ? Number(value) : (value === 0 ? 0 : "");
    }
        
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Preparar los datos antes de añadirlos al FormData
      const dataToSubmit = {
          ...formData,
          // Asegurar que las IDs sean null o número
          aplicativoId: formData.aplicativoId || null,
          matrizId: formData.matrizId || null,
          // Los campos numéricos ya deben ser números o strings vacíos gracias a handleChange
          puestos_operacion: formData.puestos_operacion || null,
          puestos_estructura: formData.puestos_estructura || null,
      };

      // Agregar los campos de texto al FormData
      Object.keys(dataToSubmit).forEach((key) => {
        // Excluir claves con valor null si no queremos que se envíen como string "null"
        if (dataToSubmit[key] !== null && dataToSubmit[key] !== undefined) {
            formDataToSend.append(key, dataToSubmit[key]);
        }
      });
      

      // Agregar las imágenes
      if (imagenSede) formDataToSend.append("imagen_sede", imagenSede);
      if (imagenCliente) formDataToSend.append("imagen_cliente", imagenCliente);


      // Enviar la solicitud POST
      const response = await axios.post("http://localhost:4000/campana", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Campaña creada:", response.data);
      alert("✅ Campaña creada correctamente");
      onClose(); // Cerrar el modal y refrescar la lista si es necesario
    } catch (error) {
      console.error("❌ Error al crear campaña:", error.response?.data || error.message);
      alert("❌ Error al crear la campaña: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
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

        <Typography variant="h5" textAlign="center" sx={{ mb: 1, color: "#0d47a1", letterSpacing: 0.8, fontWeight: "bold" }}>
          CREAR CAMPAÑA
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* INFORMACIÓN PRINCIPAL */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          INFORMACIÓN PRINCIPAL
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "nombre_campana", label: "Nombre de Campaña" },
            { name: "cliente", label: "Cliente" },
            { name: "director_operacion_abai", label: "Director Operación ABAI" },
            { name: "correo_director", label: "Correo Director", type: "email" },
          ].map((field) => (
            <Grid item xs={12} sm={10} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
                size="small"
                required
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        {/* RELACIONES Y DATOS GENERALES */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          VINCULACIÓN & DATOS GENERALES
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          
          {/* SELECT Aplicativo */}
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth size="small">
              <InputLabel>Aplicativo</InputLabel>
              <Select
                name="aplicativoId"
                value={formData.aplicativoId || ""} 
                onChange={handleChange}
                label="Aplicativo"
                required 
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {aplicativos.map((app) => (
                  <MenuItem key={app.id} value={app.id}>
                    {app.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* SELECT MatrizEscalamiento */}
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth size="small">
              <InputLabel>Matriz Escalamiento</InputLabel>
              <Select
                name="matrizId"
                value={formData.matrizId || ""} 
                onChange={handleChange}
                label="Matriz Escalamiento"
                required 
              >
                <MenuItem value="">
                  <em>Ninguna</em>
                </MenuItem>
                {matrices.map((matriz) => (
                  <MenuItem key={matriz.id} value={matriz.id}>
                    {matriz.proveedor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Otros TextFields de DATOS GENERALES */}
          {[
             { name: "ubicacion_sedes", label: "Ubicación Sede" },
             { name: "puestos_operacion", label: "N° Puestos de Operación", type: "number" },
             { name: "puestos_estructura", label: "N° Puestos de Estructura", type: "number" },
             { name: "segmento_red", label: "Segmento de Red" },
             { name: "fecha_actualizacion", label: "Fecha Actualización", type: "date" },
          ].map((field) => (
             <Grid item xs={12} sm={5} key={field.name}> 
               <TextField
                 label={field.label}
                 name={field.name}
                 type={field.type || "text"}
                 fullWidth
                 size="small"
                 required
                 InputLabelProps={field.type === "date" ? { shrink: true } : undefined}
                 value={formData[field.name] || ""}
                 onChange={handleChange}
               />
             </Grid>
          ))}
        </Grid>
        
        {/* GERENTES DE CAMPAÑA */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          GERENTES DE CAMPAÑA
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "segmento", label: "Segmento" },
            { name: "nombre_gte_campana", label: "Nombre Gerente de Campaña" },
            { name: "correo_gte_campana", label: "Correo Gerente de Campaña", type: "email" },
          ].map((field) => (
            <Grid item xs={12} sm={10} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
                size="small"
                required
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        {/* CONTACTOS */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          CONTACTOS
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "nombre_contacto_cliente", label: "Nombre Contacto Cliente" },
            { name: "correo_contacto_cliente", label: "Correo Cliente", type: "email" },
            { name: "telefono_contacto_cliente", label: "Teléfono Cliente", type: "tel" },
            { name: "nombre_contacto_comercial", label: "Nombre Contacto Comercial" },
            { name: "correo_contacto_comercial", label: "Correo Comercial", type: "email" },
            { name: "telefono_contacto_comercial", label: "Teléfono Comercial", type: "tel" },
          ].map((field) => (
            <Grid item xs={12} sm={10} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
                size="small"
                required
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        {/* SOPORTE Y SERVICIOS */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          SOPORTE Y SERVICIOS
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "soporte_tecnico_abai", label: "Soporte Técnico ABAI" },
            { name: "correo_soporte_abai", label: "Correo Soporte ABAI", type: "email" },
            { name: "servicios_prestados", label: "Servicios Prestados" },
          ].map((field) => (
            <Grid item xs={12} sm={10} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
                size="small"
                required
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>


        {/* IMÁGENES */}
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
                "&:hover": { backgroundColor: "#1565c0", color: "#fff" },
              }}
            >
              Subir Imagen Sede
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImagenSede(e.target.files[0])}
              />
            </Button>
            {imagenSede && (
              <Typography variant="body2" mt={1} textAlign="center">
                📁 {imagenSede.name}
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
                "&:hover": { backgroundColor: "#1565c0", color: "#fff" },
              }}
            >
              Subir Imagen Cliente
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImagenCliente(e.target.files[0])}
              />
            </Button>
            {imagenCliente && (
              <Typography variant="body2" mt={1} textAlign="center">
                📁 {imagenCliente.name}
              </Typography>
            )}
          </Grid>
        </Grid>

        {/* BOTÓN CREAR */}
        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{
              width: "60%",
              py: 1.4,
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
              "&:hover": { backgroundColor: "#0d47a1", boxShadow: "0 5px 15px rgba(13,71,161,0.4)" },
            }}
          >
            {loading ? "Creando..." : "CREAR"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormularioModal;