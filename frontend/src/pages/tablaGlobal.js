import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";

import FormularioEditarMatriz from "../pages/FormularioEditarMatrizGlobal"; 
// ⬆ Cambia la ruta si tu archivo está en otro lado

// ======================= //
//   COMPONENTE TABLA
// ======================= //
const TablaMatriz = ({ registros = [], onEstadoChange, onEditar }) => {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = registros.filter((fila) =>
    Object.values(fila).some((v) =>
      String(v).toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        MATRIZ DE ESCALAMIENTO GLOBAL
      </Typography>

      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#002b5b" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Proveedor</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Código Servicio</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Teléfono Proveedor</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Teléfono Asesor</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Editar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay registros
                </TableCell>
              </TableRow>
            ) : (
              filtrados.map((fila, index) => (
                <TableRow key={index}>
                  <TableCell>{fila.proveedor}</TableCell>
                  <TableCell>{fila.codigo_servicio}</TableCell>
                  <TableCell>{fila.n_telefono_proveedor}</TableCell>
                  <TableCell>{fila.n_telefono_asesor}</TableCell>

                  <TableCell>
                    <Button
                      onClick={() => onEstadoChange(fila.id, fila.estado)}
                      variant="contained"
                      sx={{
                        backgroundColor:
                          fila.estado.toLowerCase() === "habilitado" ||
                          fila.estado.toLowerCase() === "activo"
                            ? "#4caf50"
                            : "#e53935",
                        "&:hover": {
                          backgroundColor:
                            fila.estado.toLowerCase() === "habilitado" ||
                            fila.estado.toLowerCase() === "activo"
                              ? "#43a047"
                              : "#c62828",
                        },
                        borderRadius: "20px",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {fila.estado.toLowerCase() === "habilitado" ? "Activo" : "Inactivo"}
                    </Button>
                  </TableCell>

                  {/* BOTÓN EDITAR */}
                  <TableCell>
                    <Button
                      variant="contained"
                        color="primary"
                        size="small"
                      onClick={() => onEditar(fila.id)}
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
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

// ======================= //
//   COMPONENTE MATRIZ PAGE
// ======================= //
const MatrizPage = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal editar
  const [openEditar, setOpenEditar] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  // 👉 Abrir modal
  const manejarEditar = (id) => {
    setIdSeleccionado(id);
    setOpenEditar(true);
  };

  // 👉 Cerrar modal
  const cerrarModal = () => {
    setOpenEditar(false);
    setIdSeleccionado(null);
  };

  // 👉 Recargar lista después de editar
  const refrescarListado = () => {
    obtenerMatriz();
  };

  // ====================== //
  // Cargar datos
  // ====================== //
  const obtenerMatriz = async () => {
    try {
      const response = await axios.get("http://localhost:4000/matriz/global");
      setRegistros(response.data);
    } catch (error) {
      console.error("Error al cargar la matriz:", error);
    } finally {
      setLoading(false);
    }
  };


const handleEstadoChange = async (id, currentEstado) => {
  const estadoNormalizado = currentEstado.toLowerCase();

  const nuevoEstado =
    estadoNormalizado === "habilitado" || estadoNormalizado === "activo"
      ? "DESHABILITADO"
      : "HABILITADO";

  try {
    await axios.put(`http://localhost:4000/matriz/estado-global/${id}`, {
      estado: nuevoEstado,
    });

    // 🏆 CORRECCIÓN CLAVE: Almacenar "HABILITADO" o "DESHABILITADO" en el estado local
    setRegistros((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, estado: nuevoEstado } // <-- Usamos directamente el valor que enviamos al backend
          : c
      )
    );
  } catch (error) {
    console.error("❌ Error al actualizar estado:", error);
  }
};

  useEffect(() => {
    obtenerMatriz();
  }, []);

  return (
    <Box sx={{ p: 4 }}>

      {loading ? (
        <Typography>Cargando datos...</Typography>
      ) : (
        <TablaMatriz
          registros={registros}
          onEstadoChange={handleEstadoChange}
          onEditar={manejarEditar}
        />
      )}

      {/* MODAL EDITAR */}
      <FormularioEditarMatriz
        open={openEditar}
        onClose={cerrarModal}
        idMatriz={idSeleccionado}
        onUpdate={refrescarListado}
      />
    </Box>
  );
};

export default MatrizPage;
