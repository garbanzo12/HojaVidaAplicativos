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
// EDITAR CAMPAÑA
// ----------------------------------------------------

const FormularioEditarCampana = ({ open, onClose, idCampana, onUpdate }) => {
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

    // Relaciones
    aplicativoId: [],
    matrizId: [],
    matrizGlobalId: [],
  });

  const [aplicativos, setAplicativos] = useState([]);
  const [matrices, setMatrices] = useState([]);
  const [matricesGlobal, setMatricesGlobal] = useState([]);

  const [imagenSede, setImagenSede] = useState(null);
  const [imagenCliente, setImagenCliente] = useState(null);

  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------
  // 🔹 Cargar listas (Aplicativos, Matriz, Matriz Global)
  // ----------------------------------------------------

  const cargarListas = async () => {
    try {
      const apps = await axios.get("http://localhost:4000/aplicativo");
      const mats = await axios.get("http://localhost:4000/matriz");
      const matsG = await axios.get("http://localhost:4000/matriz/global");

      setAplicativos(apps.data || []);
      setMatrices(mats.data || []);
      setMatricesGlobal(matsG.data || []);
    } catch (err) {
      console.error("Error cargando listas:", err);
    }
  };

  // ----------------------------------------------------
  // 🔹 Cargar datos de la campaña
  // ----------------------------------------------------

  const cargarCampana = async () => {
    if (!idCampana) return;

    try {
      const { data } = await axios.get(
        `http://localhost:4000/campana/${idCampana}`

      );
      console.log(data)

      setFormData({
        ...data,

        // Relaciones: asegurar arrays
        aplicativoId: data.aplicativos?.map((a) => a.id) || [],
        matrizId: data.matriz_escalamiento?.map((m) => m.id) || [],
        matrizGlobalId: data.matriz_escalamiento_global?.map((m) => m.id) || [],
      });
    } catch (err) {
      console.error("Error al cargar campaña:", err);
    }
  };
        

  // ----------------------------------------------------
  // useEffect principal
  // ----------------------------------------------------

  useEffect(() => {
    if (open) {
      cargarListas();
      cargarCampana();
    }
  }, [open]);

  // ----------------------------------------------------
  // 🔹 handleChange
  // ----------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------------------------------------------
  // 🔹 handleSubmit (PUT)
  // ----------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Arrays
      formData.aplicativoId.forEach((id) =>
        formDataToSend.append("aplicativoId[]", id)
      );
      formData.matrizId.forEach((id) =>
        formDataToSend.append("matrizId[]", id)
      );
      formData.matrizGlobalId.forEach((id) =>
        formDataToSend.append("matrizGlobalId[]", id)
      );

      // Datos de texto
      Object.keys(formData).forEach((key) => {
        if (key !== "aplicativoId" && key !== "matrizId" && key !== "matrizGlobalId") {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Imágenes (opcional)
      if (imagenSede) formDataToSend.append("imagen_sede", imagenSede);
      if (imagenCliente) formDataToSend.append("imagen_cliente", imagenCliente);

      const res = await axios.put(
        `http://localhost:4000/campana/${idCampana}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("✅ Campaña actualizada");
      onUpdate?.();
      onClose();
    } catch (err) {
      console.error("Error actualizando campaña:", err);
      alert("❌ Error al actualizar");
    }

    setLoading(false);
  };

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------

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
          sx={{ mb: 1, color: "#0d47a1", fontWeight: "bold" }}
        >
          EDITAR CAMPAÑA
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* ==========
            CAMPOS
           ========== */}

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
                fullWidth
                size="small"
                required
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        {/* VÍNCULOS Y DATOS GENERALES */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          VINCULACIÓN & DATOS GENERALES
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {/* SELECT Aplicativo */}
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth size="small">
              <InputLabel>Aplicativos</InputLabel>
              <Select
                multiple
                name="aplicativoId"
                value={formData.aplicativoId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    aplicativoId: e.target.value,
                  }))
                }
              >
                {aplicativos.map((app) => (
                  <MenuItem key={app.id} value={app.id}>
                    {app.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* SELECT Matriz */}
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth size="small">
              <InputLabel>Matriz Escalamiento</InputLabel>
              <Select
                multiple
                name="matrizId"
                value={formData.matrizId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    matrizId: e.target.value,
                  }))
                }
              >
                {matrices.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.proveedor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* SELECT Matriz Global */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Matriz Global</InputLabel>
              <Select
                multiple
                name="matrizGlobalId"
                value={formData.matrizGlobalId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    matrizGlobalId: e.target.value,
                  }))
                }
              >
                {matricesGlobal.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.proveedor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Otros campos */}
          {[
            { name: "ubicacion_sedes", label: "Ubicación Sede" },
            { name: "puestos_operacion", label: "N° Puestos Operación", type: "number" },
            { name: "puestos_estructura", label: "N° Puestos Estructura", type: "number" },
            { name: "segmento_red", label: "Segmento Red" },
            { name: "fecha_actualizacion", label: "Fecha Actualización", type: "date" },
          ].map((field) => (
            <Grid item xs={12} sm={5} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type}
                fullWidth
                size="small"
                value={formData[field.name] || ""}
                InputLabelProps={
                  field.type === "date" ? { shrink: true } : undefined
                }
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        {/* GERENTES */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          GERENTES DE CAMPAÑA
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "segmento", label: "Segmento" },
            { name: "nombre_gte_campana", label: "Nombre Gerente de Campaña" },
            { name: "correo_gte_campana", label: "Correo Gerente", type: "email" },
          ].map((field) => (
            <Grid item xs={12} sm={10} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type}
                fullWidth
                size="small"
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
                type={field.type}
                fullWidth
                size="small"
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>

        {/* SERVICIOS */}
        <Typography variant="subtitle1" sx={sectionTitle}>
          SOPORTE Y SERVICIOS
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {[
            { name: "soporte_tecnico_abai", label: "Soporte Técnico ABAI" },
            { name: "correo_soporte_abai", label: "Correo Soporte", type: "email" },
            { name: "servicios_prestados", label: "Servicios Prestados" },
          ].map((field) => (
            <Grid item xs={12} sm={10} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                fullWidth
                size="small"
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
            <Button variant="outlined" component="label" fullWidth>
              Subir Imagen Sede
              <input type="file" hidden onChange={(e) => setImagenSede(e.target.files[0])} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Button variant="outlined" component="label" fullWidth>
              Subir Imagen Cliente
              <input type="file" hidden onChange={(e) => setImagenCliente(e.target.files[0])} />
            </Button>
          </Grid>
        </Grid>

        {/* BOTÓN */}
        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ width: "60%", py: 1.4 }}
          >
            {loading ? "Actualizando..." : "ACTUALIZAR"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FormularioEditarCampana;
