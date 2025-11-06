import express from "express";
import {
  getCampanas,
  getCampanaById,
  createCampana,
  deleteCampana,
  updateCampana,
} from "../controllers/campana.js";
import { campanaSchema } from "../validators/campanaValidator.js";
import { validate } from "../validators/validateMiddleware.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// Rutas
router.get("/", getCampanas);
router.get("/:id", getCampanaById);

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

router.put("/:id", validate(campanaSchema), updateCampana);
router.delete("/:id", deleteCampana);

export default router;
