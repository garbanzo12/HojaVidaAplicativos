import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Formulario from "./formulario";

const TablaCampana = () => {
  const [rows, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 📌 Simulamos carga de datos
  useEffect(() => {
    const dataEjemplo = [
      {
        id: 1,
        nombreCampaña: "Lanzamiento 2025",
        cliente: "TechCorp",
        directorOperacion: "Juan Pérez",
        correo: "juan@techcorp.com",
        segmento: "Tecnología",
        nombreGerente: "María López",
        correoGerente: "maria@techcorp.com",
        sede: "CDMX",
        puestoOperacion: "15",
        puestoEstructura: "5",
        segmentoRed: "Red Norte",
        fechaActualizacion: "2025-11-05",
        contactoCliente: "Carlos Méndez",
        correoCliente: "carlos@techcorp.com",
        telefonoCliente: "555-123-456",
        contactoComercial: "Ana Ruiz",
        correoComercial: "ana@comercial.com",
        telefonoComercial: "555-654-321",
        contactoTecnico: "Luis Gómez",
        correoTecnico: "luis@abai.com",
        serviciosTecnico: "Soporte, Mantenimiento, Capacitación",
        estado: "Activo",
        imagen: "https://via.placeholder.com/250",
      },
      {
        id: 2,
        nombreCampaña: "Campaña Primavera",
        cliente: "EcoMarket",
        directorOperacion: "Laura García",
        correo: "laura@ecomarket.com",
        segmento: "Retail",
        nombreGerente: "José Martínez",
        correoGerente: "jose@ecomarket.com",
        sede: "Bogotá",
        puestoOperacion: "22",
        puestoEstructura: "8",
        segmentoRed: "Red Sur",
        fechaActualizacion: "2025-10-12",
        contactoCliente: "Sofía Torres",
        correoCliente: "sofia@ecomarket.com",
        telefonoCliente: "601-999-888",
        contactoComercial: "Pedro Ramírez",
        correoComercial: "pedro@ventas.com",
        telefonoComercial: "601-111-222",
        contactoTecnico: "Carlos Rojas",
        correoTecnico: "carlos@abai.com",
        serviciosTecnico: "Monitoreo y soporte de incidencias",
        estado: "Inactivo",
        imagen: "https://via.placeholder.com/250",
      },
    ];
    setData(dataEjemplo);
  }, []);

  useEffect(() => {
    setData((prev) => [...prev]);
  }, [rows]);

  const filtered = rows.filter(
    (c) =>
      c.nombreCampaña.toLowerCase().includes(search.toLowerCase()) ||
      c.directorOperacion.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleEstado = (id) => {
    const updated = rows.map((c) =>
      c.id === id
        ? { ...c, estado: c.estado === "Activo" ? "Inactivo" : "Activo" }
        : c
    );
    setData(updated);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleVerDetalle = (campaña) => setSelected(campaña);
  const handleCerrarDetalle = () => setSelected(null);
  const handleEditar = (campaña) => setEditing(campaña);
  const handleCerrarEditar = () => setEditing(null);

  return (
    <>
      <Box display="flex" justifyContent="space-between" mb={2} gap={2} flexWrap="wrap">
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#002b5b"
          sx={{
            borderRadius: 2,
            padding: "10px 20px",
          }}
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
              {[
                "Imagen",
                "Campaña",
                "Cliente",
                "Director",
                "Correo",
                "Estado",
                "Acciones",
              ].map((h, i) => (
                <TableCell
                  key={i}
                  align="center"
                  sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                >
                  {h}
                </TableCell>
              ))}
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
                      onClick={() => handleToggleEstado(c.id)}
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
                  <Typography>
                    <strong>Nombre de Campaña:</strong> {selected.nombreCampaña}
                  </Typography>
                  <Typography>
                    <strong>Cliente:</strong> {selected.cliente}
                  </Typography>
                  <Typography>
                    <strong>Director de Operación:</strong>{" "}
                    {selected.directorOperacion}
                  </Typography>
                  <Typography>
                    <strong>Correo:</strong> {selected.correo}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Estado:</strong> {selected.estado}
                  </Typography>
                  <Typography>
                    <strong>Fecha Actualización:</strong>{" "}
                    {selected.fechaActualizacion}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" color="#1565c0" mt={3}>
                Gerentes Campaña
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Segmento:</strong> {selected.segmento}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Nombre:</strong> {selected.nombreGerente}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Correo:</strong> {selected.correoGerente}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" color="#1565c0" mt={3}>
                Datos Generales
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Sede:</strong> {selected.sede}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>N° Puesto de Operación:</strong>{" "}
                    {selected.puestoOperacion}
                  </Typography>
                  <Typography>
                    <strong>N° Puesto de Estructura:</strong>{" "}
                    {selected.puestoEstructura}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Segmento de Red:</strong> {selected.segmentoRed}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" color="#1565c0" mt={3}>
                Contactos
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Nombre Contacto Cliente:</strong>{" "}
                    {selected.contactoCliente}
                  </Typography>
                  <Typography>
                    <strong>Correo Cliente:</strong>{" "}
                    {selected.correoCliente}
                  </Typography>
                  <Typography>
                    <strong>Teléfono Cliente:</strong>{" "}
                    {selected.telefonoCliente}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Nombre Contacto Comercial:</strong>{" "}
                    {selected.contactoComercial}
                  </Typography>
                  <Typography>
                    <strong>Correo Comercial:</strong>{" "}
                    {selected.correoComercial}
                  </Typography>
                  <Typography>
                    <strong>Teléfono Comercial:</strong>{" "}
                    {selected.telefonoComercial}
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" color="#1565c0" mt={3}>
                Soporte Técnico ABAI
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography>
                    <strong>Soporte Técnico ABAI:</strong>{" "}
                    {selected.contactoTecnico}
                  </Typography>
                  <Typography>
                    <strong>Correo Técnico:</strong>{" "}
                    {selected.correoTecnico}
                  </Typography>
                  <Typography>
                    <strong>Servicios Prestados:</strong>{" "}
                    {selected.serviciosTecnico}
                  </Typography>
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
        <Formulario
          open={Boolean(editing)}
          onClose={handleCerrarEditar}
          data={editing}
        />
      )}
    </>
  );
};

export default TablaCampana;
