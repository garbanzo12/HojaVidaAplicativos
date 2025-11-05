import express from "express";
import campana from "./routes/campana.js";
import matriz from "./routes/matriz.js"
import aplicativo from "./routes/aplicativo.js"
const app = express();
app.use(express.json());

// Usar las rutas
app.use("/campana", campana);
app.use("/matriz", matriz);
app.use("/aplicativo", aplicativo);


// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
