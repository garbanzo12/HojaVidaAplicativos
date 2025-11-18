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
} from "@mui/material";
import axios from "axios";


const TablaUsuarios = () => {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/usuario");
      const data = res.data.map((u) => ({
        id: u.id,
        nombre: u.nombre,
        correo: u.correo,
        rol: u.rol,
        campanaId: u.campanaId,
        estado: u.estado,
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

  const handleBuscar = (e) => setQuery(e.target.value.toLowerCase());

  const filteredRows = rows.filter(
    (row) =>
      row.nombre.toLowerCase().includes(query) ||
      row.correo.toLowerCase().includes(query) ||
      row.rol.toLowerCase().includes(query)
  );

  const handleCerrarEditar = () => setEditing(null);

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
          LISTA DE USUARIOS
        </Typography>

        <TextField
          label="Buscar por nombre, correo o rol"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleBuscar}
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
                "Correo",
                "Campaña",
                "Rol",
                "Sede",
                "Estado",
                "Acciones",
              ].map((head, i) => (
                <TableCell
                  key={i}
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
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
                <TableCell align="center">{row.nombre}</TableCell>
                <TableCell align="center">{row.correo}</TableCell>
                <TableCell align="center">{row.rol}</TableCell>
                <TableCell align="center">{row.campanaId}</TableCell>

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
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        transition: "all 0.25s ease",
                        "&:hover": {
                          backgroundColor: "#0d47a1",
                          transform: "scale(1.05)",
                          boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                        },
                      }}
                      onClick={() => setEditing(row)}
                    >
                      Editar
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* MODAL DE EDICIÓN */}
      <Modal open={Boolean(editing)} onClose={handleCerrarEditar}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: "20px",
            p: 4,
            width: "90%",
            maxWidth: 800,
          }}
        >
          
        </Box>
      </Modal>
    </Box>
  );
};

export default TablaUsuarios;
