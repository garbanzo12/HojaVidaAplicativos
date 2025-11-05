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
  Chip,
} from "@mui/material";

const TablaCampana = () => {
  const [campañas, setCampañas] = useState([]);
  const [selected, setSelected] = useState(null);

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
    setCampañas(dataEjemplo);
  }, []);

  const handleVerDetalle = (campaña) => setSelected(campaña);
  const handleCerrarDetalle = () => setSelected(null);

  return (
    <>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="#002b5b"
        textAlign="center"
        mb={2}
      >
        LISTA DE CAMPAÑAS
      </Typography>

      {/* === Tabla de campañas === */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre de Campaña</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Director de Operación ABAI</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campañas.map((c) => (
              <TableRow
                key={c.id}
                sx={{
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                }}
              >
                <TableCell>
                  <Avatar
                    src={c.imagen}
                    alt={c.nombreCampaña}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>{c.nombreCampaña}</TableCell>
                <TableCell>{c.cliente}</TableCell>
                <TableCell>{c.directorOperacion}</TableCell>
                <TableCell>{c.correo}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={c.estado}
                    color={c.estado === "Activo" ? "success" : "error"}
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleVerDetalle(c)}
                  >
                    Ver Detalle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* === Modal de detalle === */}
      <Dialog
        open={Boolean(selected)}
        onClose={handleCerrarDetalle}
        fullWidth
        maxWidth="md"
      >
        {selected && (
          <>
            <DialogTitle sx={{ fontWeight: "bold", color: "#002b5b" }}>
              Detalles de Campaña
            </DialogTitle>
            <DialogContent dividers>
              {/* Imagen */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <img
                  src={selected.imagen}
                  alt={selected.nombreCampaña}
                  style={{
                    width: "250px",
                    borderRadius: 10,
                    boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                  }}
                />
              </Box>

              {/* Información principal */}
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
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Estado:</strong> {selected.estado}</Typography>
                  <Typography><strong>Fecha Actualización:</strong> {selected.fechaActualizacion}</Typography>
                </Grid>
              </Grid>

              {/* Gerentes */}
              <Typography variant="h6" color="#1565c0" mt={3}>
                Gerentes Campaña
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Segmento:</strong> {selected.segmento}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Nombre:</strong> {selected.nombreGerente}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Correo:</strong> {selected.correoGerente}</Typography>
                </Grid>
              </Grid>

              {/* Datos Generales */}
              <Typography variant="h6" color="#1565c0" mt={3}>
                Datos Generales
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Sede:</strong> {selected.sede}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>N° Puesto de Operación:</strong> {selected.puestoOperacion}</Typography>
                  <Typography><strong>N° Puesto de Estructura:</strong> {selected.puestoEstructura}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Segmento de Red:</strong> {selected.segmentoRed}</Typography>
                </Grid>
              </Grid>

              {/* Contactos */}
              <Typography variant="h6" color="#1565c0" mt={3}>
                Contactos
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Nombre Contacto Cliente:</strong> {selected.contactoCliente}</Typography>
                  <Typography><strong>Correo Cliente:</strong> {selected.correoCliente}</Typography>
                  <Typography><strong>Teléfono Cliente:</strong> {selected.telefonoCliente}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Nombre Contacto Comercial:</strong> {selected.contactoComercial}</Typography>
                  <Typography><strong>Correo Comercial:</strong> {selected.correoComercial}</Typography>
                  <Typography><strong>Teléfono Comercial:</strong> {selected.telefonoComercial}</Typography>
                </Grid>
              </Grid>

              {/* Soporte Técnico */}
              <Typography variant="h6" color="#1565c0" mt={3}>
                Soporte Técnico ABAI
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Soporte Técnico ABAI:</strong> {selected.contactoTecnico}</Typography>
                  <Typography><strong>Correo Técnico:</strong> {selected.correoTecnico}</Typography>
                  <Typography><strong>Servicios Prestados:</strong> {selected.serviciosTecnico}</Typography>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCerrarDetalle}>Cerrar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default TablaCampana;
