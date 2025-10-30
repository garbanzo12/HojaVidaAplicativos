import express from "express";
import campana_detallesRoutes from "./routes/campana_detalle.js";
import camapana from "./routes/campana.js"
import gestores_campana from "./routes/gestores_campaña.js"
import datosGenerales from "./routes/datos_generales.js"
import contactos from "./routes/contactos.js"
import imagen from "./routes/imagen.js"
import proveedor from "./routes/proveedor.js"
import ap_abai from "./routes/aplicativo_abai.js"
import ap_internet from "./routes/aplicativo_internet.js"
import matriz from "./routes/matriz.js"
const app = express();
app.use(express.json());

// Usar las rutas
app.use("/campana_detalles", campana_detallesRoutes);
app.use("/campana", camapana);
app.use("/gestores", gestores_campana);
app.use("/datosgenerales", datosGenerales);
app.use("/contactos", contactos);
app.use("/imagen", imagen);
app.use("/proveedor", proveedor);
app.use("/ap_abai", ap_abai);
app.use("/ap_internet", ap_internet);
app.use("/matriz", matriz);


// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
