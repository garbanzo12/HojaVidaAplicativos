import React, { useState, useEffect } from "react";
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
import axios from "axios";

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
  overflowY: "auto",
  scrollbarWidth: "none",
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

// NOTE: kept field keys similar to your new form, we'll map them when submitting
const initialFormData = {
  // SECCIÓN 1
  nombre_campana: "",
  cliente: "",
  director_operacion_abai: "",
  correo_director: "",
  // SECCIÓN 2 (selects will store numeric id or "" )
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
  // SECCIÓN 6 (files)
  imagen_sede: null,
  imagen_cliente: null,
};

export default function FormularioModal({ open, onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const [previewSede, setPreviewSede] = useState(null);
  const [previewCliente, setPreviewCliente] = useState(null);

  const [aplicativos, setAplicativos] = useState([]);
  const [matrices, setMatrices] = useState([]);
  const [matricesGlobal, setMatricesGlobal] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [loading, setLoading] = useState(false);

  // Cargar listas desde el backend cuando el modal se abre (igual que el primer componente)
  useEffect(() => {
    if (!open) return;

    // Aplicativos
    axios.get("http://localhost:4000/aplicativo")
      .then(res => {
        const filtrados = (res.data || []).filter(a => a.estado === "HABILITADO");
        setAplicativos(filtrados);
      })
      .catch(err => {
        console.error("Error cargando Aplicativos:", err);
        setAplicativos([]);
      });

    // Matrices
    axios.get("http://localhost:4000/matriz")
      .then(res => {
        const filtrados = (res.data || []).filter(m => m.estado === "HABILITADO");
        setMatrices(filtrados);
      })
      .catch(err => {
        console.error("Error cargando Matrices:", err);
        setMatrices([]);
      });

    // Matrices Global
    axios.get("http://localhost:4000/matriz/global")
      .then(res => {
        const filtrados = (res.data || []).filter(mg => mg.estado === "HABILITADO");
        setMatricesGlobal(filtrados);
      })
      .catch(err => {
        console.error("Error cargando Matrices Global:", err);
        setMatricesGlobal([]);
      });

    // Usuarios
    axios.get("http://localhost:4000/usuario")
      .then(res => {
        const filtrados = (res.data || []).filter(u => u.estado === "HABILITADO");
        setUsuarios(filtrados);
      })
      .catch(err => {
        console.error("Error cargando Usuarios:", err);
        setUsuarios([]);
      });

  }, [open]);

  // Manejo de cambios: convertir números donde corresponda
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // para campos numéricos
    if (type === "number") {
      setFormData(prev => ({ ...prev, [name]: value === "" ? "" : Number(value) }));
      return;
    }

    // para selects que representan relaciones (aplicativo, matriz*, usuario) los guardamos como número o ""
    if (["aplicativo", "matriz_escalamiento", "matriz_global", "usuario"].includes(name)) {
      setFormData(prev => ({ ...prev, [name]: value === "" ? "" : Number(value) }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejo de imágenes con preview
  const handleImagenSede = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imagen_sede: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewSede(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImagenCliente = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imagen_cliente: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewCliente(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const eliminarImagenSede = () => {
    setFormData(prev => ({ ...prev, imagen_sede: null }));
    setPreviewSede(null);
  };

  const eliminarImagenCliente = () => {
    setFormData(prev => ({ ...prev, imagen_cliente: null }));
    setPreviewCliente(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPreviewSede(null);
    setPreviewCliente(null);
  };

  // Mapeo y envío al backend (igual lógica que el formulario original)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      /**
       * MAPEO DE CAMPOS
       * El primer formulario tenía nombres concretos para el backend.
       * Aquí mapeamos los nombres de tu nuevo formulario a esos nombres:
       *
       * - puesto_operacion  -> puestos_operacion
       * - puesto_estructuracion -> puestos_estructura
       *
       * - gerente_campana -> nombre_gte_campana
       * - correo_gerente -> correo_gte_campana
       *
       * - contacto_cliente -> nombre_contacto_cliente
       * - correo_contacto_cliente -> correo_contacto_cliente
       * - telefono_contacto_cliente -> telefono_contacto_cliente
       *
       * - nombre_comerciante -> nombre_contacto_comercial
       * - correo_comerciante -> correo_contacto_comercial
       * - telefono_comerciante -> telefono_contacto_comercial
       *
       * - aplicativo (id) -> aplicativoId  (enviamos como array si tiene valor, o null)
       * - matriz_escalamiento (id) -> matrizId
       * - matriz_global (id) -> matrizGlobalId
       * - usuario (id) -> usuarioId
       *
       * Los demás campos conservan el mismo nombre esperado por el backend.
       */

      // Construimos un objeto con los keys que el backend espera
      const dataToSubmit = {
        nombre_campana: formData.nombre_campana || null,
        cliente: formData.cliente || null,
        director_operacion_abai: formData.director_operacion_abai || null,
        correo_director: formData.correo_director || null,

        // Mapeos numéricos / relaciones
        // Queremos enviar arrays como en el primer formulario (cuando aplique), por eso:
        // si hay un id lo convertimos en [id], si no lo dejamos null
        aplicativoId: formData.aplicativo ? [Number(formData.aplicativo)] : null,
        matrizId: formData.matriz_escalamiento ? [Number(formData.matriz_escalamiento)] : null,
        matrizGlobalId: formData.matriz_global ? [Number(formData.matriz_global)] : null,
        usuarioId: formData.usuario ? [Number(formData.usuario)] : null,

        // Ubicación y puestos (notar nombre adaptado al backend original)
        ubicacion_sedes: formData.ubicacion_sede || null,
        puestos_operacion: formData.puesto_operacion !== "" ? Number(formData.puesto_operacion) : null,
        puestos_estructura: formData.puesto_estructuracion !== "" ? Number(formData.puesto_estructuracion) : null,

        segmento_red: formData.segmento_red || null,
        fecha_actualizacion: formData.fecha_actualizacion || null,

        // Gerentes
        segmento: null, // no viene en tu nuevo form, lo dejamos null (si lo necesitas, agrégalo)
        nombre_gte_campana: formData.gerente_campana || null,
        correo_gte_campana: formData.correo_gerente || null,

        // Contactos
        nombre_contacto_cliente: formData.contacto_cliente || null,
        correo_contacto_cliente: formData.correo_contacto_cliente || null,
        telefono_contacto_cliente: formData.telefono_contacto_cliente || null,

        nombre_contacto_comercial: formData.nombre_comerciante || null,
        correo_contacto_comercial: formData.correo_comerciante || null,
        telefono_contacto_comercial: formData.telefono_comerciante || null,

        // Soporte y servicios
        soporte_tecnico_abai: formData.soporte_tecnico_abai || null,
        correo_soporte_abai: formData.correo_soporte_abai || null,
        servicios_prestados: formData.servicios_prestados || null,

        // Estado por defecto (como en el primer componente)
        estado: "HABILITADO",
      };

      // Añadir las claves del objeto al FormData
      Object.keys(dataToSubmit).forEach((key) => {
        const val = dataToSubmit[key];
        // Si es null -> no lo agregamos (igual que en el primer formulario)
        if (val === null || val === undefined) return;

        // Si el valor es array -> añadimos cada elemento con el nombre style del primer form: e.g. aplicativoId[]
        if (Array.isArray(val)) {
          val.forEach((v) => {
            // permitimos que el array contenga null (para indicar "Ninguno") pero en tu UI no se manda null
            formDataToSend.append(`${key}[]`, v);
          });
        } else {
          formDataToSend.append(key, val);
        }
      });

      // Añadir imágenes si existen (nombres de campo igual que el primer form)
      if (formData.imagen_sede) formDataToSend.append("imagen_sede", formData.imagen_sede);
      if (formData.imagen_cliente) formDataToSend.append("imagen_cliente", formData.imagen_cliente);

      // DEBUG: listar entries antes de enviar (útil en desarrollo)
      console.log("Revisando FormData antes de enviar:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Enviar con axios (multipart/form-data)
      const response = await axios.post("http://localhost:4000/campana", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Campaña creada:", response.data);
      alert("✅ Campaña creada correctamente");

      // Reset y cerrar
      resetForm();
      onClose();
    } catch (err) {
      console.error("❌ Error al crear campaña:", err.response?.data || err.message || err);
      alert("❌ Error al crear la campaña: " + (err.response?.data?.message || err.message || "Error desconocido"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick') return;
        handleClose();
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 16, top: 16, bgcolor: "#f5f5f5" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#0d47a1" }}>
          CREAR CAMPAÑA
        </Typography>

        {/* SECCIÓN 1 */}
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* SECCIÓN 2 - VINCULACIÓN Y LISTAS TRAIDAS */}
        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Vinculación & Datos Generales</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small" sx={selectStyles}>
                    <InputLabel id="aplicativo-label">Aplicativo</InputLabel>
                    <Select
                      labelId="aplicativo-label"
                      name="aplicativo"
                      value={formData.aplicativo || ""}
                      label="Aplicativo"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      <MenuItem value="">
                        <em>Ninguno</em>
                      </MenuItem>
                      {aplicativos.map(app => (
                        <MenuItem key={app.id} value={app.id}>{app.nombre}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small" sx={selectStyles}>
                    <InputLabel id="matriz-escalamiento-label">Matriz Escalamiento</InputLabel>
                    <Select
                      labelId="matriz-escalamiento-label"
                      name="matriz_escalamiento"
                      value={formData.matriz_escalamiento || ""}
                      label="Matriz Escalamiento"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      <MenuItem value="">
                        <em>Ninguna</em>
                      </MenuItem>
                      {matrices.map(m => (
                        <MenuItem key={m.id} value={m.id}>{m.proveedor || m.nombre || `Matriz ${m.id}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small" sx={selectStyles}>
                    <InputLabel id="matriz-global-label">Matriz Global</InputLabel>
                    <Select
                      labelId="matriz-global-label"
                      name="matriz_global"
                      value={formData.matriz_global || ""}
                      label="Matriz Global"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      <MenuItem value="">
                        <em>Ninguna</em>
                      </MenuItem>
                      {matricesGlobal.map(mg => (
                        <MenuItem key={mg.id} value={mg.id}>{mg.proveedor || mg.nombre || `Global ${mg.id}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small" sx={selectStyles}>
                    <InputLabel id="usuario-label">Encargado</InputLabel>
                    <Select
                      labelId="usuario-label"
                      name="usuario"
                      value={formData.usuario || ""}
                      label="Encargado"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      <MenuItem value="">
                        <em>Ninguno</em>
                      </MenuItem>
                      {usuarios.map(u => (
                        <MenuItem key={u.id} value={u.id}>{u.nombre_completo || u.nombre || `Usuario ${u.id}`}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Ubicación Sede"
                    name="ubicacion_sede"
                    value={formData.ubicacion_sede}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={3} md={3}>
                  <TextField
                    label="N° Puesto de Operación"
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
                    label="N° Puesto de Estructuración"
                    name="puesto_estructuracion"
                    value={formData.puesto_estructuracion}
                    type="number"
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Segmento de Red"
                    name="segmento_red"
                    value={formData.segmento_red}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Fecha Actualización"
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
                    label="Gerente"
                    name="gerente_campana"
                    value={formData.gerente_campana}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Correo Gerente"
                    name="correo_gerente"
                    value={formData.correo_gerente}
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

        {/* SECCIÓN 4 - CONTACTOS */}
        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Contacto Cliente</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre Contacto"
                    name="contacto_cliente"
                    value={formData.contacto_cliente}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Correo"
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
                    label="Teléfono"
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
                    label="Nombre Comerciante"
                    name="nombre_comerciante"
                    value={formData.nombre_comerciante}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Correo Comerciante"
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
                    label="Teléfono Comerciante"
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
                    label="Soporte Técnico ABAI"
                    name="soporte_tecnico_abai"
                    value={formData.soporte_tecnico_abai}
                    fullWidth
                    size="small"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Correo Soporte ABAI"
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
                    label="Servicios Prestados"
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

        {/* SECCIÓN 6 - IMÁGENES */}
        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Imágenes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} justifyContent="center">
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
                        "&:hover": { backgroundColor: "#1565c0", color: "#fff" },
                      }}
                    >
                      Subir Imagen Sede
                      <input type="file" hidden accept="image/*" onChange={handleImagenSede} />
                    </Button>
                  ) : (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                      <Box
                        component="img"
                        src={previewSede}
                        alt="Preview Sede"
                        sx={{ width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: '10px', border: '2px solid #1565c0', mb: 1 }}
                      />
                      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={eliminarImagenSede}>
                        Eliminar Imagen
                      </Button>
                    </Box>
                  )}
                </Grid>

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
                        "&:hover": { backgroundColor: "#1565c0", color: "#fff" },
                      }}
                    >
                      Subir Imagen Cliente
                      <input type="file" hidden accept="image/*" onChange={handleImagenCliente} />
                    </Button>
                  ) : (
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                      <Box
                        component="img"
                        src={previewCliente}
                        alt="Preview Cliente"
                        sx={{ width: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: '10px', border: '2px solid #1565c0', mb: 1 }}
                      />
                      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={eliminarImagenCliente}>
                        Eliminar Imagen
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* BOTÓN */}
        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              width: "30%",
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "10px",
              backgroundColor: "#1565c0",
              boxShadow: "0 4px 12px rgba(21,101,192,0.3)",
              "&:hover": { backgroundColor: "#0d47a1", boxShadow: "0 5px 15px rgba(13,71,161,0.4)" },
            }}
          >
            {loading ? "Creando..." : "CREAR CAMPAÑA"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
