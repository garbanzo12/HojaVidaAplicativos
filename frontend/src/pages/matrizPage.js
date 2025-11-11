import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TablaMatriz from "../components/TablaMatriz";
import ModalMatriz from "../components/ModalMatriz";
import { getMatriz, updateMatriz } from "../services/matrizService";

const MatrizPage = () => {
  const [registros, setRegistros] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  // 🔹 Cargar los registros de la matriz al inicio
  useEffect(() => {
    fetchMatriz();
  }, []);

  const fetchMatriz = async () => {
    try {
      const data = await getMatriz();
      setRegistros(data);
    } catch (error) {
      console.error("Error al obtener matriz:", error);
    }
  };

  // 🔹 Cuando se hace clic en "editar"
  const handleEdit = (registro) => {
    setRegistroSeleccionado(registro);
    setOpenModal(true);
  };

  // 🔹 Guardar los cambios
  const handleSave = async (formData) => {
    try {
      await updateMatriz(formData.id, formData);
      setOpenModal(false);
      fetchMatriz();
    } catch (error) {
      console.error("Error al actualizar matriz:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        MATRIZ DE ESCALAMIENTO
      </Typography>

      <TablaMatriz registros={registros} onEdit={handleEdit} />

      <Button
        variant="contained"
        sx={{ mt: 3, backgroundColor: "#002b5b", color: "white" }}
        onClick={() => setOpenModal(true)}
      >
        Agregar Registro
      </Button>

      <ModalMatriz
        open={openModal}
        onClose={() => setOpenModal(false)}
        registro={registroSeleccionado}
        onSave={handleSave}
      />
    </Box>
  );
};

export default MatrizPage;
