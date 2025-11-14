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
  Modal,
} from "@mui/material";
import axios from "axios";
import FormularioEditarMatrizGlobal from "./FormularioEditarMatrizGlobal";

// ===============================
//   TABLA
// ===============================
const TablaMatrizGlobal = ({ registros = [], onEstadoChange, onEditar }) => {
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
              {[
                "Proveedor",
                "Código Servicio",
                "Teléfono Proveedor",
                "Teléfono Asesor",
                "Nombre campaña",
                "Estado",
                "Acciones",
              ].map((title) => (
                <TableCell
                  key={title}
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  {title}
                </TableCell>
              ))}
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
              filtrados.map((fila) => (
                <TableRow key={fila.id}>
                  <TableCell>{fila.proveedor}</TableCell>
                  <TableCell>{fila.codigo_servicio}</TableCell>
                  <TableCell>{fila.n_telefono_proveedor}</TableCell>
                  <TableCell>{fila.n_telefono_asesor}</TableCell>
                  <TableCell>{fila.campana?.nombre_campana}</TableCell>

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
                      {fila.estado.toLowerCase() === "habilitado" ||
                      fila.estado.toLowerCase() === "activo"
                        ? "Activo"
                        : "Inactivo"}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onEditar(fila.id)}
                      sx={{
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 2,
                        py: 0.5,
                        fontWeight: 600,
                        backgroundColor: "#1565c0",
                        "&:hover": {
                          backgroundColor: "#0d47a1",
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

// ===============================
//   PÁGINA PRINCIPAL
// ===============================
const MatrizEscalamientoGlobalPage = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);

  const obtenerMatriz = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/matriz-global"
      );
      setRegistros(response.data);
    } catch (error) {
      console.error("Error al cargar matriz global:", error);
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
      await axios.put(
        `http://localhost:4000/matriz-global/estado/${id}`,
        { estado: nuevoEstado }
      );

      setRegistros((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, estado: nuevoEstado } : c
        )
      );
    } catch (error) {
      console.error("❌ Error al cambiar estado global:", error);
    }
  };

  useEffect(() => {
    obtenerMatriz();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        Gestión de Matriz de Escalamiento Global
      </Typography>

      {loading ? (
        <Typography>Cargando datos...</Typography>
      ) : (
        <TablaMatrizGlobal
          registros={registros}
          onEstadoChange={handleEstadoChange}
          onEditar={setEditando}
        />
      )}

      {/* Modal editar */}
      <Modal open={Boolean(editando)} onClose={() => setEditando(null)}>
        <Box>
          {editando && (
            <FormularioEditarMatrizGlobal
              open={Boolean(editando)}
              idMatriz={editando}
              onClose={() => setEditando(null)}
              onUpdate={obtenerMatriz}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default MatrizEscalamientoGlobalPage;
