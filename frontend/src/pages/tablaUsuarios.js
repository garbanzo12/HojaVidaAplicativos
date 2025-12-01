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
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import FormularioEditarUsuario from "./formularioEditarUsuario";

const TablaUsuarios = () => {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const [openCampanas, setOpenCampanas] = useState(false);
  const [campanasUsuario, setCampanasUsuario] = useState([]);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/usuario");

      const data = res.data.map((u) => ({
        id: u.id,
        nombre_completo: u.nombre_completo,
        correo: u.correo,
        rol: u.rol,
        sede: u.sede,
        campanas: Array.isArray(u.campana) ? u.campana : [],
        estado: u.estado,
        tipo_documento: u.tipo_documento,
        numero_documento: u.numero_documento,
      }));

      setRows(data);
    } catch (err) {
      console.error("❌ Error al obtener usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const toggleEstado = async (id, estadoActual) => {
    const nuevoEstado =
      estadoActual === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";

    try {
      await axios.put(`http://localhost:4000/usuario/estado/${id}`, {
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

  const filteredRows = rows.filter((row) =>
    [row.nombre, row.correo, row.rol, row.sede]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
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
          LISTA DE USUARIOS
        </Typography>

        <TextField
          label="Buscar por nombre, correo, rol o sede"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            flex: 1,
            minWidth: "300px",
          }}
        />
      </Box>

      {loading ? (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
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
                  "Correo",
                  "Rol",
                  "Sede",
                  "Campaña",
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
              {filteredRows.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                    "&:hover": { backgroundColor: "#e3f2fd" },
                    transition: "0.2s",
                  }}
                >
                  <TableCell align="center">{row.nombre_completo}</TableCell>
                  <TableCell align="center">{row.correo}</TableCell>
                  <TableCell align="center">{row.rol}</TableCell>
                  <TableCell align="center">{row.sede}</TableCell>

                  {/* CAMPAÑAS */}
                  <TableCell align="center">
                    {row.campanas.length === 0 && "—"}

                    {row.campanas.length === 1 &&
                      row.campanas[0].nombre_campana}

                    {row.campanas.length > 1 && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setCampanasUsuario(row.campanas);
                          setOpenCampanas(true);
                        }}
                        sx={{ textTransform: "none", borderRadius: "15px" }}
                      >
                        Ver
                      </Button>
                    )}
                  </TableCell>

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
                            row.estado === "HABILITADO"
                              ? "#43a047"
                              : "#c62828",
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
                      }}
                      onClick={() => setEditing(row)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* MODAL DE CAMPAÑAS */}
      <Modal open={openCampanas} onClose={() => setOpenCampanas(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            bgcolor: "white",
            borderRadius: 3,
            p: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Campañas asignadas
          </Typography>

          {campanasUsuario.map((c, i) => (
            <Box
              key={i}
              sx={{
                padding: "10px 15px",
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                mb: 1,
                fontSize: "15px",
              }}
            >
              {c.nombre_campana}
            </Box>
          ))}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, borderRadius: "10px" }}
            onClick={() => setOpenCampanas(false)}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal open={Boolean(editing)} onClose={() => setEditing(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 800,
            bgcolor: "white",
            borderRadius: 4,
            p: 3,
          }}
        >
          <FormularioEditarUsuario
            usuario={editing}
            onClose={() => setEditing(null)}
            onUpdated={fetchUsuarios}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default TablaUsuarios;
