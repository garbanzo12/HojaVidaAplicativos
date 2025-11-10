import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import FormularioAplicativo from "./FormularioAplicativo";

const mockData = [
  {
    id: 1,
    tipo: "Aplicativo ABAI",
    nombre: "App Ventas",
    ip: "192.168.1.10",
    puerto: "8080",
    url: "https://ventas.miempresa.com",
    tipoRed: "Intranet",
    escalamiento: "Soporte Nivel 1",
    campana: "Campaña Q4",
    activo: true,
  },
  {
    id: 2,
    tipo: "App Proveedor",
    nombre: "Auth Service",
    ip: "10.0.0.5",
    puerto: "443",
    url: "https://auth.miempresa.com",
    tipoRed: "Externa",
    escalamiento: "Soporte Nivel 2",
    campana: "Campaña Credenciales",
    activo: false,
  },
];

const TablaAplicativos = ({ rows = mockData }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(0);
  };

  const filteredData = data.filter(
    (item) =>
      item.tipo.toLowerCase().includes(query.toLowerCase()) ||
      item.campana.toLowerCase().includes(query.toLowerCase()) ||
      item.nombre.toLowerCase().includes(query.toLowerCase())
  );

  const handleToggleActivo = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, activo: !item.activo } : item
      )
    );
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedRow(null);
  };

  return (
    <Box
      sx={{
        padding: "40px",
        minHeight: "100vh",
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
          label="Buscar por aplicativo, campaña o nombre"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleSearch}
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            flex: 1,
            minWidth: "300px",
          }}
        />
      </Box>

      {/* 🔹 Tabla principal */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#002b5b" }}>
            <TableRow>
              {[
                "Tipo",
                "Nombre",
                "Dirección IP",
                "Puerto",
                "URL",
                "Tipo de Red",
                "Escalamiento",
                "Campaña",
                "Estado",
                "Acciones",
              ].map((head, index) => (
                <TableCell
                  key={index}
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
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                    "&:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                    transition: "0.2s",
                  }}
                >
                  <TableCell align="center">{row.tipo}</TableCell>
                  <TableCell align="center">{row.nombre}</TableCell>
                  <TableCell align="center">{row.ip}</TableCell>
                  <TableCell align="center">{row.puerto}</TableCell>
                  <TableCell align="center">
                  <TableCell align="center">{row.url}</TableCell>
                  </TableCell>
                  <TableCell align="center">{row.tipoRed}</TableCell>
                  <TableCell align="center">{row.escalamiento}</TableCell>
                  <TableCell align="center">{row.campana}</TableCell>

                  {/* Estado */}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleToggleActivo(row.id)}
                      sx={{
                        backgroundColor: row.activo ? "#4caf50" : "#e53935",
                        "&:hover": {
                          backgroundColor: row.activo
                            ? "#43a047"
                            : "#c62828",
                        },
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "20px",
                        px: 2,
                      }}
                    >
                      {row.activo ? "Activo" : "Inactivo"}
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
                      }}
                      onClick={() => handleEdit(row)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        mr: 1,
                        textTransform: "none",
                        borderRadius: "8px",
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#e3f2fd",
                        },
                      }}
                      onClick={() => window.open(row.url, "_blank")}
                    >
                      Ver URL
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🔹 Paginación centrada */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 3,
        }}
      >
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          sx={{
            minWidth: "36px",
            color: page === 0 ? "#ccc" : "#1976d2",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          ‹
        </Button>
        <Button
          onClick={() =>
            setPage((p) =>
              p < Math.ceil(filteredData.length / rowsPerPage) - 1
                ? p + 1
                : p
            )
          }
          disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
          sx={{
            minWidth: "36px",
            color:
              page >= Math.ceil(filteredData.length / rowsPerPage) - 1
                ? "#ccc"
                : "#1976d2",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          ›
        </Button>
      </Box>

      {/* 🔹 Modal para editar */}
      <Modal open={openEdit} onClose={handleCloseEdit}>
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
          <FormularioAplicativo
            onClose={handleCloseEdit}
            data={selectedRow}
            modoEdicion
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default TablaAplicativos;
