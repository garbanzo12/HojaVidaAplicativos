import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Divider,
  TextField,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import FormularioEditar from "./formularioEditar.js";
import { useAuth } from "../context/AuthContext";

const TablaCampana = () => {
  const { user } = useAuth(); 
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  console.log(user)
useEffect(() => {
  const fetchCampanas = async () => {
    setLoading(true);

    try {
      // 2️⃣ Obtener todas las campañas (esto lo hacemos siempre)
      const res = await axios.get("http://localhost:4000/campana/detalles");
      let campanas = res.data;

      // 👉 SOLO filtrar si el usuario es proveedor
      if (user?.rol === "proveedor") {
        // 1️⃣ Obtener campañas vinculadas al usuario
        const userCampanas = await axios.get(
          `http://localhost:4000/campana/usuario/${user.id}`
        );

        const campanasPermitidas = userCampanas.data.map((item) => item.id);

        // 3️⃣ Filtrar solo sus campañas
        campanas = campanas.filter((c) => campanasPermitidas.includes(c.id));
      }

      // 4️⃣ Mapear las campañas para mostrarlas
      const data = campanas.map((c) => ({
        id: c.id,
        nombreCampaña: c.nombre_campana,
        cliente: c.cliente,
        directorOperacion: c.director_operacion_abai,
        correo: c.correo_director,
        segmento: c.segmento,
        nombreGerente: c.nombre_gte_campana,
        correoGerente: c.correo_gte_campana,
        sede: c.ubicacion_sedes,
        puestoOperacion: c.puestos_operacion,
        puestoEstructura: c.puestos_estructura,
        segmentoRed: c.segmento_red,
        fechaActualizacion: c.fecha_actualizacion,
        contactoCliente: c.nombre_contacto_cliente,
        correoCliente: c.correo_contacto_cliente,
        telefonoCliente: c.telefono_contacto_cliente,
        contactoComercial: c.nombre_contacto_comercial,
        correoComercial: c.correo_contacto_comercial,
        telefonoComercial: c.telefono_contacto_comercial,
        contactoTecnico: c.soporte_tecnico_abai,
        correoTecnico: c.correo_soporte_abai,
        serviciosTecnico: c.servicios_prestados,
        aplicativo: c.aplicativo_nombre,
        matrizEscalamiento: c.matriz_nombre,
        matrizGlobal: c.matriz_global_nombre,
        encargado: c.usuario_nombre,
        estado: c.estado === "HABILITADO" ? "Activo" : "Inactivo",
        imagen: c.imagen_cliente
          ? `http://localhost:4000/uploads/${c.imagen_cliente}`
          : "https://via.placeholder.com/250",
      }));

      setRows(data);

    } catch (err) {
      console.error("❌ Error al obtener campañas:", err);
    } finally {
      setLoading(false);
    }
  };

  if (user?.id) {
    fetchCampanas();
  }
}, [user]);



  const handleToggleEstado = async (id, currentEstado) => {
    const nuevoEstado = currentEstado === "Activo" ? "DESHABILITADO" : "HABILITADO";
    try {
      await axios.put(`http://localhost:4000/campana/estado/${id}`, { estado: nuevoEstado });
      setRows((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, estado: nuevoEstado === "HABILITADO" ? "Activo" : "Inactivo" }
            : c
        )
      );
    } catch (error) {
      console.error("❌ Error al actualizar estado:", error);
    }
  };

  const filtered = rows.filter(
    (c) =>
      c.nombreCampaña.toLowerCase().includes(search.toLowerCase()) ||
      c.directorOperacion.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleVerDetalle = (campaña) => setSelected(campaña);
  const handleCerrarDetalle = () => setSelected(null);
  const handleEditar = (campaña) => setEditing(campaña);
  const handleCerrarEditar = () => setEditing(null);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
          sx={{
            padding: "40px",
            minHeight: "100vh",
          }}
     >
      <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          gap={2}
          flexWrap="wrap"
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#002b5b"
            sx={{
              borderRadius: 2,
              padding: "10px 20px",
              flex: "0 0 40%",
              minWidth: "250px",
            }}
          >
            LISTA DE CAMPAÑAS
          </Typography>


        </Box>

      <TableContainer
        component={Paper}
        sx={{
         borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#002b5b" }}>
            <TableRow>
              {["Imagen", "Campaña", "Cliente", "Director", "Correo", "Estado", "Acciones"].map(
                (h, i) => (
                  <TableCell
                    key={i}
                    align="center"
                    sx={{  color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "14px",
                    py: 1.5, }}
                  >
                    {h}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((c) => (
                <TableRow
                  key={c.id}
                  sx={{
                    "&:hover": { backgroundColor: "#e3f2fd  " },
                    transition: "0.3s",
                  }}
                >
                  <TableCell align="center">
                    <Avatar
                      src={c.imagen}
                      alt={c.nombreCampaña}
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                  </TableCell>
                  <TableCell align="center">{c.nombreCampaña}</TableCell>
                  <TableCell align="center">{c.cliente}</TableCell>
                  <TableCell align="center">{c.directorOperacion}</TableCell>
                  <TableCell align="center">{c.correo}</TableCell>
                  <TableCell align="center">
                  <Button
                    onClick={(e) => {
                      if (user?.rol === "proveedor") {
                        e.preventDefault(); // evita que ejecute la acción
                        return;
                      }
                      handleToggleEstado(c.id, c.estado);
                    }}
                    variant="contained"
                    sx={{
                      backgroundColor: c.estado === "Activo" ? "#4caf50" : "#e53935",
                      "&:hover": {
                        backgroundColor: c.estado === "Activo" ? "#43a047" : "#c62828",
                      },
                      borderRadius: "20px",
                      textTransform: "none",
                      fontWeight: "bold",

                      // 👇 Estilos cuando no puede usarlo, pero conserva color
                      cursor: user?.rol === "proveedor" ? "not-allowed" : "pointer",
                    }}
                  >
                    {c.estado}
                  </Button>

                  </TableCell>
                  <TableCell align="center">
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleVerDetalle(c)}
                        sx={{
                          color: "#0288d1",
                          borderColor: "#0288d1",
                          backgroundColor: "#e3f2fd",
                          textTransform: "none",
                          borderRadius: "10px",
                          px: 2,
                          py: 0.5,
                          fontWeight: 600,
                          boxShadow: "0 1px 3px rgba(2, 136, 209, 0.2)",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            backgroundColor: "#0288d1",
                            color: "#fff",
                            borderColor: "#0288d1",
                            boxShadow: "0 3px 6px rgba(2, 136, 209, 0.3)",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        Ver Detalle
                      </Button>

                      {user?.rol !== "proveedor" && (<Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          ml: 1,
                          textTransform: "none",
                          borderRadius: "10px",
                          px: 2,
                          py: 0.5,
                          fontWeight: 600,
                          backgroundColor: "#1565c0",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            backgroundColor: "#0d47a1",
                            transform: "scale(1.05)",
                            boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                          },
                        }}
                        onClick={() => handleEditar(c)}
                        disabled={user?.rol === "proveedor"}  // El boton se desactiva para el proveedor
                      >
                        Editar
                      </Button>)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="center" alignItems="center" py={1}>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelDisplayedRows={() => ""}
            labelRowsPerPage=""
          />
        </Box>
      </TableContainer>

      {/* 🔍 Modal Detalle */}
     <Dialog
  open={Boolean(selected)}
  onClose={handleCerrarDetalle}
  fullWidth
  maxWidth="md"
  PaperProps={{
    sx: {
      borderRadius: 4,
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      overflow: "hidden",
      backgroundColor: "#f9fafc",
    },
  }}
>
  {selected && (
    <>
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.7rem",
          color: "#fff",
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          borderBottom: "4px solid #1565c0",
          textAlign: "center",
          py: 2,
          letterSpacing: 0.8,
        }}
      >
        DETALLES DE LA CAMPAÑA
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          background: "linear-gradient(180deg, #f9fafc 0%, #ffffff 100%)",
          maxHeight: "80vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {/* Imagen */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Box
            sx={{
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: -10,
                background: "linear-gradient(135deg, #667eea 0%, #ad4fe4ff 100%)",
                borderRadius: 4,
                zIndex: -1,
                opacity: 0.15,
              },
            }}
          >
            <img
              src={selected.imagen}
              alt={selected.nombreCampaña}
              style={{
                width: "260px",
                height: "auto",
                borderRadius: "16px",
                border: "4px solid #fff",
                boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>

        {/* Secciones Centradas */}
        {[
          {
            color: "#000000ff",
            title: "Información Principal",
            bg: "#ffffffff",
            border: "#1565c0",
            fields: [
              ["Nombre de Campaña", selected.nombreCampaña],
              ["Cliente", selected.cliente],
              ["Director de Operación", selected.directorOperacion],
              ["Correo", selected.correo],
            ],
          },
          {
            color: "#000000ff",
            title: "Gerente de Campaña",
            bg: "#ffffffff",
            border: "#FFAA00",
            fields: [
              ["Segmento Campaña", selected.segmento || "No definido"],
              ["Nombre Campaña ", selected.nombreGerente || "No disponible"],
              ["Correo Campaña", selected.correoGerente || "No disponible"],
            ],
          },
          {
            color: "#000000ff",
            title: "Datos Generales",
            bg: "#fff",
            border: "#1565c0",
            fields: [
              ["Sede", selected.sede],
              ["Puesto de Operación", selected.puestoOperacion],
              ["Puesto de Estructura", selected.puestoEstructura],
              ["Segmento de Red", selected.segmentoRed],
            ],
          },
        ].map((section, index) => (
          <Box
            key={index}
            sx={{
              px: 4,
              py: 3,
              backgroundColor: section.bg,
            }}
          >
            {/* Título centrado */}
            <Box sx={{ textAlign: "center", mb: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontWeight: 700,
                  color: section.color,
                  borderBottom: `3px solid ${section.border}`,
                  pb: 0.5,
                }}
              >
                {section.icon} {section.title}
              </Typography>
            </Box>

            {/* Contenido centrado */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#fff",
                borderRadius: 3,
                p: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <Grid
                container
                spacing={2.5}
                justifyContent="center"
                alignItems="center"
                sx={{ maxWidth: 800 }}
              >
                {section.fields.map(([label, value], i) => (
                  <Grid item xs={12} sm={6} md={3} key={i}>
                    <Typography
                      sx={{
                        color: "#5a6c7d",
                        fontSize: "0.9rem",
                        mb: 0.5,
                        textAlign: "center",
                      }}
                    >
                      <strong style={{ color: section.color }}>{label}:</strong>
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: "#2c3e50",
                        wordBreak: "break-word",
                      }}
                    >
                      {value || "—"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        ))}

        {/* NUEVA SECCIÓN - VINCULACIÓN */}
          <Box sx={{ px: 4, py: 3, backgroundColor: "#fff" }}>
            <Box sx={{ textAlign: "center", mb: 2.5 }}>
              <Typography
                variant="h6"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontWeight: 700,
                  color: "#000000ff",
                  borderBottom: "3px solid #325FDBFF",
                  pb: 0.5,
                }}
              >
                Vinculación & Relacionados
              </Typography>
            </Box>

            <Grid
              container
              spacing={2.5}
              justifyContent="center"
              alignItems="center"
              sx={{ maxWidth: 900, mx: "auto" }}
            >
              {[
                ["Aplicativo", selected.aplicativo || "—"],
                ["Matriz Escalamiento", selected.matrizEscalamiento || "—"],
                ["Matriz Global", selected.matrizGlobal || "—"],
                ["Encargado", selected.encargado || "—"],
              ].map(([label, value], i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Typography
                    sx={{
                      color: "#5a6c7d",
                      fontSize: "0.9rem",
                      mb: 0.5,
                      textAlign: "center",
                    }}
                  >
                    <strong style={{ color: "#000000ff" }}>{label}:</strong>
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "#2c3e50",
                      wordBreak: "break-word",
                    }}
                  >
                    {value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>


        <Box sx={{ px: 4, py: 3, backgroundColor: "#fff" }}>
          <Box sx={{ textAlign: "center", mb: 2.5 }}>
            <Typography
              variant="h6"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                fontWeight: 700,
                color: "#000000ff",
                borderBottom: "3px solid #FFAA00",
                pb: 0.5,
              }}
            >
              Contactos
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center" alignItems="stretch">
            {[
              {
                titulo: "Cliente",
                color: "#2e7d32",
                borde: "#FFAA00",
                contacto: selected.contactoCliente,
                correo: selected.correoCliente,
                telefono: selected.telefonoCliente,
              },
              {
                titulo: "Comercial",
                color: "#1565c0",
                borde: "#0054D1",
                contacto: selected.contactoComercial,
                correo: selected.correoComercial,
                telefono: selected.telefonoComercial,
              },
              {
                titulo: "Técnico",
                color: "#e65100",
                borde: "#f57c00",
                contacto: selected.contactoTecnico,
                correo: selected.correoTecnico,
                servicio: selected.serviciosTecnico,
              },
            ].map((tipo, i) => (
              <Grid item xs={12} sm={6} md={3.5} key={i}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    p: 2.5,
                    borderLeft: `5px solid ${tipo.borde}`,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: tipo.color,
                      mb: 2,
                      fontSize: "1.05rem",
                    }}
                  >
                    {tipo.titulo}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
                    <strong style={{ color: "#5a6c7d" }}>Contacto:</strong>
                    <br />
                    <span style={{ color: "#2c3e50" }}>
                      {tipo.contacto || "—"}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
                    <strong style={{ color: "#5a6c7d" }}>Correo:</strong>
                    <br />
                    <span style={{ color: "#2c3e50" }}>
                      {tipo.correo || "—"}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    <strong style={{ color: "#5a6c7d" }}>
                      Teléfono:
                    </strong>
                    <br />
                    <span style={{ color: "#2c3e50" }}>
                      {tipo.telefono || "No Aplica"}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem" }}>
                    <strong style={{ color: "#5a6c7d" }}>
                      Servicio:
                    </strong>
                    <br />
                    <span style={{ color: "#2c3e50" }}>
                      {tipo.servicio || "No Aplica"}
                    </span>
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Estado y Fecha */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#fff",
                px: 3,
                py: 1.5,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem", color: "#000000ff" }}>
                <strong>Estado:</strong>{" "}
                <span
                  style={{
                    color:
                      selected.estado === "Activo" ? "#43a047" : "#f44336",
                    fontWeight: 600,
                  }}
                >
                  {selected.estado}
                </span>
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#fff",
                px: 3,
                py: 1.5,
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem", color: "#000000ff" }}>
                <strong>Última Actualización:</strong>{" "}
                <span style={{ color: "#2c3e50" }}>
                  {selected.fechaActualizacion}
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          py: 2.5,
          background: "linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Button
          variant="contained"
          onClick={handleCerrarDetalle}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 2,
            background: "linear-gradient(135deg, #325fdbff ",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(102,126,234,0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #5568d3 0%, #63408b 100%)",
            },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </>
  )}
</Dialog>



      {editing && (
  <FormularioEditar
    open={Boolean(editing)}
    onClose={handleCerrarEditar}
    idCampana={editing.id}
    onUpdate={() => {
      // 🔄 Recargar campañas después de editar
      setLoading(true);
      axios
        .get("http://localhost:4000/campana/detalles")
        .then((res) => {
          const data = res.data.map((c) => ({
            id: c.id,
            nombreCampaña: c.nombre_campana,
            cliente: c.cliente,
            directorOperacion: c.director_operacion_abai,
            correo: c.correo_director,
            segmento: c.segmento,
            nombreGerente: c.nombre_gte_campana,
            correoGerente: c.correo_gte_campana,
            sede: c.ubicacion_sedes,
            puestoOperacion: c.puestos_operacion,
            puestoEstructura: c.puestos_estructura,
            segmentoRed: c.segmento_red,
            fechaActualizacion: c.fecha_actualizacion,
            contactoCliente: c.nombre_contacto_cliente,
            correoCliente: c.correo_contacto_cliente,
            telefonoCliente: c.telefono_contacto_cliente,
            contactoComercial: c.nombre_contacto_comercial,
            correoComercial: c.correo_contacto_comercial,
            telefonoComercial: c.telefono_contacto_comercial,
            contactoTecnico: c.soporte_tecnico_abai,
            correoTecnico: c.correo_soporte_abai,
            serviciosTecnico: c.servicios_prestados,
            estado: c.estado === "HABILITADO" ? "Activo" : "Inactivo",
            imagen: c.imagen_cliente
              ? `http://localhost:4000/uploads/${c.imagen_cliente}`
              : "https://via.placeholder.com/250",
          }));
          setRows(data);
        })
        .catch((err) => console.error("❌ Error al recargar campañas:", err))
        .finally(() => setLoading(false));
    }}
  />
)}

    </Box>
  );
};

export default TablaCampana;
