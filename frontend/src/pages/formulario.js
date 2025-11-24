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
  // ELIMINADAS: FormControl, InputLabel, Checkbox, ListItemText
  Select, 
  MenuItem, 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

// ----------------------------------------------------
// 🌟 ESTILOS ESTÉTICAMENTE CORREGIDOS
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

// 📌 ESTILO SIMPLIFICADO Y CORRECTO
// Solo forzamos la altura y el radio de borde.
// Esto permite que Material-UI alinee el texto y la etiqueta correctamente.
const inputStyle = {
  "& .MuiInputBase-root": {
    height: "50px", // Altura uniforme (HP)
    borderRadius: "12px", // Borde redondeado
    fontSize: "0.95rem",
  },
  // Reglas de padding y label eliminadas para evitar conflictos de alineación
};

const sectionTitle = {
  fontWeight: 700,
  textAlign: "center",
  mt: 4,
  mb: 2,
  color: "#1565c0",
  letterSpacing: 0.5,
};

const gridCentered = {
  display: "flex",
  justifyContent: "center",
};

const gridWidth = {
  xs: 12,
  md: 10,
  lg: 8,
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
    // CORREGIDO: De arrays a string para selección simple
    aplicativoId: "",
    matrizId: "",
    matrizGlobalId: "",
  });

  const [matricesGlobal, setMatricesGlobal] = useState([]);
  const [aplicativos, setAplicativos] = useState([]);
  const [matrices, setMatrices] = useState([]);
  const [imagenSede, setImagenSede] = useState(null);
  const [imagenCliente, setImagenCliente] = useState(null);
  const [loading, setLoading] = useState(false);

  // ⌨️ Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // 🔹 Carga de datos
  useEffect(() => {
    if (open) {
      axios
        .get("http://localhost:4000/aplicativo")
        .then((res) => setAplicativos(res.data || []))
        .catch((err) => console.log(err));

      axios
        .get("http://localhost:4000/matriz")
        .then((res) => setMatrices(res.data || []))
        .catch((err) => console.log(err));
    }

    axios
      .get("http://localhost:4000/matriz/global")
      .then((res) => setMatricesGlobal(res.data || []))
      .catch((err) => console.log(err));
  }, [open]);

  // 📝 Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (e.target.type === "number") {
      parsedValue = value ? Number(value) : "";
    }

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  // 🚀 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      
      const dataToSubmit = {
        ...formData,
        puestos_operacion: formData.puestos_operacion || null,
        puestos_estructura: formData.puestos_estructura || null,
      };

      // Excluir los IDs antes de iterar
      delete dataToSubmit.aplicativoId;
      delete dataToSubmit.matrizId;
      delete dataToSubmit.matrizGlobalId;
      
      Object.keys(dataToSubmit).forEach((key) => {
        if (dataToSubmit[key] !== null)
          formDataToSend.append(key, dataToSubmit[key]);
      });
      
      // Enviar IDs de selección simple
      if (formData.aplicativoId) formDataToSend.append("aplicativoId", formData.aplicativoId);
      if (formData.matrizId) formDataToSend.append("matrizId", formData.matrizId);
      if (formData.matrizGlobalId) formDataToSend.append("matrizGlobalId", formData.matrizGlobalId);


      if (imagenSede) formDataToSend.append("imagen_sede", imagenSede);
      if (imagenCliente)
        formDataToSend.append("imagen_cliente", imagenCliente);

      await axios.post(
        "http://localhost:4000/campana",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Campaña creada correctamente");
      onClose();
    } catch (error) {
      console.log(error);
      alert("Error al crear la campaña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") onClose();
      }}
    >
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
          sx={{ mb: 1, color: "#0d47a1", letterSpacing: 0.8, fontWeight: "bold" }}
        >
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
            <Grid item {...gridWidth} sx={gridCentered} key={field.name}>
              <TextField
                sx={inputStyle}
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
                required
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        {/* VINCULACIÓN & DATOS GENERALES */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          VINCULACIÓN & DATOS GENERALES
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            
            {/* 🔵 FILA 1 – SELECTS CORRECTOS Y ALINEADOS */}
            <Grid container spacing={2}>
              {/* SELECT APLICATIVO */}
              <Grid item xs={12} md={4}>
                {/* 🔑 CLAVE: Usar TextField con la prop 'select' */}
                <TextField
                  select
                  fullWidth
                  sx={inputStyle}
                  label="Aplicativo"
                  name="aplicativoId"
                  value={formData.aplicativoId}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  {aplicativos.map((app) => (
                    <MenuItem key={app.id} value={app.id}>
                      {app.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* SELECT MATRIZ ESCALAMIENTO */}
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  sx={inputStyle}
                  label="Matriz Escalamiento"
                  name="matrizId"
                  value={formData.matrizId}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  {matrices.map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.proveedor}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* SELECT MATRIZ GLOBAL */}
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  sx={inputStyle}
                  label="Matriz Global"
                  name="matrizGlobalId"
                  value={formData.matrizGlobalId}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  {matricesGlobal.map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.proveedor}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {/* 🔵 FILA 2 – CAMPOS ALINEADOS EXACTOS */}
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  sx={inputStyle}
                  label="Ubicación Sede"
                  name="ubicacion_sedes"
                  value={formData.ubicacion_sedes}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  sx={inputStyle}
                  type="number"
                  label="N° Puestos de Operación"
                  name="puestos_operacion"
                  value={formData.puestos_operacion}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  sx={inputStyle}
                  type="number"
                  label="N° Puestos de Estructura"
                  name="puestos_estructura"
                  value={formData.puestos_estructura}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* 🔵 FILA 3 – CAMPOS ALINEADOS EXACTOS */}
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  sx={inputStyle}
                  label="Segmento de Red"
                  name="segmento_red"
                  value={formData.segmento_red}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  sx={inputStyle}
                  type="date"
                  label="Fecha Actualización"
                  name="fecha_actualizacion"
                  // InputLabelProps ya no necesita el estilo manual, el inputStyle corregido es suficiente,
                  // pero lo mantenemos para que la etiqueta quede arriba en el campo de fecha.
                  InputLabelProps={{ shrink: true }} 
                  value={formData.fecha_actualizacion}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4} />
            </Grid>
          </Grid>
        </Grid>


        {/* CONTACTOS */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          CONTACTOS
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "nombre_contacto_cliente", label: "Nombre Contacto Cliente" },
            { name: "correo_contacto_cliente", label: "Correo Cliente", type: "email" },
            { name: "telefono_contacto_cliente", label: "Teléfono Cliente" },
            { name: "nombre_contacto_comercial", label: "Nombre Contacto Comercial" },
            { name: "correo_contacto_comercial", label: "Correo Comercial", type: "email" },
            { name: "telefono_contacto_comercial", label: "Teléfono Comercial" },
          ].map((field) => (
            <Grid item {...gridWidth} sx={gridCentered} key={field.name}>
              <TextField
                sx={inputStyle}
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
                required
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        {/* SOPORTE */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          SOPORTE Y SERVICIOS
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "soporte_tecnico_abai", label: "Soporte Técnico ABAI" },
            { name: "correo_soporte_abai", label: "Correo Soporte ABAI", type: "email" },
            { name: "servicios_prestados", label: "Servicios Prestados" },
          ].map((field) => (
            <Grid item {...gridWidth} sx={gridCentered} key={field.name}>
              <TextField
                sx={inputStyle}
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                fullWidth
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
          <Grid item {...gridWidth} sx={gridCentered}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: "12px",
                borderColor: "#1565c0",
                color: "#1565c0",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#1565c0", color: "#fff" },
              }}
            >
              Subir Imagen Sede
              <input type="file" hidden accept="image/*" onChange={(e) => setImagenSede(e.target.files[0])} />
            </Button>
          </Grid>

          <Grid item {...gridWidth} sx={gridCentered}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: "12px",
                borderColor: "#1565c0",
                color: "#1565c0",
                fontWeight: 600,
                "&:hover": { backgroundColor: "#1565c0", color: "#fff" },
              }}
            >
              Subir Imagen Cliente
              <input type="file" hidden accept="image/*" onChange={(e) => setImagenCliente(e.target.files[0])} />
            </Button>
          </Grid>
        </Grid>

        {/* BOTÓN CREAR */}
        <Box textAlign="center" mt={4}>
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
              "&:hover": {
                backgroundColor: "#0d47a1",
                boxShadow: "0 5px 15px rgba(13,71,161,0.4)",
              },
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