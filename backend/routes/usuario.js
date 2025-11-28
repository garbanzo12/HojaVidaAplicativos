import express from "express";
import {
  getUsuarios,
  createUsuario,
  actualizarUsuario,
  eliminarUsuario,
  getUsuariosPorCampana,
  updateEstadoUsuario,
  me,
} from "../controllers/usuario.js";

const router = express.Router();

// Rutas específicas siempre deben ir primero 👇
router.get("/me", me);
router.get("/campana/:campanaId", getUsuariosPorCampana);

// Luego las generales
router.get("/", getUsuarios);
router.post("/", createUsuario);

// Actualizar usuario
router.put("/estado/:id", updateEstadoUsuario);
router.put("/:id", actualizarUsuario);

// Eliminar usuario
router.delete("/:id", eliminarUsuario);

export default router;
