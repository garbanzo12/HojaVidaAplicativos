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

const initialFormData = {
  nombre_campana: "",
  cliente: "",
  director_operacion_abai: "",
  correo_director: "",
  aplicativo: [],
  matriz_escalamiento: [],
  matriz_global: [],
  usuario: "",
  ubicacion_sede: "",
  puesto_operacion: "",
  puesto_estructuracion: "",
  segmento_red: "",
  fecha_actualizacion: "",
  gerente_campana: "",
  correo_gerente: "",
  telefono_gerente: "",
  contacto_cliente: "",
  correo_contacto_cliente: "",
  telefono_contacto_cliente: "",
  nombre_comerciante: "",
  correo_comerciante: "",
  telefono_comerciante: "",
  soporte_tecnico_abai: "",
  correo_soporte_abai: "",
  servicios_prestados: "",
  imagen_sede: null,
  imagen_cliente: null,
};

export default function FormularioEditarCampana({ open, onClose, idCampana, onUpdate }) {
  const [formData, setFormData] = useState(initialFormData);
  const [previewSede, setPreviewSede] = useState(null);
  const [previewCliente, setPreviewCliente] = useState(null);

  const [aplicativos, setAplicativos] = useState([]);
  const [matrices, setMatrices] = useState([]);
  const [matricesGlobal, setMatricesGlobal] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [listasCargadas, setListasCargadas] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar listas (aplicativos, matrices, matricesGlobal, usuarios)
  const cargarListas = async () => {
    try {
      const [appsRes, matsRes, matsGRes, usersRes] = await Promise.all([
        axios.get("http://localhost:4000/aplicativo"),
        axios.get("http://localhost:4000/matriz"),
        axios.get("http://localhost:4000/matriz/global"),
        axios.get("http://localhost:4000/usuario"),
      ]);

      setAplicativos((appsRes.data || []).filter(a => a.estado === "HABILITADO"));
      setMatrices((matsRes.data || []).filter(m => m.estado === "HABILITADO"));
      setMatricesGlobal((matsGRes.data || []).filter(mg => mg.estado === "HABILITADO"));
      setUsuarios((usersRes.data || []).filter(u => u.estado === "HABILITADO"));

      setListasCargadas(true);
    } catch (err) {
      console.error("Error cargando listas:", err);
      setAplicativos([]);
      setMatrices([]);
      setMatricesGlobal([]);
      setUsuarios([]);
      setListasCargadas(true); // marcar true para intentar cargar campaña de todas formas
    }
  };

  // Cargar campaña (solo después de listas cargadas)
  const cargarCampana = async () => {
    if (!idCampana) return;

    try {
      const { data } = await axios.get(`http://localhost:4000/campana/${idCampana}`);
      // console.log("Campaña cargada:", data);

      // Mapear los campos del backend al formData del formulario nuevo
      setFormData({
        nombre_campana: data.nombre_campana || "",
        cliente: data.cliente || "",
        director_operacion_abai: data.director_operacion_abai || "",
        correo_director: data.correo_director || "",
        // Preseleccionar selects tomando primer id si existiera
        aplicativo: data.aplicativos?.map(a => a.id) || [],
        matriz_escalamiento: data.matriz_escalamiento?.map(m => m.id) || [],
        matriz_global: data.matriz_escalamiento_global?.map(mg => mg.id) || [],
        usuario: data.usuarios?.length ? data.usuarios[0].id : "",
        ubicacion_sede: data.ubicacion_sedes || "",
        puesto_operacion: data.puestos_operacion ?? "", // puede ser number
        puesto_estructuracion: data.puestos_estructura ?? "",
        segmento_red: data.segmento_red || "",
        fecha_actualizacion: data.fecha_actualizacion || "",
        gerente_campana: data.nombre_gte_campana || "",
        correo_gerente: data.correo_gte_campana || "",
        telefono_gerente: data.telefono_gte_campana || "",
        contacto_cliente: data.nombre_contacto_cliente || "",
        correo_contacto_cliente: data.correo_contacto_cliente || "",
        telefono_contacto_cliente: data.telefono_contacto_cliente || "",
        nombre_comerciante: data.nombre_contacto_comercial || "",
        correo_comerciante: data.correo_contacto_comercial || "",
        telefono_comerciante: data.telefono_contacto_comercial || "",
        soporte_tecnico_abai: data.soporte_tecnico_abai || "",
        correo_soporte_abai: data.correo_soporte_abai || "",
        servicios_prestados: data.servicios_prestados || "",
        imagen_sede: null,
        imagen_cliente: null,
      });

      // Si el backend retorna URLs a las imágenes, las usamos para preview.
      // Ajusta las propiedades según cómo tu API retorne las URLs (ej: data.imagen_sede_url)
      if (data.imagen_sede_url) {
        setPreviewSede(data.imagen_sede_url);
      } else if (data.imagen_sede) {
        // a veces viene como path
        setPreviewSede(data.imagen_sede);
      } else {
        setPreviewSede(null);
      }

      if (data.imagen_cliente_url) {
        setPreviewCliente(data.imagen_cliente_url);
      } else if (data.imagen_cliente) {
        setPreviewCliente(data.imagen_cliente);
      } else {
        setPreviewCliente(null);
      }

    } catch (err) {
      console.error("Error al cargar campaña:", err);
    }
  };

  // Efectos: cargar listas cuando abre el modal, luego cargar campaña
  useEffect(() => {
    if (open) {
      setListasCargadas(false);
      cargarListas();
    }
  }, [open]);

  useEffect(() => {
    if (listasCargadas && open) {
      cargarCampana();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listasCargadas, open, idCampana]);

  // Manejo de cambios: convertir números cuando corresponda
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData(prev => ({ ...prev, [name]: value === "" ? "" : Number(value) }));
      return;
    }

    if (Array.isArray(value)) {
      setFormData(prev => ({ ...prev, [name]: value.map(v => Number(v)) }));
      return;
    }
    // para selects que representan relaciones (aplicativo, matriz*, usuario) los guardamos como número o ""
    if (["aplicativo", "matriz_escalamiento", "matriz_global", "usuario"].includes(name)) {
      setFormData(prev => ({ ...prev, [name]: value }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejo de imágenes con preview (si cargan nuevas, reemplazan preview)
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
    setFormData(prev => ({ ...prev, imagen_sede: "Eliminada" }));
    setPreviewSede(null);
  };

  const eliminarImagenCliente = () => {
    setFormData(prev => ({ ...prev, imagen_cliente: "Eliminada" }));
    setPreviewCliente(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPreviewSede(null);
    setPreviewCliente(null);
  };

  // Submit -> PUT multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idCampana) {
      alert("ID de campaña faltante.");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();

      // Convertir selects a la estructura que espera el backend:
      // aplicativoId[], matrizId[], matrizGlobalId[], usuarioId (simple)
      const aplicativoIdArr = formData.aplicativo || [];
      const matrizIdArr = formData.matriz_escalamiento || [];
      const matrizGlobalArr = formData.matriz_global || [];
      const usuarioIdVal = formData.usuario ? Number(formData.usuario) : "";

      aplicativoIdArr.forEach(id => formDataToSend.append("aplicativoId[]", id));
      matrizIdArr.forEach(id => formDataToSend.append("matrizId[]", id));
      matrizGlobalArr.forEach(id => formDataToSend.append("matrizGlobalId[]", id));
      if (usuarioIdVal !== "") formDataToSend.append("usuarioId", usuarioIdVal);
       
      // Otros campos mapeados al backend (mismos nombres que en tu formulario antiguo)
      const dataToSubmit = {
        nombre_campana: formData.nombre_campana || null,
        cliente: formData.cliente || null,
        director_operacion_abai: formData.director_operacion_abai || null,
        correo_director: formData.correo_director || null,
        ubicacion_sedes: formData.ubicacion_sede || null,
        puestos_operacion: formData.puesto_operacion !== "" ? Number(formData.puesto_operacion) : null,
        puestos_estructura: formData.puesto_estructuracion !== "" ? Number(formData.puesto_estructuracion) : null,
        segmento_red: formData.segmento_red || null,
        fecha_actualizacion: formData.fecha_actualizacion || null,
        nombre_gte_campana: formData.gerente_campana || null,
        correo_gte_campana: formData.correo_gerente || null,
        telefono_gte_campana: formData.telefono_gerente || null,
        nombre_contacto_cliente: formData.contacto_cliente || null,
        correo_contacto_cliente: formData.correo_contacto_cliente || null,
        telefono_contacto_cliente: formData.telefono_contacto_cliente || null,
        nombre_contacto_comercial: formData.nombre_comerciante || null,
        correo_contacto_comercial: formData.correo_comerciante || null,
        telefono_contacto_comercial: formData.telefono_comerciante || null,
        soporte_tecnico_abai: formData.soporte_tecnico_abai || null,
        correo_soporte_abai: formData.correo_soporte_abai || null,
        servicios_prestados: formData.servicios_prestados || null,
        estado: "HABILITADO",
      };

      Object.keys(dataToSubmit).forEach(key => {
        const val = dataToSubmit[key];
        if (val === null || val === undefined) return;
        formDataToSend.append(key, val);
      });

      // Añadir las imágenes si se cargaron nuevas (si no, no las incluimos)
      if (formData.imagen_sede) formDataToSend.append("imagen_sede", formData.imagen_sede);
      if (formData.imagen_cliente) formDataToSend.append("imagen_cliente", formData.imagen_cliente);
      if(formData.imagen_sede === "Eliminada"){
          dataToSubmit["imagen_sede"] = null;
      }
      if(formData.imagen_cliente === "Eliminada"){
          dataToSubmit["imagen_cliente"] = null;
      }
      // DEBUG (opcional)
      // for (let p of formDataToSend.entries()) console.log(p[0], p[1]);

      const res = await axios.put(`http://localhost:4000/campana/${idCampana}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Campaña actualizada");
      onUpdate?.();
      onClose();
    } catch (err) {
      console.error("Error actualizando campaña:", err.response?.data || err.message || err);
      alert("❌ Error al actualizar la campaña: " + (err.response?.data?.message || err.message || "Error desconocido"));
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
        if (reason === "backdropClick") return;
        handleClose();
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={modalStyle}>
        <IconButton onClick={handleClose} sx={{ position: "absolute", right: 16, top: 16, bgcolor: "#f5f5f5" }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#0d47a1" }}>
          EDITAR CAMPAÑA
        </Typography>

        {/* Aquí reutiliza exactamente la misma UI del formulario que me diste */}
        {/* SECCIÓN 1 */}
        <Card sx={cardAccordionStyle}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Información Principal</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Nombre de Campaña *" name="nombre_campana" value={formData.nombre_campana} fullWidth size="small" onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Cliente *" name="cliente" value={formData.cliente} fullWidth size="small" onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Director Operación ABAI *" name="director_operacion_abai" value={formData.director_operacion_abai} fullWidth size="small" onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Correo Director *" name="correo_director" value={formData.correo_director} type="email" fullWidth size="small" onChange={handleChange} required />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* SECCIÓN 2 */}
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
                      multiple
                      value={formData.aplicativo}
                      label="Aplicativo"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
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
                      multiple
                      value={formData.matriz_escalamiento}
                      label="Matriz Escalamiento"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      {matrices.map(m => (
                        <MenuItem key={m.id} value={m.id}>
                          {m.proveedor || m.nombre || `Matriz ${m.id}`}
                        </MenuItem>
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
                      multiple
                      value={formData.matriz_global}
                      label="Matriz Global"
                      onChange={handleChange}
                      MenuProps={menuProps}
                    >
                      {matricesGlobal.map(mg => (
                        <MenuItem key={mg.id} value={mg.id}>
                          {mg.proveedor || mg.nombre || `Global ${mg.id}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small" sx={selectStyles}>
                    <InputLabel id="usuario-label">Encargado</InputLabel>
                    <Select labelId="usuario-label" name="usuario" value={formData.usuario || ""} label="Encargado" onChange={handleChange} MenuProps={menuProps}>
                      {usuarios.map(u => <MenuItem key={u.id} value={u.id}>{u.nombre_completo || u.nombre || `Usuario ${u.id}`}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Resto de campos */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField label="Ubicación Sede" name="ubicacion_sede" value={formData.ubicacion_sede} fullWidth size="small" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField label="N° Puesto de Operación" name="puesto_operacion" value={formData.puesto_operacion} type="number" fullWidth size="small" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <TextField label="N° Puesto de Estructuración" name="puesto_estructuracion" value={formData.puesto_estructuracion} type="number" fullWidth size="small" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField label="Segmento de Red" name="segmento_red" value={formData.segmento_red} fullWidth size="small" onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField label="Fecha Actualización" name="fecha_actualizacion" value={formData.fecha_actualizacion} type="date" fullWidth size="small" InputLabelProps={{ shrink: true }} onChange={handleChange} />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* SECCIONES 3/4/5/6 (idénticas a tu UI) */}
        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Gerentes de Campaña</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField label="Gerente" name="gerente_campana" value={formData.gerente_campana} fullWidth size="small" onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Correo Gerente" name="correo_gerente" value={formData.correo_gerente} type="email" fullWidth size="small" onChange={handleChange} /></Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Contacto Cliente</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField label="Nombre Contacto" name="contacto_cliente" value={formData.contacto_cliente} fullWidth size="small" onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Correo" name="correo_contacto_cliente" value={formData.correo_contacto_cliente} type="email" fullWidth size="small" onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Teléfono" name="telefono_contacto_cliente" value={formData.telefono_contacto_cliente} type="tel" fullWidth size="small" onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Nombre Comerciante" name="nombre_comerciante" value={formData.nombre_comerciante} fullWidth size="small" onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Correo Comerciante" name="correo_comerciante" value={formData.correo_comerciante} type="email" fullWidth size="small" onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Teléfono Comerciante" name="telefono_comerciante" value={formData.telefono_comerciante} type="tel" fullWidth size="small" onChange={handleChange} /></Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Soporte y Servicios</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField label="Soporte Técnico ABAI" name="soporte_tecnico_abai" value={formData.soporte_tecnico_abai} fullWidth size="small" onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Correo Soporte ABAI" name="correo_soporte_abai" value={formData.correo_soporte_abai} type="email" fullWidth size="small" onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Servicios Prestados" name="servicios_prestados" value={formData.servicios_prestados} fullWidth size="small" onChange={handleChange} /></Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        <Card sx={cardAccordionStyle}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={sectionTitle}> Imágenes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
                  {!previewSede ? (
                    <Button variant="outlined" component="label" fullWidth sx={{ py:1.2, borderRadius:"10px", borderColor:"#1565c0", color:"#1565c0", fontWeight:600, "&:hover":{backgroundColor:"#1565c0", color:"#fff"} }}>
                      Subir Imagen Sede
                      <input type="file" hidden accept="image/*" onChange={handleImagenSede} />
                    </Button>
                  ) : (
                    <Box sx={{ width:'100%', textAlign:'center' }}>
                      <Box component="img" src={previewSede} alt="Preview Sede" sx={{ width:'100%', maxHeight:200, objectFit:'contain', borderRadius:'10px', border:'2px solid #1565c0', mb:1 }} />
                      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={eliminarImagenSede}>Eliminar Imagen</Button>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sm={6} display="flex" flexDirection="column" alignItems="center">
                  {!previewCliente ? (
                    <Button variant="outlined" component="label" fullWidth sx={{ py:1.2, borderRadius:"10px", borderColor:"#1565c0", color:"#1565c0", fontWeight:600, "&:hover":{backgroundColor:"#1565c0", color:"#fff"} }}>
                      Subir Imagen Cliente
                      <input type="file" hidden accept="image/*" onChange={handleImagenCliente} />
                    </Button>
                  ) : (
                    <Box sx={{ width:'100%', textAlign:'center' }}>
                      <Box component="img" src={previewCliente} alt="Preview Cliente" sx={{ width:'100%', maxHeight:200, objectFit:'contain', borderRadius:'10px', border:'2px solid #1565c0', mb:1 }} />
                      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={eliminarImagenCliente}>Eliminar Imagen</Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Card>

        {/* BOTÓN */}
        <Box textAlign="center" sx={{ mt: 3 }}>
          <Button variant="contained" type="submit" disabled={loading} sx={{ width: "30%", py: 1.5, fontWeight: "bold", borderRadius: "10px", backgroundColor: "#1565c0", boxShadow: "0 4px 12px rgba(21,101,192,0.3)", "&:hover": { backgroundColor: "#0d47a1", boxShadow: "0 5px 15px rgba(13,71,161,0.4)" } }}>
            {loading ? "Actualizando..." : "ACTUALIZAR CAMPAÑA"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
