import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Modal,
  Pagination, // ← IMPORTANTE
} from "@mui/material";
import axios from "axios";
import FormularioEditarAplicativo from "./FormularioEditarAplicativo";
import { useAuth } from "../context/AuthContext.js";

const ListarAplicativo = () => {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // 🔥 PAGINACIÓN
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const fetchAplicativos = async () => {
    try {
      setLoading(true);

      const esProveedor = user?.rol === "proveedor";

      if (!esProveedor) {
        const res = await axios.get("http://localhost:4000/aplicativo/detalles");
        const data = res.data.map((a) => ({
          id: a.id,
          nombre: a.nombre,
          direccion_ip: a.direccion_ip,
          puerto: a.puerto,
          tipoAplicativo: a.tipo_aplicativo,
          tipo_red: a.tipo_red,
          escalamiento: a.escalamiento,
          estado: a.estado,
          url: a.url,
        }));
        setRows(data);
        return;
      }

      const campanasRes = await axios.get("http://localhost:4000/campana/detalles");
      const campanas = campanasRes.data;

      const campanasDelUsuario = campanas.filter((c) =>
        c.usuarios.some((u) => u.id === user.id)
      );

      const aplicativosFiltrados = [];

      campanasDelUsuario.forEach((campana) => {
        campana.aplicativos.forEach((app) => aplicativosFiltrados.push(app));
      });

      const unicos = Array.from(
        new Map(aplicativosFiltrados.map((a) => [a.id, a])).values()
      );

      const data = unicos.map((a) => ({
        id: a.id,
        nombre: a.nombre,
        direccion_ip: a.direccion_ip,
        puerto: a.puerto,
        tipoAplicativo: a.tipo_aplicativo,
        tipo_red: a.tipo_red,
        escalamiento: a.escalamiento,
        estado: a.estado,
        url: a.url,
      }));

      setRows(data);
    } catch (err) {
      console.error("Error filtrando aplicativos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAplicativos();
  }, []);

  const toggleEstado = async (id, estadoActual) => {
    const nuevoEstado =
      estadoActual === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";

    try {
      await axios.put(`http://localhost:4000/aplicativo/estado/${id}`, {
        estado: nuevoEstado,
      });

      setRows((prev) =>
        prev.map((row) =>
          row.id === id ? { ...row, estado: nuevoEstado } : row
        )
      );
    } catch (err) {
      console.error("❌ Error al cambiar estado:", err);
    }
  };

  const handleCerrarEditar = () => setEditing(null);

  const handleVerUrl = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("❌ Este aplicativo no tiene URL registrada.");
    }
  };

  // 🔥 FILTRO
  const filteredRows = rows.filter((row) =>
    `${row.nombre} ${row.tipo_red} ${row.escalamiento}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // 🔥 PAGINACIÓN (slice)
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ padding: "40px", minHeight: "100vh" }}>
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
          LISTA DE APLICATIVOS
        </Typography>

        <TextField
          label="Buscar aplicativo"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            flex: 1,
            minWidth: "300px",
          }}
        />
      </Box>

      <Paper
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
              {[
                "Nombre",
                "Dirección IP",
                "Puerto",
                "Tipo Aplicativo",
                "Tipo de Red",
                "Escalamiento",
                "Estado",
                "Acciones",
              ].map((head, i) => (
                <TableCell
                  key={i}
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                    py: 1.5,
                  }}
                >
                  {head}
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
            paginatedRows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                  transition: "0.2s",
                }}
              >
                <TableCell align="center">{row.nombre}</TableCell>
                <TableCell align="center">{row.direccion_ip}</TableCell>
                <TableCell align="center">{row.puerto}</TableCell>
                <TableCell align="center">{row.tipoAplicativo}</TableCell>
                <TableCell align="center">{row.tipo_red}</TableCell>
                <TableCell align="center">{row.escalamiento}</TableCell>

                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => toggleEstado(row.id, row.estado)}
                    sx={{
                      backgroundColor:
                        row.estado === "HABILITADO" ? "#4caf50" : "#e53935",
                      "&:hover": {
                        backgroundColor:
                          row.estado === "HABILITADO" ? "#43a047" : "#c62828",
                      },
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: "20px",
                      px: 2,
                    }}
                  >
                    {row.estado === "HABILITADO" ? "Activo" : "Inactivo"}
                  </Button>
                </TableCell>

                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={1.5}>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
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
                      onClick={() => setEditing(row)}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleVerUrl(row.url)}
                      sx={{
                        color: "#0288d1",
                        borderColor: "#0288d1",
                        backgroundColor: "#e3f2fd",
                        textTransform: "none",
                        borderRadius: "10px",
                        px: 2,
                        py: 0.5,
                        fontWeight: 600,
                        transition: "0.25s",
                        "&:hover": {
                          backgroundColor: "#0288d1",
                          color: "#fff",
                        },
                      }}
                    >
                      Ver URL
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* 🔥 PAGINACIÓN BONITA ABAJO */}
      <Box display="flex" justifyContent="center" mt={4}>
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

      {/* MODAL */}
      <Modal open={Boolean(editing)} onClose={handleCerrarEditar}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            borderRadius: "20px",
            p: 4,
            width: "90%",
            maxWidth: 800,
          }}
        >
          {editing && (
            <FormularioEditarAplicativo
              onClose={handleCerrarEditar}
              idAplicativo={editing.id}
              onUpdate={() => fetchAplicativos()}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ListarAplicativo;
