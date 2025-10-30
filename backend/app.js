import express from "express";
import campana_detallesRoutes from "./routes/campana_detalle.js";
import camapana from "./routes/campana.js"
import gestores_campana from "./routes/gestores_campaña.js"
import datosGenerales from "./routes/datos_generales.js"
import contactos from "./routes/contactos.js"
import imagen from "./routes/imagen.js"
const app = express();
app.use(express.json());

// Usar las rutas
app.use("/campana_detalles", campana_detallesRoutes);
app.use("/campana", camapana);
app.use("/gestores", gestores_campana);
app.use("/datosgenerales", datosGenerales);
app.use("/contactos", contactos);
app.use("/imagen", imagen);


// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
