import express from "express";
import {
  createCliente,
  getClientes,
  getClientesDetalles,
  getCLienteById,
} from "../controllers/cliente.js";
import { validate } from "../validators/validateMiddleware.js";
import { clienteSchema } from "../validators/clienteValidator.js";

const router = express.Router();

// CRUD
router.post("/", validate(clienteSchema), createCliente);
router.get("/", getClientes);
router.get("/detalles", getClientesDetalles);
router.get("/:id", getCLienteById);


export default router;
