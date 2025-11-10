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
import FormularioEditarAplicativo from "./FormularioEditarAplicativo";

const ListarAplicativo = () => {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar los aplicativos al iniciar
  const fetchAplicativos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/aplicativo");
      const data = res.data.map((a) => ({
        id: a.id,
        nombre: a.nombre,
        direccion_ip: a.direccion_ip,
        puerto: a.puerto,
        url: a.url,
        tipo_red: a.tipo_red,
        escalamiento: a.escalamiento,
        campanaId: a.campanaId,
        estado: a.estado,
      }));
      setRows(data);
    } catch (err) {
      console.error("❌ Error al obtener aplicativos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAplicativos();
  }, []);
// Cambiar estado del aplicativo
const toggleEstado = async (id, estadoActual) => {
  const nuevoEstado = estadoActual === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";
  try {
    await axios.put(`http://localhost:4000/aplicativo/estado/${id}`, { estado: nuevoEstado });

    // Actualizar en tiempo real sin recargar la página
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
      row.tipo_red.toLowerCase().includes(query) ||
      row.escalamiento.toLowerCase().includes(query)
  );

  const handleCerrarEditar = () => setEditing(null);

  return (
    <Box
      sx={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
      }}
    >
      {/* 🔹 Encabezado */}
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
          label="Buscar por nombre, tipo o escalamiento"
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

      {/* 🔹 Tabla */}
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
                "URL",
                "Tipo de Red",
                "Escalamiento",
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
                <TableCell align="center">{row.direccion_ip}</TableCell>
                <TableCell align="center">{row.puerto}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.open(row.url, "_blank")}
                    sx={{
                      textTransform: "none",
                      color: "#1565c0",
                      borderColor: "#1565c0",
                    }}
                  >
                    Ver URL
                  </Button>
                </TableCell>
                <TableCell align="center">{row.tipo_red}</TableCell>
                <TableCell align="center">{row.escalamiento}</TableCell>
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

                {/* Acciones */}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#1565c0",
                      "&:hover": { backgroundColor: "#0d47a1" },
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: "bold",
                      mr: 1,
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

      {/* 🔹 Modal de edición */}
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
          {editing && (
            <FormularioEditarAplicativo
              open={Boolean(editing)}
              onClose={handleCerrarEditar}
              idAplicativo={editing.id}
              onUpdate={() => {
                // 🔄 Recargar aplicativos después de editar
                setLoading(true);
                axios
                  .get("http://localhost:4000/aplicativo")
                  .then((res) => {
                    const data = res.data.map((a) => ({
                      id: a.id,
                      nombre: a.nombre,
                      direccion_ip: a.direccion_ip,
                      puerto: a.puerto,
                      url: a.url,
                      tipo_red: a.tipo_red,
                      escalamiento: a.escalamiento,
                      campanaId: a.campanaId,
                      estado: a.estado,
                    }));
                    setRows(data);
                  })
                  .catch((err) =>
                    console.error("❌ Error al recargar aplicativos:", err)
                  )
                  .finally(() => setLoading(false));
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ListarAplicativo;
