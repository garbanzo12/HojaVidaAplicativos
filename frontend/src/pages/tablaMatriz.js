import React, { useState } from "react";
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
} from "@mui/material";

const TablaMatriz = ({ registros = [] }) => {
  const [busqueda, setBusqueda] = useState("");
  const [estados, setEstados] = useState(registros.map(() => true));

  const handleToggle = (index) => {
    const nuevos = [...estados];
    nuevos[index] = !nuevos[index];
    setEstados(nuevos);
  };

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

export default TablaMatriz;
