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

const TablaCampana = () => {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar campañas desde backend
  useEffect(() => {
    const fetchCampanas = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/campana/detalles");
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
      } catch (err) {
        console.error("❌ Error al obtener campañas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampanas();
  }, []);

  // 🔁 Cambiar estado (Habilitar / Deshabilitar)
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

  // 📋 Filtrado de búsqueda
  const filtered = rows.filter(
    (c) =>
      c.nombreCampaña.toLowerCase().includes(search.toLowerCase()) ||
      c.directorOperacion.toLowerCase().includes(search.toLowerCase())
  );

  // 🧩 Paginación
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // 🔍 Detalle y edición
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
    <>
      <Box display="flex" justifyContent="space-between" mb={2} gap={2} flexWrap="wrap">
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#002b5b"
          sx={{ borderRadius: 2, padding: "10px 20px" }}
        >
          LISTA DE CAMPAÑAS
        </Typography>

        <TextField
          label="Buscar por campaña o director de operación"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            flex: 1,
            minWidth: "300px",
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
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
                    sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
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
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
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
                      onClick={() => handleToggleEstado(c.id, c.estado)}
                      variant="contained"
                      sx={{
                        backgroundColor: c.estado === "Activo" ? "#4caf50" : "#e53935",
                        "&:hover": {
                          backgroundColor: c.estado === "Activo" ? "#43a047" : "#c62828",
                        },
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: "bold",
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
                    >
                      Ver Detalle
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ ml: 1 }}
                      onClick={() => handleEditar(c)}
                    >
                      Editar
                    </Button>
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
          sx: { borderRadius: 3, boxShadow: "0 5px 15px rgba(0,0,0,0.3)" },
        }}
      >
        {selected && (
          <>
            <DialogTitle
              sx={{
                fontWeight: "bold",
                color: "#002b5b",
                borderBottom: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              Detalles de Campaña
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <img
                  src={selected.imagen}
                  alt={selected.nombreCampaña}
                  style={{
                    width: "250px",
                    borderRadius: 12,
                    boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                  }}
                />
              </Box>

              <Typography variant="h6" color="#1565c0">
                Información Principal
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Nombre de Campaña:</strong> {selected.nombreCampaña}</Typography>
                  <Typography><strong>Cliente:</strong> {selected.cliente}</Typography>
                  <Typography><strong>Director de Operación:</strong> {selected.directorOperacion}</Typography>
                  <Typography><strong>Correo:</strong> {selected.correo}</Typography>
                  <Typography><strong>Segmento:</strong> {selected.segmento}</Typography>
                  <Typography><strong>Nombre Gerente Campaña:</strong> {selected.nombre_gte_campana}</Typography>
                  <Typography><strong>Correo Gerente Campaña:</strong> {selected.correoGerente}</Typography>
                  <Typography><strong>Sede:</strong> {selected.sede}</Typography>
                  <Typography><strong>Puesto de Operacion:</strong> {selected.puestoOperacion}</Typography>
                  <Typography><strong>Puesto de Estructura:</strong> {selected.puestoEstructura}</Typography>
                  <Typography><strong>Segmento de Red:</strong> {selected.segmentoRed}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Contacto Cliente:</strong> {selected.contactoCliente}</Typography>
                  <Typography><strong>Correo Cliente: :</strong> {selected.correoCliente}</Typography>
                  <Typography><strong>Telefono Cliente: :</strong> {selected.telefonoCliente}</Typography>
                  <Typography><strong>Contacto Comercial:</strong> {selected.contactoComercial}</Typography>
                  <Typography><strong>Correo Comercial:</strong> {selected.correoComercial}</Typography>
                  <Typography><strong>Telefono Comercial:</strong> {selected.telefonoComercial}</Typography>
                  <Typography><strong>Contacto Tecnico:</strong> {selected.contactoTecnico}</Typography>
                  <Typography><strong>Correo Tecnico:</strong> {selected.correoTecnico}</Typography>
                  <Typography><strong>Servicios Prestados:</strong> {selected.serviciosTecnico}</Typography>
                  <Typography><strong>Estado:</strong> {selected.estado}</Typography>
                  <Typography><strong>Fecha Actualización:</strong> {selected.fechaActualizacion}</Typography>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center" }}>
              <Button variant="contained" onClick={handleCerrarDetalle}>
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
  />
)}
    </>
  );
};

export default TablaCampana;
