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
  TextField,
  Button,
  Modal,
  InputAdornment,
  Pagination,
} from "@mui/material";
import axios from "axios";
import FormularioEditarMatriz from "./FormularioEditarMatriz";
import { useAuth } from "../context/AuthContext.js";

const TablaMatriz = ({ registros = [], onEstadoChange, onEditar }) => {
  const [busqueda, setBusqueda] = useState("");


  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filtrados = registros.filter((fila) =>
    Object.values(fila).some((v) =>
      String(v).toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtrados.length / rowsPerPage);

  const paginatedRows = filtrados.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      {/* Header con título y búsqueda */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          MATRIZ DE ESCALAMIENTO
        </Typography>

        <TextField
          placeholder="Buscar aplicativo"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPage(1); // resetear paginación al buscar
          }}
          sx={{
            width: "500px",
            backgroundColor: "white",
            borderRadius: "8px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#ddd",
              },
              "&:hover fieldset": {
                borderColor: "#002b5b",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#002b5b",
              },
            },
          }}
        />
      </Box>

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
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay registros
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((fila, index) => (
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

      <Box display="flex" justifyContent="center" mt={4} mb={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          shape="rounded"
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: "bold",
              color: "#002b5b",
            },
            "& .Mui-selected": {
              backgroundColor: "#002b5b !important",
              color: "white !important",
            },
          }}
        />
      </Box>
    </Box>
  );
};


const MatrizPage = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const { user } = useAuth(); 

 const obtenerMatriz = async () => {
  try {
    setLoading(true);

    const esProveedor = user?.rol === "proveedor";

    // Si NO es proveedor: consulta normal
    if (!esProveedor) {
      const response = await axios.get("http://localhost:4000/matriz");
      setRegistros(response.data);
      return;
    }

    // 🔥 SI ES PROVEEDOR → FILTRAR POR CAMPAÑAS 🔥
    const resCampanas = await axios.get("http://localhost:4000/campana/detalles");
    const campanas = resCampanas.data;

    // campañas donde participa este usuario
    const campanasDelUsuario = campanas.filter((c) =>
      c.usuarios.some((u) => u.id === user.id)
    );

    // Unir todas las matrices_escalamiento de esas campañas
    let matrizFiltrada = [];

    campanasDelUsuario.forEach((campana) => {
      if (campana.matriz_escalamiento) {
        matrizFiltrada.push(...campana.matriz_escalamiento);
      }
    });

    // Eliminar duplicados
    const unicos = Array.from(
      new Map(matrizFiltrada.map((m) => [m.id, m])).values()
    );

    setRegistros(unicos);
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
      await axios.put(`http://localhost:4000/matriz/estado/${id}`, {
        estado: nuevoEstado,
      });
      setRegistros((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, estado: nuevoEstado } : c
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
          onEditar={setEditando}
        />
      )}

      {/* Modal de edición */}
      <Modal open={Boolean(editando)} onClose={() => setEditando(null)}>
        <Box>
          {editando && (
            <FormularioEditarMatriz
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

export default MatrizPage;