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
  CircularProgress,
  Pagination,
} from "@mui/material";
import axios from "axios";

const TablaClientes = () => {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/cliente");

      const data = res.data.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        correo: c.correo,
        telefono: c.telefono,
        direccion: c.direccion,
        pais: c.pais,
        estado: c.estado,
      }));

      setRows(data);
    } catch (err) {
      console.error("❌ Error al obtener clientes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const toggleEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === "ACTIVO" ? "INACTIVO" : "ACTIVO";

    try {
      await axios.put(`http://localhost:4000/cliente/estado/${id}`, {
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
    [row.nombre, row.correo, row.telefono, row.pais]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

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
          LISTA DE CLIENTES
        </Typography>

        <TextField
          label="Buscar por nombre, correo, teléfono o país"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1); // reset de página al buscar
          }}
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
        <>
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
                  {["Nombre", "Correo", "Teléfono", "País", "Estado", "Acciones"].map(
                    (head, i) => (
                      <TableCell
                        key={i}
                        align="center"
                        sx={{ color: "white", fontWeight: "bold" }}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
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
                        backgroundColor:
                          index % 2 === 0 ? "#fafafa" : "#ffffff",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      <TableCell align="center">{row.nombre}</TableCell>
                      <TableCell align="center">{row.correo}</TableCell>
                      <TableCell align="center">{row.telefono}</TableCell>
                      <TableCell align="center">{row.pais}</TableCell>

                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => toggleEstado(row.id, row.estado)}
                          sx={{
                            backgroundColor:
                              row.estado === "ACTIVO"
                                ? "#4caf50"
                                : "#e53935",
                            textTransform: "none",
                            borderRadius: "20px",
                          }}
                        >
                          {row.estado === "ACTIVO" ? "Activo" : "Inactivo"}
                        </Button>
                      </TableCell>

                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ textTransform: "none", borderRadius: "10px" }}
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

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              shape="rounded"
              size="large"
              sx={{
                "& .Mui-selected": {
                  backgroundColor: "#002b5b !important",
                  color: "white !important",
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default TablaClientes;
