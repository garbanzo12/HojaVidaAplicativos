import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";

const TablaGlobal = ({ registros = [], onAgregarCampaña }) => {
  const [busqueda, setBusqueda] = useState("");

  // Filtra dinámicamente según el texto ingresado en el buscador.
  const filtrados = registros.filter((fila) =>
    Object.values(fila).some((v) =>
      String(v).toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      {/* 🔹 Encabezado: título + barra de búsqueda */}
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
          MATRIZ GLOBAL
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
                "Acción",
              ].map((columna, index) => (
                <TableCell
                  key={index}
                  sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                >
                  {columna}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filtrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hay registros en la campaña
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
                    <Button
                      variant="contained"
                      onClick={() => onAgregarCampaña(fila)}
                      sx={{
                        backgroundColor: "#1565c0",
                        textTransform: "none",
                        borderRadius: "12px",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#0d47a1",
                          transform: "scale(1.05)",
                          boxShadow: "0 3px 8px rgba(0,0,0,0.25)",
                        },
                        transition: "all 0.25s ease",
                      }}
                    >
                      Agregar campaña
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

export default TablaGlobal;
