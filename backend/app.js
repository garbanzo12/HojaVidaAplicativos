


import express from "express";
import cors from "cors";
import campana from "./routes/campana.js";
import matriz from "./routes/matriz.js"
import aplicativo from "./routes/aplicativo.js"
import usuario from "./routes/usuario.js";
import authRoutes from "./routes/auth.js";
import infogeneral from "./routes/infogeneral.js";
import cliente from "./routes/cliente.js";
const app = express();

// ✅ CORS debe estar ANTES de las rutas
app.use(cors({
  origin: "http://localhost:3000", // frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // incluye OPTIONS
  allowedHeaders: ["Content-Type", "Authorization"], // cabeceras permitidas
}));

// ✅ Habilitar JSON
app.use(express.json());

// ✅ Tus rutas deben venir DESPUÉS
app.use("/campana", campana);
app.use("/matriz", matriz);
app.use("/aplicativo", aplicativo);
app.use("/usuario", usuario);
app.use("/auth", authRoutes);
app.use("/infogeneral", infogeneral);
app.use("/cliente", cliente);

app.use("/uploads", express.static("uploads"));

// ✅ Levantar servidor
app.listen(4000, () => {
  console.log("🚀 Backend corriendo en http://localhost:4000");
});
