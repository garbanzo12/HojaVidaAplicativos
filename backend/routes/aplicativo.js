import express from "express";
import {
  createAplicativo,
  getAplicativos,
  getAplicativoById,
  updateAplicativo,
  updateEstadoaplicativo,
  getAplicativosDetalles,
} from "../controllers/aplicativo.js";
import { validate } from "../validators/validateMiddleware.js";
import { aplicativoSchema } from "../validators/aplicativoValidator.js";

const router = express.Router();

// CRUD
router.post("/", validate(aplicativoSchema), createAplicativo);
router.get("/detalles", getAplicativosDetalles);
router.get("/", getAplicativos);
router.get("/:id", getAplicativoById);
router.put("/estado/:id", updateEstadoaplicativo);

router.put("/:id", validate(aplicativoSchema), updateAplicativo);



export default router;
