import React, { useState } from "react";
import { Box } from "@mui/material";
import FormularioMatriz from "./matrizform";
import TablaMatriz from "./tablaMatriz";
import TablaGlobal from "./tablaGlobal";

const MatrizPage = () => {
  const [matriz, setMatriz] = useState([]); // registros del formulario
  const [global, setGlobal] = useState([]); // campaña

  const handleSave = (nuevo) => {
    setMatriz((prev) => [...prev, nuevo]);
  };

  const handleAgregarCampaña = (dato) => {
    setGlobal((prev) => [...prev, dato]);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <FormularioMatriz onSave={handleSave} />
      <TablaMatriz registros={matriz} onAgregarCampaña={handleAgregarCampaña} />
      <TablaGlobal registros={global} />
    </Box>
  );
};

export default MatrizPage;
