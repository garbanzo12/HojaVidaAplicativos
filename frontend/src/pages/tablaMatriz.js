import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Switch,
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
      {/* 🔹 Encabezado: título + barra de búsqueda (igual que tablaAplicativos) */}
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
          MATRIZ
        </Typography>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        MATRIZ DE ESCALAMIENTO
      </Typography>


        <TextField
          label="Buscar proveedor o código de servicio"
          variant="outlined"
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
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
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
          backgroundColor: "white",
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
              ].map((titulo, index) => (
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
                  {titulo}
                </TableCell>
              ))}
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

                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff",
                    "&:hover": { backgroundColor: "#e3f2fd" },
                    transition: "0.2s",
                  }}
                >
                  <TableCell align="center">{fila.proveedor}</TableCell>
                  <TableCell align="center">{fila.codigoServicio}</TableCell>
                  <TableCell align="center">{fila.telefonoProveedor}</TableCell>
                  <TableCell align="center">{fila.telefonoAsesor}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={estados[index]}
                      onChange={() => handleToggle(index)}
                      color="success"
                    />

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


const handleEstadoChange = async (id, estadoActual) => {
  const nuevoEstado =
    estadoActual === "habilitado" || estadoActual === "activo"
      ? "INACTIVO"
      : "ACTIVO";
  try {
    await axios.put(`http://localhost:4000/matriz/estado/${id}`, {
      estado: nuevoEstado,
    });

    // 🔁 Actualiza localmente sin recargar la página
    setRegistros((prev) =>
      prev.map((fila) =>
        fila.id === id ? { ...fila, estado: nuevoEstado } : fila
      )
    );
  } catch (error) {
    console.error("Error al actualizar estado:", error);
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
