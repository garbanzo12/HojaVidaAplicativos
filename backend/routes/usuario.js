import express from "express";
import {
  getUsuarios,
  createUsuario,
  actualizarUsuario,
  getUsuariosPorCampana,
  updateEstadoUsuario,
  me,
  getUsuarioNombreById,
} from "../controllers/usuario.js";

const router = express.Router();

// Rutas específicas siempre deben ir primero 👇
router.get("/me", me);

router.get("/campana/:campanaId", getUsuariosPorCampana);
router.get("/nombreusuario/:id", getUsuarioNombreById);
// Luego las generales
router.get("/", getUsuarios);
router.post("/", createUsuario);

// Actualizar usuario
router.put("/estado/:id", updateEstadoUsuario);
router.put("/:id", actualizarUsuario);

// Eliminar usuario

export default router;
