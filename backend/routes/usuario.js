import express from "express";
import {
  getUsuarios,
  createUsuario,
  actualizarUsuario,
  eliminarUsuario,
  getUsuariosPorCampana,
  updateEstadoUsuario,
} from "../controllers/usuario.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", getUsuarios);

// Crear usuario
router.post("/", createUsuario);

// Actualizar usuario
router.put("/estado/:id", updateEstadoUsuario);
router.put("/:id", actualizarUsuario);

// Eliminar usuario
router.delete("/:id", eliminarUsuario);

// Obtener usuarios de una campaña específica
router.get("/campana/:campanaId", getUsuariosPorCampana);

export default router;
