import express from "express";
import {
  getCampanas,
  getCampanaById,
  createCampana,
  deleteCampana,
  updateCampana,
  getCampanasDetalles,
  updateEstadoCampana,
} from "../controllers/campana.js";
import { campanaSchema } from "../validators/campanaValidator.js";
import { validate } from "../validators/validateMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Rutas
router.get("/", getCampanas);
router.get("/detalles", getCampanasDetalles);

// 🧠 Cambiamos esta ruta para aceptar archivos
router.post(
  "/",
  upload.fields([
    { name: "imagen_cliente", maxCount: 1 },
    { name: "imagen_sede", maxCount: 1 },
  ]),
  validate(campanaSchema),
  createCampana
);
router.get("/:id", getCampanaById);
router.put("/estado/:id", updateEstadoCampana);

router.put("/:id",upload.fields([
    { name: "imagen_cliente", maxCount: 1 },
    { name: "imagen_sede", maxCount: 1 },
  ]), validate(campanaSchema), updateCampana);
router.delete("/:id", deleteCampana);

export default router;
