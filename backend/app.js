import express from "express";
import campanasRoutes from "./routes/campana_detalle.js";

const app = express();
app.use(express.json());

// Usar las rutas
app.use("/", campanasRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
