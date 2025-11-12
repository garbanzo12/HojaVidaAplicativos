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
} from "@mui/material";
import axios from "axios";

// ======================= //
//   COMPONENTE TABLA
// ======================= //
const TablaMatriz = ({ registros = [], onEstadoChange }) => {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = registros.filter((fila) =>
    Object.values(fila).some((v) =>
      String(v).toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        MATRIZ DE ESCALAMIENTO
      </Typography>

      <TextField
        fullWidth
        placeholder="Buscar proveedor o código de servicio"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        sx={{
          mb: 2,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
        }}
      />

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
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Proveedor
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Código Servicio
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Teléfono Proveedor
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Teléfono Asesor
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Estado
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
                                            fila.estado.toLowerCase() === "activo" ||
                                            fila.estado.toLowerCase() === "habilitado"
                                              ? "#4caf50"
                                              : "#e53935",
                                          "&:hover": {
                                            backgroundColor:
                                              fila.estado.toLowerCase() === "activo" ||
                                              fila.estado.toLowerCase() === "habilitado"
                                                ? "#43a047"
                                                : "#c62828",
                                          },
                                          borderRadius: "20px",
                                          textTransform: "none",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {fila.estado.toLowerCase() === "habilitado"
                                          ? "Activo"
                                          : fila.estado.toLowerCase() === "activo"
                                          ? "Activo"
                                          : "Inactivo"}
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

  // ✅ Cargar datos desde la API
  const obtenerMatriz = async () => {
    try {
      const response = await axios.get("http://localhost:4000/matriz");
      console.log(response.data)
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

  // Y cómo quieres mostrarlo en el front
  const nuevoEstadoFront = nuevoEstado === "HABILITADO" ? "Activo" : "Inactivo";

  try {
    await axios.put(`http://localhost:4000/matriz/estado/${id}`, {
      estado: nuevoEstado,
    });

    // 🔁 Actualiza localmente sin recargar la página
    setRegistros((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, estado: nuevoEstadoFront } : c
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
      <Typography variant="h5" mb={3} fontWeight="bold">
        Gestión de Matriz
      </Typography>

      {loading ? (
        <Typography>Cargando datos...</Typography>
      ) : (
        <TablaMatriz registros={registros} onEstadoChange={handleEstadoChange} />
      )}


    </Box>
  );
};

export default MatrizPage;
