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

  const filtrados = registros.filter((fila) =>
    Object.values(fila).some((v) =>
      String(v).toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
         MATRIZ GLOBAL
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
                Acción
              </TableCell>
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
                <TableRow key={index}>
                  <TableCell>{fila.proveedor}</TableCell>
                  <TableCell>{fila.codigoServicio}</TableCell>
                  <TableCell>{fila.telefonoProveedor}</TableCell>
                  <TableCell>{fila.telefonoAsesor}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#1565c0",
                        textTransform: "none",
                        borderRadius: "12px",
                        "&:hover": { backgroundColor: "#0d47a1" },
                      }}
                      onClick={() => onAgregarCampaña(fila)}
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
